# 🚀 AI-Driven Complaint Redressal System

A comprehensive civic complaint management web application built with Flask, featuring AI-powered image classification, priority detection, WhatsApp integration, and real-time tracking.

## ✨ Features

### Core Features
- 🤖 **AI Image Classification** - Automatic categorization of uploaded images (pothole, garbage, streetlight, etc.)
- 📊 **Smart Priority Detection** - Keyword-based urgency analysis from complaint descriptions
- 📍 **Location Auto-tagging** - HTML5 Geolocation with interactive OpenStreetMap integration
- 🕵️ **Anonymous Mode** - Submit complaints without revealing identity
- 📱 **WhatsApp Bot Integration** - File complaints via WhatsApp (Twilio API)
- 🎯 **Real-time Tracking** - Track complaint status with visual progress indicators
- 🏆 **Department Leaderboard** - Performance metrics with Chart.js visualizations
- 🎨 **Responsive UI** - Bootstrap 5 with smooth animations

### Pages
1. **Landing Page** - Hero section with features showcase
2. **File Complaint** - Form with image upload, AI categorization, location tagging
3. **Track Complaint** - Status tracking with progress visualization
4. **Leaderboard** - Department performance rankings with charts
5. **Admin Dashboard** - Complaint management with filtering and status updates

## 🗂️ Project Structure

```
AI complaint redressal system/
│
├── app.py                      # Main Flask application
├── database.py                 # Database initialization and schema
├── helpers.py                  # Helper functions (AI, priority detection, etc.)
├── requirements.txt            # Python dependencies
├── complaints.db              # SQLite database (auto-generated)
│
├── templates/
│   ├── base.html              # Base template with navbar and footer
│   ├── index.html             # Landing page
│   ├── file_complaint.html    # Complaint submission form
│   ├── track.html             # Complaint tracking page
│   ├── leaderboard.html       # Department leaderboard
│   └── admin.html             # Admin dashboard
│
└── static/
    └── uploads/               # User uploaded images (auto-generated)
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Initialize Database

```bash
python database.py
```

This will create the SQLite database with the required tables and seed departments.

### Step 3: Run the Application

```bash
python app.py
```

The application will be available at: **http://localhost:5000**

## 📋 Database Schema

### Complaints Table
| Column       | Type     | Description                          |
|--------------|----------|--------------------------------------|
| id           | TEXT     | Primary key (e.g., CMP202501011234) |
| description  | TEXT     | Complaint description                |
| image_path   | TEXT     | Path to uploaded image               |
| category     | TEXT     | AI-detected category                 |
| priority     | TEXT     | High/Medium/Low                      |
| location     | TEXT     | GPS coordinates or address           |
| status       | TEXT     | Submitted/In Progress/Resolved       |
| timestamp    | DATETIME | Submission time                      |
| anonymous    | BOOLEAN  | Anonymous submission flag            |
| resolved_at  | DATETIME | Resolution timestamp                 |

### Departments Table
| Column                | Type    | Description                     |
|-----------------------|---------|---------------------------------|
| id                    | INTEGER | Primary key                     |
| name                  | TEXT    | Department name                 |
| complaints_resolved   | INTEGER | Number of resolved complaints   |
| avg_resolution_time   | REAL    | Average resolution time         |
| total_complaints      | INTEGER | Total complaints received       |

## 🔌 API Endpoints

| Method | Endpoint             | Description                      |
|--------|----------------------|----------------------------------|
| GET    | `/`                  | Landing page                     |
| GET    | `/file`              | File complaint page              |
| POST   | `/submit_complaint`  | Submit new complaint             |
| GET    | `/track`             | Track complaint page             |
| POST   | `/track_status`      | Get complaint by ID              |
| GET    | `/leaderboard`       | Department leaderboard           |
| GET    | `/admin`             | Admin dashboard                  |
| POST   | `/update_status`     | Update complaint status          |
| POST   | `/whatsapp`          | WhatsApp webhook                 |
| POST   | `/api/analyze_image` | AI image analysis endpoint       |

## 🧠 AI Integration

### Image Classification (To be implemented)

The system includes a placeholder for AI image classification. To integrate a real model:

1. **Uncomment TensorFlow in requirements.txt**
```python
tensorflow==2.15.0
```

2. **Update `helpers.py` categorize_image() function**:
```python
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing import image

