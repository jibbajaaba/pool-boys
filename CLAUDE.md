# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PoolBoys is a full-stack pool rental application built with FastAPI (Python) backend and React frontend. It allows pool owners to list their pools and manage reservations.

## Development Commands

### Project Setup
```bash
# Initial setup
docker volume create database_volume
docker volume create pg-admin
docker compose build
docker compose up
```

### Frontend Development (React/Vite)
```bash
cd ghi
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend Development (FastAPI)
```bash
cd api
# Run via docker-compose (recommended)
docker compose up api

# FastAPI docs available at: http://localhost:8000/docs
```

### Testing
```bash
cd api
pytest                    # Run all tests
pytest tests/test_*.py    # Run specific test file
```

## Architecture

### Backend (FastAPI)
- **Location**: `/api/`
- **Structure**: 
  - `models/` - Pydantic models for data validation
  - `queries/` - Database query functions
  - `routers/` - API route handlers
  - `migrations/` - Database schema migrations
  - `utils/` - Authentication and utility functions
- **Database**: PostgreSQL with manual migrations
- **Authentication**: JWT-based auth with custom middleware

### Frontend (React)
- **Location**: `/ghi/`
- **Tech Stack**: React 18, Vite, Redux Toolkit, Tailwind CSS
- **Structure**:
  - `src/components/` - React components
  - `src/app/` - Redux store configuration
  - `src/utils.js` - Utility functions
- **Styling**: Tailwind CSS with custom configuration

### Key Features
- Pool listing and management
- User authentication and profiles
- Reservation system
- Admin pool amenities management

## Environment Setup

Create `.env` file in root directory:
```
POSTGRES_DB="db_name"
POSTGRES_USER="your_username"
POSTGRES_PASSWORD="your_password"
SIGNING_KEY="your_jwt_signing_key"
PGADMIN_EMAIL="admin@example.com"
PGADMIN_PASSWORD="admin_password"
```

## Database Access
- **pgAdmin**: http://localhost:8082
- **Direct connection**: localhost:15432
- **API docs**: http://localhost:8000/docs

## Code Style
- **Frontend**: Prettier configured with 4-space tabs, single quotes, no semicolons
- **Backend**: Standard Python conventions with type hints