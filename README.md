# Sonal Mittal Portfolio

Luxury editorial portfolio built with Next.js App Router, Tailwind CSS, Framer Motion, and a FastAPI chatbot backend.

## Frontend

```bash
npm install
npm run dev
```

The frontend expects:

```bash
FASTAPI_URL=http://127.0.0.1:8000
```

If the FastAPI service is not running, the chat widget falls back to a built-in portfolio-aware assistant so the UI still works.

## Backend

```bash
cd backend
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --env-file .env
```

Optional environment variables for live LLM responses:

```bash
OPENAI_API_KEY=
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=
FRONTEND_ORIGIN=http://localhost:3000
```

If the API key or model is not configured, the backend uses a deterministic resume-aware fallback response generator.
