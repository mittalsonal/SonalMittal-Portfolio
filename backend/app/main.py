from __future__ import annotations

import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat import router as chat_router

load_dotenv()

frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
allowed_origins = [origin.strip() for origin in frontend_origin.split(",") if origin.strip()]

app = FastAPI(
    title="Sonal Mittal Portfolio API",
    version="1.0.0",
    description="Chat backend for Sonal Mittal's portfolio assistant."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(chat_router)


@app.get("/health")
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}
