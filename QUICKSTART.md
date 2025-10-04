# 🚀 Quick Start Guide

## Getting Started in 3 Steps

### Step 1: Install Dependencies
```powershell
pip install -r requirements.txt
```

### Step 2: Initialize Database
```powershell
python database.py
```

### Step 3: Run the Application
```powershell
python app.py
```

Or simply run:
```powershell
.\run.ps1
```

## Access the Application
Open your browser and visit: **http://localhost:5000**

## Default Pages
- **Home**: http://localhost:5000/
- **File Complaint**: http://localhost:5000/file
- **Track Complaint**: http://localhost:5000/track
- **Leaderboard**: http://localhost:5000/leaderboard
- **Admin Dashboard**: http://localhost:5000/admin

## Demo Credentials
No authentication required for demo. Admin dashboard is publicly accessible.

## Sample Complaint IDs
After submitting your first complaint, you'll receive a Complaint ID like:
- `CMP202501011234`

Use this ID to track your complaint status.

## Testing Tips

### 1. File a High Priority Complaint
Use keywords in description:
- "urgent pothole causing accidents"
- "emergency broken streetlight"
- "critical garbage overflow"

### 2. Test Anonymous Mode
Check the "Submit Anonymously" checkbox when filing a complaint.

### 3. Test Location Tagging
Click "Get My Location" to auto-fill GPS coordinates.

### 4. Upload Images
Upload photos of civic issues (any image format: JPG, PNG, GIF).

### 5. Track Complaints
Note the Complaint ID from the success modal and track it on the Track page.

### 6. Admin Operations
- Go to `/admin`
- Click "Start" to mark as "In Progress"
- Click "Resolve" to mark as "Resolved"
- Use filters to search by status/priority

### 7. View Leaderboard
- Go to `/leaderboard`
- See department rankings
- View performance charts

## Troubleshooting

### Port 5000 Already in Use?
Edit `app.py` and change the port:
```python
app.run(debug=True, port=5001)
```

### Database Errors?
Delete and recreate:
```powershell
Remove-Item complaints.db
python database.py
```

### Image Upload Not Working?
Ensure the `static/uploads` directory exists and has write permissions.

## What's Next?

1. **Integrate Real AI Model** - See README.md for TensorFlow integration
2. **Set Up WhatsApp Bot** - Configure Twilio credentials
3. **Customize Theme** - Edit CSS in `templates/base.html`
4. **Add Authentication** - Implement user login system
5. **Deploy to Cloud** - Deploy on Heroku, AWS, or Azure

## Need Help?

Refer to the full **README.md** for detailed documentation.

---

**Happy Coding! 🎉**
