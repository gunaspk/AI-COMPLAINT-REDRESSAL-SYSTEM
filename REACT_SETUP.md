# 🚀 React + Flask Setup Guide

## Project Structure

```
AI complaint redressal system/
├── api.py                          # Flask REST API Backend
├── database.py                     # Database layer
├── helpers.py                      # Helper functions
├── requirements.txt                # Python dependencies
├── client/                         # React Frontend
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── api/
│       │   └── complaintAPI.js    # API client
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── Navbar.css
│       │   ├── Footer.js
│       │   └── Footer.css
│       ├── pages/
│       │   ├── Home.js            # Landing page
│       │   ├── Home.css
│       │   ├── FileComplaint.js   # Submit complaints
│       │   ├── FileComplaint.css
│       │   ├── TrackComplaint.js  # Track status
│       │   ├── Leaderboard.js     # Department rankings
│       │   └── Admin.js           # Admin dashboard
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
└── static/
    └── uploads/                    # Uploaded images
```

## Installation Steps

### 1. Install Python Dependencies

```powershell
cd "c:\Users\Guna\OneDrive\Documents\AI complaint redressal system"
pip install flask flask-cors werkzeug pillow
```

### 2. Initialize Database

```powershell
python database.py
```

### 3. Install Node.js & React Dependencies

```powershell
cd client
npm install
```

### 4. Start Development

**Terminal 1 - Flask Backend:**
```powershell
cd "c:\Users\Guna\OneDrive\Documents\AI complaint redressal system"
python api.py
```

**Terminal 2 - React Frontend:**
```powershell
cd client
npm start
```

## Access the Application

- **React Frontend**: http://localhost:3000
- **Flask API**: http://localhost:5000/api

## Production Build

### Build React App
```powershell
cd client
npm run build
```

### Serve with Flask
The Flask `api.py` is configured to serve the React build automatically from `client/build`.

```powershell
python api.py
```

Then access: http://localhost:5000

## Key Features

### Frontend (React)
✅ Modern, responsive UI with React 18
✅ Client-side routing with React Router
✅ RESTful API integration with Axios
✅ Interactive maps with Leaflet
✅ Charts with Chart.js
✅ Component-based architecture
✅ Clean separation of concerns

### Backend (Flask)
✅ RESTful API architecture
✅ CORS enabled for development
✅ File upload handling
✅ SQLite database
✅ Modular helper functions
✅ JSON responses

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/complaints` | Get all complaints |
| GET | `/api/complaints/:id` | Get complaint by ID |
| POST | `/api/complaints` | Create new complaint |
| PUT | `/api/complaints/:id/status` | Update status |
| GET | `/api/leaderboard` | Get department rankings |
| GET | `/api/stats` | Get dashboard statistics |
| POST | `/api/analyze-image` | AI image analysis |
| POST | `/api/whatsapp` | WhatsApp webhook |

## Environment Variables

Create `.env` file in root:
```
FLASK_APP=api.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

## Technology Stack

### Frontend
- **React 18** - UI library
- **React Router** - Routing
- **Axios** - HTTP client
- **Leaflet** - Maps
- **Chart.js** - Data visualization
- **Lucide React** - Icons

### Backend
- **Flask** - Web framework
- **Flask-CORS** - Cross-origin requests
- **SQLite** - Database
- **Werkzeug** - WSGI utilities
- **Pillow** - Image processing

## Next Steps

1. ✅ Complete remaining React pages (Track, Leaderboard, Admin)
2. ✅ Implement real AI model integration
3. ✅ Add WhatsApp bot functionality
4. ✅ Implement authentication
5. ✅ Deploy to cloud (Heroku, AWS, Vercel)

## Advantages of React Frontend

✨ **Industry Standard** - React is used by Meta, Netflix, Airbnb
✨ **Component Reusability** - DRY principle
✨ **Virtual DOM** - Better performance
✨ **Rich Ecosystem** - Huge library support
✨ **SEO Friendly** - With Next.js/SSR
✨ **Mobile Ready** - React Native compatibility
✨ **Developer Experience** - Hot reload, debugging tools
✨ **Scalability** - Easy to scale and maintain

