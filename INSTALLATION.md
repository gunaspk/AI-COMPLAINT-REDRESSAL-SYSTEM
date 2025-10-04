# 🚀 Installation & Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **Node.js 14+** ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

---

## 📋 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/gunaspk/AI-COMPLAINT-REDRESSAL-SYSTEM.git
cd AI-COMPLAINT-REDRESSAL-SYSTEM
```

### 2. Backend Setup (Flask)

#### Install Python Dependencies

```bash
# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1

# Windows CMD:
.\venv\Scripts\activate.bat

# macOS/Linux:
source venv/bin/activate

# Install required packages
pip install -r requirements.txt
```

#### Initialize Database

```bash
python database.py
```

You should see: `✅ Database initialized successfully!`

#### Start Backend Server

```bash
python api.py
```

Backend will run on: **http://localhost:5000**

---

### 3. Frontend Setup (React)

#### Install Node Dependencies

```bash
cd client
npm install
```

This will install ~1340 packages including:
- React 18.2.0
- React Router 6.20.0
- Axios 1.6.2
- Leaflet 1.9.4
- Chart.js 4.4.0
- Lucide React 0.294.0

#### Start Frontend Development Server

```bash
npm start
```

Frontend will run on: **http://localhost:3000**

---

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env` file in the root directory:

```env
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///complaints.db
PORT=5000
```

### Database Configuration

The app uses SQLite by default. The database file `complaints.db` is created automatically when you run `database.py`.

**Default Tables**:
- `complaints` - Stores all complaint submissions
- `departments` - Stores department performance data

---

## 📦 Python Dependencies Breakdown

### Core Requirements

| Package | Version | Purpose |
|---------|---------|---------|
| Flask | 3.0.0 | Web framework |
| flask-cors | 4.0.0 | Cross-origin resource sharing |
| Werkzeug | 3.0.1 | WSGI utilities |
| Pillow | 10.1.0 | Image processing |

### Optional Packages

To enable additional features, uncomment lines in `requirements.txt` and reinstall:

**WhatsApp Integration**:
```bash
pip install twilio==8.10.0
```

**AI/ML Features**:
```bash
pip install tensorflow==2.15.0 torch==2.1.0 transformers==4.36.0
```

**Advanced Computer Vision**:
```bash
pip install opencv-python==4.8.1 scikit-learn==1.3.2
```

**Authentication**:
```bash
pip install flask-jwt-extended==4.5.3 flask-bcrypt==1.0.1
```

**Database ORM**:
```bash
pip install flask-sqlalchemy==3.1.1 flask-migrate==4.0.5
```

---

## 📦 Node Dependencies Breakdown

### Core Frontend Packages

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.2.0 | UI framework |
| react-dom | 18.2.0 | React DOM rendering |
| react-router-dom | 6.20.0 | Client-side routing |
| axios | 1.6.2 | HTTP client |

### Maps & Visualization

| Package | Version | Purpose |
|---------|---------|---------|
| leaflet | 1.9.4 | Interactive maps |
| react-leaflet | 4.2.1 | React wrapper for Leaflet |
| chart.js | 4.4.0 | Data visualization |
| react-chartjs-2 | 5.2.0 | React wrapper for Chart.js |

### UI Components

| Package | Version | Purpose |
|---------|---------|---------|
| lucide-react | 0.294.0 | Icon library |

---

## 🐛 Troubleshooting

### Python Issues

**Issue**: `ModuleNotFoundError: No module named 'flask'`  
**Solution**: Activate virtual environment and reinstall dependencies
```bash
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

**Issue**: `Database is locked`  
**Solution**: Close all connections and restart the server
```bash
# Delete the database file (WARNING: This removes all data)
rm complaints.db
python database.py
```

**Issue**: Port 5000 already in use  
**Solution**: Change port in `api.py` or kill the process
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <process_id> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Node/React Issues

**Issue**: `npm ERR! network`  
**Solution**: Clear npm cache and retry
```bash
npm cache clean --force
npm install
```

**Issue**: Port 3000 already in use  
**Solution**: Run on different port
```bash
# The app will prompt automatically
# Or set environment variable
$env:PORT=3001; npm start
```

**Issue**: `Module not found: Error: Can't resolve...`  
**Solution**: Delete node_modules and reinstall
```bash
rm -r node_modules
rm package-lock.json
npm install
```

### CORS Issues

**Issue**: `Access to XMLHttpRequest... blocked by CORS policy`  
**Solution**: Ensure flask-cors is installed and configured
```bash
pip install flask-cors
```

Verify in `api.py`:
```python
from flask_cors import CORS
CORS(app)
```

---

## 🚀 Production Deployment

### Backend Deployment

**Using Gunicorn** (Recommended for production):
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 api:app
```

**Using Waitress** (Windows):
```bash
pip install waitress
waitress-serve --port=5000 api:app
```

### Frontend Deployment

**Build for Production**:
```bash
cd client
npm run build
```

This creates an optimized production build in `client/build/`.

**Deploy Options**:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `build` folder
- **GitHub Pages**: Use `gh-pages` package
- **Heroku**: Use `heroku-buildpack-nodejs`

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change `SECRET_KEY` to a secure random string
- [ ] Set `FLASK_ENV=production`
- [ ] Set `FLASK_DEBUG=False`
- [ ] Enable HTTPS (use Let's Encrypt)
- [ ] Add rate limiting (flask-limiter)
- [ ] Implement authentication (JWT)
- [ ] Sanitize user inputs
- [ ] Enable CSRF protection
- [ ] Use environment variables for secrets
- [ ] Restrict CORS to specific origins

---

## 📚 Additional Resources

**Flask Documentation**: https://flask.palletsprojects.com/  
**React Documentation**: https://react.dev/  
**Leaflet.js Docs**: https://leafletjs.com/  
**Chart.js Docs**: https://www.chartjs.org/  

---

## 🆘 Getting Help

**Issues**: Report bugs on GitHub Issues  
**Discussions**: Use GitHub Discussions for questions  
**Email**: Contact project maintainer  

---

## 📝 Version History

**v1.0.0** (Current)
- Initial release with React frontend
- Flask REST API backend
- SQLite database
- AI categorization (mock implementation)
- GPS location tagging
- Department leaderboard
- Admin dashboard
- Modern UI with animations

---

**Last Updated**: October 4, 2025  
**Maintained by**: Guna SPK (@gunaspk)
