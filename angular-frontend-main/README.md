# Angular Auth Frontend

Angular 21 authentication frontend application.

## Live URL
- Frontend: https://capable-hamster-7bc006.netlify.app
- Backend API: https://auth-api-ailu.onrender.com
- API Docs: https://auth-api-ailu.onrender.com/api-docs

## Setup Instructions

### Prerequisites
- Node.js
- Angular CLI

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/TheresaFCastillo/angular-frontend.git
   cd angular-frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run development server
   ```bash
   ng serve
   ```

4. Open http://localhost:4200

## Testing Stages

### Stage A - Fake Backend
In `src/app/app.config.ts`, set:
```typescript
const useFakeBackend = true;
```

### Stage B - Live Backend
In `src/app/app.config.ts`, set:
```typescript
const useFakeBackend = false;
```

## Production Build
```bash
ng build --configuration production
```

## Features
- User registration with email verification
- JWT authentication with refresh tokens
- Role-based access control (Admin/User)
- Admin panel for managing accounts
- Fake backend for testing