from __future__ import annotations

from typing import Literal

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.ai_service import ai_service

router = APIRouter(tags=["chat"])


class HistoryMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    history: list[HistoryMessage] = Field(default_factory=list)


class ChatResponse(BaseModel):
    reply: str
    mode: str
    context: list[str]


@router.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    try:
        result = await ai_service.generate_reply(
            message=request.message,
            history=[item.model_dump() for item in request.history]
        )
    except Exception as exc:  # pragma: no cover - safety for runtime failures
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return ChatResponse(**result)
