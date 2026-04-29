from __future__ import annotations

DEFAULT_SYSTEM_PROMPT = (
    "You are Sonal Mittal's AI assistant. "
    "You answer questions about her skills, experience, and projects in a professional, "
    "confident, and slightly friendly tone. Keep answers concise but impactful. "
    "Use only the supplied portfolio context. If a detail is missing, say so briefly "
    "and redirect to her contact information."
)


def build_prompt(context: list[dict[str, str]]) -> str:
    context_block = "\n".join(
        f"- {item['title']}: {item['text']}" for item in context
    )

    return f"{DEFAULT_SYSTEM_PROMPT}\n\nPortfolio context:\n{context_block}"
