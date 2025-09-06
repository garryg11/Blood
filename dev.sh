
#!/usr/bin/env bash
set -e
pkill -f uvicorn || true
pkill -f vite || true
trap "kill 0" EXIT
(cd backend && uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload) &
(cd frontend && vite --host 0.0.0.0 --port ${PORT:-5000})