def categorize_image(file_path):
    # Load pre-trained model
    model = MobileNetV2(weights='imagenet')
    
    # Preprocess image
    img = image.load_img(file_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
    
    # Predict
    predictions = model.predict(img_array)
    # Custom logic to map predictions to categories
    
    return category
```

### Priority Detection

Currently uses keyword matching. Can be enhanced with:
- Sentiment analysis (VADER, TextBlob)
- NLP models (BERT, GPT)
- Custom trained classifiers

## 📱 WhatsApp Integration

### Setup Twilio

1. **Create Twilio Account**: https://www.twilio.com/
2. **Get WhatsApp Sandbox**: Enable WhatsApp in Twilio Console
3. **Set Environment Variables**:

```bash
# Windows PowerShell
$env:TWILIO_ACCOUNT_SID="your_account_sid"
$env:TWILIO_AUTH_TOKEN="your_auth_token"
$env:TWILIO_WHATSAPP_NUMBER="whatsapp:+14155238886"
```

4. **Uncomment Twilio in requirements.txt**:
```python
twilio==8.10.0
```

5. **Update webhook URL in Twilio Console**:
```
https://your-domain.com/whatsapp
```

## 🎨 Customization

### Color Theme
Edit CSS variables in `templates/base.html`:
```css
:root {
    --primary: #1d4ed8;    /* Blue */
    --success: #22c55e;    /* Green */
    --danger: #ef4444;     /* Red */
    --warning: #f59e0b;    /* Orange */
}
```

### Adding New Categories
Update `helpers.py`:
```python
categories = ['Pothole', 'Garbage', 'Streetlight', 'Your_New_Category']
```

Update department mapping in `database.py`:
```python
mapping = {
    'Your_New_Category': 'Target Department'
}
```

## 🧪 Testing the Application

### Demo Flow

1. **Visit Landing Page** → http://localhost:5000
2. **File a Complaint**:
   - Click "File Complaint"
   - Enter description (use keywords like "urgent" for high priority)
   - Upload an image (AI will categorize)
   - Get current location
   - Submit

3. **Track Complaint**:
   - Note the Complaint ID from success modal
   - Go to Track page
   - Enter ID to see status

4. **Admin Actions**:
   - Visit `/admin`
   - View all complaints
   - Update status to "In Progress" or "Resolved"

5. **Check Leaderboard**:
   - Visit `/leaderboard`
   - View department performance metrics

## 📦 Deployment

### Option 1: Local Network
```bash
python app.py
# Access from any device on network: http://your-ip:5000
```

### Option 2: Cloud Deployment (Heroku, AWS, etc.)
1. Add `Procfile`:
```
web: python app.py
```

2. Update `app.py` for production:
```python
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
```

## 🔧 Troubleshooting

### Database Issues
```bash
# Delete and recreate database
rm complaints.db
python database.py
```

### Port Already in Use
Change port in `app.py`:
```python
app.run(debug=True, port=5001)
```

### Image Upload Issues
Ensure `static/uploads` directory exists and has write permissions.

## 📝 Future Enhancements

- [ ] Email notifications
- [ ] SMS alerts via Twilio
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] User authentication system
- [ ] File attachments (PDF, videos)
- [ ] Chatbot for FAQs

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Bootstrap 5 for UI components
- Chart.js for data visualization
- Leaflet for maps
- Font Awesome for icons
- AOS for animations

---

**Made with ❤️ for better civic engagement**
