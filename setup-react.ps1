# React + Flask Quick Start Script
Write-Host "🚀 AI Complaint Redressal System - React Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check Python
Write-Host "📋 Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found!" -ForegroundColor Red
    exit 1
}

# Check Node.js
Write-Host "📋 Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found! Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install Python dependencies
Write-Host "📥 Installing Python dependencies..." -ForegroundColor Yellow
pip install flask flask-cors werkzeug pillow --quiet
Write-Host "✅ Python dependencies installed" -ForegroundColor Green

Write-Host ""

# Initialize database
if (!(Test-Path "complaints.db")) {
    Write-Host "🗄️  Initializing database..." -ForegroundColor Yellow
    python database.py
    Write-Host "✅ Database initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Database already exists" -ForegroundColor Green
}

Write-Host ""

# Check if React app exists
if (!(Test-Path "client\package.json")) {
    Write-Host "❌ React app not found in client/ directory" -ForegroundColor Red
    Write-Host "Please ensure all React files are created properly" -ForegroundColor Yellow
    exit 1
}

# Install React dependencies
Write-Host "📦 Installing React dependencies..." -ForegroundColor Yellow
cd client
npm install
cd ..
Write-Host "✅ React dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Terminal 1 - Flask API Backend:" -ForegroundColor Yellow
Write-Host "  python api.py" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 - React Frontend:" -ForegroundColor Yellow
Write-Host "  cd client" -ForegroundColor White
Write-Host "  npm start" -ForegroundColor White
Write-Host ""
Write-Host "Then visit: http://localhost:3000" -ForegroundColor Green
Write-Host ""
