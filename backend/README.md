# PharmaCure Backend API

Node.js/Express API with MongoDB Atlas for the PharmaCure application.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure MongoDB Atlas
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Create a database user with password
4. Whitelist IP addresses (or allow all: 0.0.0.0/0)
5. Get connection string from "Connect" → "Connect your application"

### 3. Environment Variables
1. Copy `.env.example` to `.env`
```bash
cp .env.example .env
```

2. Update `.env` with your values:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a random secret (use: `openssl rand -base64 32`)
   - `FRONTEND_URL`: Your Lovable app URL
   - `PORT`: Server port (default: 5000)

### 4. Run Locally
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run at http://localhost:5000

## Deployment Options

### Option 1: Railway (Recommended - Easy & Free)
1. Sign up at https://railway.app
2. Create new project → Deploy from GitHub
3. Add MongoDB Atlas connection string as environment variable
4. Deploy automatically

### Option 2: Render
1. Sign up at https://render.com
2. New Web Service → Connect repository
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add environment variables

### Option 3: Heroku
```bash
heroku create pharmacure-api
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set JWT_SECRET="your_jwt_secret"
git push heroku main
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/signout` - Logout user
- `GET /api/auth/me` - Get current user

### Drugs
- `GET /api/drugs/search?q=aspirin` - Search drugs
- `GET /api/drugs/suggestions?q=asp` - Get drug name suggestions
- `GET /api/drugs/autocorrect?q=asprin` - Get autocorrect suggestion

### Prescriptions
- `POST /api/prescriptions` - Upload prescription (multipart/form-data)
- `GET /api/prescriptions` - Get user prescriptions
- `DELETE /api/prescriptions/:id` - Delete prescription

### Pharmacies
- `GET /api/pharmacies` - Get nearby pharmacies

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Search History
- `POST /api/search-history` - Save search
- `GET /api/search-history` - Get user search history
- `DELETE /api/search-history` - Clear search history

## Frontend Integration

After deploying, update frontend API URL in `src/config/api.ts`:
```typescript
export const API_URL = 'https://your-backend-url.railway.app';
```

## Security Notes

- JWT tokens stored in localStorage
- Password hashing with bcrypt
- Input validation with express-validator
- CORS enabled for frontend origin
- Rate limiting recommended for production

## Database Collections

- `users` - User accounts
- `profiles` - User profiles
- `drugs` - Drug information
- `prescriptions` - Prescription records
- `searchhistory` - Search history
- `pharmacies` - Nearby pharmacies
