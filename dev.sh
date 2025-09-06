
#!/usr/bin/env bash
set -e
pkill -f uvicorn || true
pkill -f vite || true
trap "kill 0" EXIT

# backend
( cd backend && uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload ) &

# frontend (restart loop)
while true; do
  ( cd frontend && npx vite --host 0.0.0.0 --port ${PORT:-5000} )
  echo "Vite stopped; restarting in 1s..."
  sleep 1
done
