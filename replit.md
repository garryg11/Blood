# LabClear - Medical Lab Results Analysis Platform

## Overview

LabClear is a full-stack web application that provides plain-language explanations of medical laboratory results. The application allows users to upload lab result documents (PDF, JPG, PNG) or manually enter lab values to receive easy-to-understand interpretations with normal ranges, explanations, and medical context. The platform emphasizes privacy by processing data locally and provides multilingual support (English/German).

**Recent Changes (September 2025)**: Restructured entire project into monorepo with FastAPI backend and React frontend, replacing the original Node.js/Express architecture.

## User Preferences

Preferred communication style: Simple, everyday language.

## Project Architecture

### Monorepo Structure
- **backend/**: FastAPI application with Python endpoints
- **frontend/**: React + TypeScript + Vite application
- **shared/**: TypeScript interfaces and constants shared between frontend and backend

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite for build tooling
- **Routing**: Wouter for client-side routing (future implementation)
- **UI Components**: Tailwind CSS with responsive design
- **Styling**: Tailwind CSS with mobile-first approach
- **State Management**: React hooks and context (TanStack Query planned)
- **Form Handling**: React Hook Form with Zod validation (planned)
- **Internationalization**: i18next with English and German support

### Backend Architecture
- **Framework**: FastAPI with Python 3.11+
- **Runtime**: Uvicorn ASGI server
- **API Design**: RESTful API with JSON responses and automatic OpenAPI docs
- **File Processing**: Support for PDF, JPG, PNG file uploads using pdfplumber, pytesseract, and Pillow
- **Data Validation**: Pydantic models for request/response validation
- **Medical Processing**: Stub implementations for text extraction and explanation generation

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon Database
- **Schema Design**: Three main entities - users, lab_sessions, and lab_results
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple
- **Local Storage**: Client-side session persistence using localStorage
- **In-Memory Fallback**: MemStorage class for development/testing

### Database Schema
- **users**: User authentication with username/password
- **lab_sessions**: Track processing sessions with status, file metadata, and language preferences
- **lab_results**: Store analyzed lab values with interpretations, normal ranges, explanations, and urgency flags

### Authentication and Authorization
- **Session-Based Authentication**: Express sessions with PostgreSQL storage
- **User Management**: Basic username/password authentication system
- **Privacy-First Design**: No external data transmission, local processing emphasis

### API Structure
- **Lab Sessions**: CRUD operations for managing analysis sessions
- **Lab Results**: Creation and retrieval of analyzed lab data
- **File Upload**: Endpoint for document processing
- **Manual Entry**: Alternative input method for lab values
- **Status Management**: Real-time session status tracking

### Development and Build System
- **Development Server**: Vite with HMR and Express middleware integration
- **Build Process**: Vite for frontend bundling, esbuild for server bundling
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Database Migrations**: Drizzle Kit for schema management
- **Path Aliases**: Configured for clean imports across the codebase

### UI/UX Design Patterns
- **Component Architecture**: Reusable UI components with consistent styling
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: ARIA labels and semantic HTML structure
- **Loading States**: Comprehensive loading and error handling
- **Progressive Disclosure**: Multi-step workflow (upload → processing → results)

## External Dependencies

### Database Services
- **Neon Database**: PostgreSQL hosting with connection pooling
- **@neondatabase/serverless**: Neon's serverless database driver

### UI and Styling
- **Radix UI**: Comprehensive primitive component library for accessibility
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration
- **FontAwesome**: Icon library for consistent iconography
- **Google Fonts**: Web fonts (Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter)

### Form and Validation
- **React Hook Form**: Form state management and validation
- **Zod**: TypeScript-first schema validation library
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### Development Tools
- **Vite**: Build tool with React plugin and development server
- **esbuild**: Fast JavaScript bundler for server-side code
- **TypeScript**: Type safety across the entire application
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling

### Server Framework
- **Express.js**: Web application framework with middleware support
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Database and ORM
- **Drizzle ORM**: Type-safe SQL ORM with PostgreSQL support
- **drizzle-zod**: Schema validation integration with Drizzle
- **drizzle-kit**: Database migration and introspection tools

### State Management
- **TanStack Query**: Powerful data synchronization for server state
- **Wouter**: Minimalist client-side routing library

### Utilities
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings
- **class-variance-authority**: Component variant management
- **nanoid**: URL-safe unique ID generator
- **cmdk**: Command palette component