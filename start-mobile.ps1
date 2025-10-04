# Start AI Complaint Redressal System for Mobile Testing
# This script starts both backend and frontend servers with network access

Write-Host "🚀 Starting AI Complaint Redressal System for Mobile Access..." -ForegroundColor Cyan
Write-Host ""

# Get local IP address
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -like "192.168.*"})[0].IPAddress

if (-not $ipAddress) {
    $ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike "*Loopback*"})[0].IPAddress
}

Write-Host "📡 Your Local IP Address: $ipAddress" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Access from Mobile Device:" -ForegroundColor Yellow
Write-Host "   Frontend: http://${ipAddress}:3000" -ForegroundColor White
Write-Host "   Backend:  http://${ipAddress}:5000" -ForegroundColor White
Write-Host ""
Write-Host "💻 Access from Desktop:" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Make sure your mobile device is on the same WiFi network!" -ForegroundColor Magenta
Write-Host ""
Write-Host "🔧 To test mobile view in Chrome:" -ForegroundColor Cyan
Write-Host "   Press F12 → Click device icon 📱 → Select mobile device" -ForegroundColor White
Write-Host "   Or press Ctrl+Shift+M for quick toggle" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Red
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Start backend server in background
Write-Host "🔵 Starting Flask Backend API..." -ForegroundColor Blue
$backendJob = Start-Job -ScriptBlock {
    Set-Location "c:\Users\Guna\OneDrive\Documents\AI complaint redressal system"
    python api.py
}

Start-Sleep -Seconds 3

# Start frontend server with HOST environment variable
Write-Host "🟢 Starting React Frontend Server..." -ForegroundColor Green
Set-Location "c:\Users\Guna\OneDrive\Documents\AI complaint redressal system\client"
$env:HOST = "0.0.0.0"
npm start

# Cleanup when script is terminated
Stop-Job -Job $backendJob
Remove-Job -Job $backendJob
Write-Host ""
Write-Host "✅ Servers stopped successfully!" -ForegroundColor Green
