from __future__ import annotations

import asyncio
import json
import os
import re
from pathlib import Path
from typing import Any
from urllib import error as urllib_error
from urllib import request as urllib_request

from app.utils.prompt import build_prompt


class PortfolioAIService:
    def __init__(self) -> None:
        base_dir = Path(__file__).resolve().parents[1]
        data_path = base_dir / "data" / "portfolio_data.json"
        self.portfolio = json.loads(data_path.read_text(encoding="utf-8"))
        self.context_chunks = self._build_context_chunks()

    @staticmethod
    def _tokenize(value: str) -> list[str]:
        return re.findall(r"[a-zA-Z0-9+.]+", value.lower())

    def _build_context_chunks(self) -> list[dict[str, str]]:
        chunks: list[dict[str, str]] = []
        profile = self.portfolio["profile"]
        contact = self.portfolio["contact"]
        education = self.portfolio["education"]

        chunks.append(
            {
                "title": "Profile",
                "text": (
                    f"{profile['name']} is a {profile['role']}. "
                    f"{profile['summary']} "
                    f"Status: {profile['status']} "
                    f"Education: {education['degree']} at {education['school']}, {education['timeline']}. "
                    f"Contact: {contact['email']}."
                ),
            }
        )

        for project in self.portfolio["projects"]:
            chunks.append(
                {
                    "title": project["title"],
                    "text": (
                        f"{project['title']} ({project['year']}) uses {', '.join(project['tech'])}. "
                        f"{project['summary']} Impact: {project['impact']}"
                    ),
                }
            )

        for role in self.portfolio["experience"]:
            chunks.append(
                {
                    "title": f"{role['company']} experience",
                    "text": (
                        f"{role['role']} at {role['company']} ({role['period']}). "
                        f"{role['summary']} "
                        f"{' '.join(role['bullets'])}"
                    ),
                }
            )

        for group_name, items in self.portfolio["skills"].items():
            chunks.append(
                {
                    "title": f"{group_name.title()} skills",
                    "text": f"{group_name.title()}: {', '.join(items)}",
                }
            )

        return chunks

    def retrieve_context(self, message: str, limit: int = 4) -> list[dict[str, str]]:
        tokens = self._tokenize(message)
        scored_chunks: list[tuple[int, dict[str, str]]] = []

        for chunk in self.context_chunks:
            haystack = chunk["text"].lower()
            score = 0

            for token in tokens:
                if token in haystack:
                    score += 2 if len(token) > 4 else 1

            if score > 0:
                scored_chunks.append((score, chunk))

        scored_chunks.sort(key=lambda item: item[0], reverse=True)
        ranked = [chunk for _, chunk in scored_chunks[:limit]]

        if ranked:
            return ranked

        return self.context_chunks[:limit]

    def fallback_reply(self, message: str, context: list[dict[str, str]]) -> str:
        question = message.lower()
        profile = self.portfolio["profile"]
        contact = self.portfolio["contact"]
        project_lookup = {
            project["title"].lower(): project for project in self.portfolio["projects"]
        }

        if any(keyword in question for keyword in ["available", "hire", "hiring", "job", "opportunity"]):
            return (
                f"Yes - {profile['name']} is {profile['status'].lower()} "
                f"You can reach her at {contact['email']}."
            )

        if "second brain" in question or "rag" in question:
            project = project_lookup["ai second brain"]
            return (
                f"{project['title']} is a RAG-driven knowledge system built with "
                f"{', '.join(project['tech'])}. {project['impact']}"
            )

        if "linkedin" in question:
            project = project_lookup["linkedin post generator"]
            return (
                f"{project['title']} uses {', '.join(project['tech'])}. "
                f"{project['impact']}"
            )

        if any(keyword in question for keyword in ["skill", "stack", "tech", "tool"]):
            ai_skills = ", ".join(self.portfolio["skills"]["ai_ml"])
            core_stack = ", ".join(self.portfolio["skills"]["frontend"][:4] + self.portfolio["skills"]["backend"][:4])
            return (
                f"Sonal works across the stack with {core_stack}. "
                f"Her AI/ML strengths include {ai_skills}."
            )

        if any(keyword in question for keyword in ["project", "build", "portfolio"]):
            titles = ", ".join(project["title"] for project in self.portfolio["projects"])
            return f"She has built {titles}. The portfolio centers on practical AI systems and scalable product engineering."

        if any(keyword in question for keyword in ["experience", "company", "companies", "akoode", "kodevortex"]):
            companies = ", ".join(item["company"] for item in self.portfolio["experience"])
            return (
                f"Sonal has experience across {companies}, where she led full-stack delivery, improved API performance, and integrated AI features into real products."
            )

        if any(keyword in question for keyword in ["about", "who is", "tell me about sonal"]):
            return f"{profile['name']} is a {profile['role']} focused on scalable full-stack systems and useful AI-powered experiences. {profile['summary']}"

        return " ".join(chunk["text"] for chunk in context[:2])

    async def llm_reply(
        self,
        message: str,
        history: list[dict[str, str]],
        context: list[dict[str, str]],
    ) -> str | None:
        api_key = os.getenv("OPENAI_API_KEY")
        base_url = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1").rstrip("/")
        model = os.getenv("OPENAI_MODEL")

        if not api_key or not model:
            return None

        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": build_prompt(context)},
                *history[-6:],
                {"role": "user", "content": message},
            ],
            "temperature": 0.3,
            "max_tokens": 320,
        }

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }

        try:
            data = await asyncio.to_thread(
                self._post_llm_request,
                f"{base_url}/chat/completions",
                headers,
                payload,
            )
        except urllib_error.HTTPError as exc:
            raise RuntimeError(f"LLM request failed with status {exc.code}.") from exc
        except urllib_error.URLError as exc:
            raise RuntimeError("Could not reach the configured LLM endpoint.") from exc

        content = data["choices"][0]["message"]["content"]

        if isinstance(content, list):
            text_parts = [
                part.get("text", "")
                for part in content
                if isinstance(part, dict) and part.get("type") == "text"
            ]
            return " ".join(part.strip() for part in text_parts if part.strip())

        if isinstance(content, str):
            return content.strip()

        return None

    @staticmethod
    def _post_llm_request(
        url: str,
        headers: dict[str, str],
        payload: dict[str, Any],
    ) -> dict[str, Any]:
        request = urllib_request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers=headers,
            method="POST",
        )

        with urllib_request.urlopen(request, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))

    async def generate_reply(
        self, message: str, history: list[dict[str, str]] | None = None
    ) -> dict[str, Any]:
        normalized_history = history or []
        context = self.retrieve_context(message)
        reply = await self.llm_reply(message, normalized_history, context)

        if reply:
            return {
                "reply": reply,
                "mode": "llm",
                "context": [chunk["title"] for chunk in context],
            }

        return {
            "reply": self.fallback_reply(message, context),
            "mode": "fallback",
            "context": [chunk["title"] for chunk in context],
        }


ai_service = PortfolioAIService()
