# LabClear - Medical Lab Results Analysis Platform

A monorepo containing a FastAPI backend and React frontend for analyzing medical lab results and providing plain-language explanations.

## Architecture

- **backend/**: FastAPI application with endpoints for extracting and explaining lab results
- **frontend/**: React + TypeScript + Vite application with Tailwind CSS and i18next for internationalization
- **shared/**: TypeScript interfaces and constants shared between frontend and backend

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+

### Development Setup

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```

   This starts both the frontend (http://localhost:3000) and backend (http://localhost:8000) concurrently.

### API Endpoints

- `GET /health` - Health check endpoint
- `POST /extract` - Extract lab data from uploaded files (stub)
- `POST /explain` - Generate plain-language explanations for lab results (stub)

### Frontend Features

- Mobile-first responsive design
- English/German language support
- File upload for PDF/JPG/PNG lab reports
- Manual lab value entry
- Plain-language result explanations

### File Structure

```
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI application
│   │   └── schemas.py       # Pydantic models
│   ├── fixtures/            # Sample data
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   └── i18n.ts         # Internationalization setup
│   └── package.json        # Frontend dependencies
├── shared/
│   ├── schemas.ts          # TypeScript interfaces
│   └── constants.ts        # Shared constants
└── package.json            # Root package.json with dev scripts
```

## Development

Run `npm run dev` to start both frontend and backend in development mode with hot reloading.