import random
import string
from datetime import datetime
from database import get_db_connection, get_department_by_category
import os
import re

# Simple keyword-based priority detection
URGENCY_KEYWORDS = {
    'high': ['urgent', 'emergency', 'dangerous', 'severe', 'critical', 'hazardous', 'injury', 'accident', 'blocked', 'broken'],
    'medium': ['repair', 'fix', 'problem', 'issue', 'concern', 'needs attention', 'damaged'],
    'low': ['minor', 'small', 'request', 'suggestion', 'maintenance']
}


def categorize_image(file_path):
    """
    Categorize image using AI model
    For demo purposes, uses a simple keyword/mock approach
    In production, integrate TensorFlow/HuggingFace model
    """
    try:
        # TODO: Integrate actual AI model here
        # For now, using mock categorization based on filename or random
        
        # Mock categories
        categories = ['Pothole', 'Garbage', 'Streetlight', 'Road Damage', 'Water', 'Drainage']
        
        # Simple mock: return random category
        # In production, use: model.predict(preprocess_image(file_path))
        category = random.choice(categories)
        
        print(f"🤖 AI Categorized image as: {category}")
        return category
        
    except Exception as e:
        print(f"Error categorizing image: {str(e)}")
        return 'Uncategorized'


def detect_priority(text):
    """
    Detect priority level from complaint description
    Uses keyword matching and basic NLP
    """
    text_lower = text.lower()
    
    # Count urgency keywords
    high_count = sum(1 for keyword in URGENCY_KEYWORDS['high'] if keyword in text_lower)
    medium_count = sum(1 for keyword in URGENCY_KEYWORDS['medium'] if keyword in text_lower)
    low_count = sum(1 for keyword in URGENCY_KEYWORDS['low'] if keyword in text_lower)
    
    # Determine priority
    if high_count > 0:
        return 'High'
    elif medium_count > low_count:
        return 'Medium'
    else:
        return 'Low'


def generate_complaint_id():
    """Generate a unique complaint ID"""
    timestamp = datetime.now().strftime('%Y%m%d')
    random_suffix = ''.join(random.choices(string.digits, k=4))
    return f"CMP{timestamp}{random_suffix}"


def save_complaint(data):
    """Save complaint to database"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO complaints 
            (id, description, image_path, category, priority, location, status, timestamp, anonymous)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['id'],
            data['description'],
            data['image_path'],
            data['category'],
            data['priority'],
            data['location'],
            data['status'],
            data['timestamp'],
            data['anonymous']
        ))
        
        # Update department stats
        department = get_department_by_category(data['category'])
        cursor.execute('''
            UPDATE departments 
            SET total_complaints = total_complaints + 1
            WHERE name = ?
        ''', (department,))
        
        conn.commit()
        conn.close()
        
        print(f"✅ Complaint {data['id']} saved successfully!")
        return True
        
    except Exception as e:
        print(f"Error saving complaint: {str(e)}")
        return False


def get_complaint_by_id(complaint_id):
    """Fetch complaint details by ID"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM complaints WHERE id = ?', (complaint_id,))
        row = cursor.fetchone()
        conn.close()
        
        if row:
            return dict(row)
        return None
        
    except Exception as e:
        print(f"Error fetching complaint: {str(e)}")
        return None


def get_all_complaints():
    """Fetch all complaints for admin dashboard"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM complaints ORDER BY timestamp DESC')
        rows = cursor.fetchall()
        conn.close()
        
        return [dict(row) for row in rows]
        
    except Exception as e:
        print(f"Error fetching complaints: {str(e)}")
        return []


def update_complaint_status(complaint_id, new_status):
    """Update complaint status"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # If status is being set to resolved, record timestamp
        if new_status == 'Resolved':
            cursor.execute('''
                UPDATE complaints 
                SET status = ?, resolved_at = ?
                WHERE id = ?
            ''', (new_status, datetime.now(), complaint_id))
            
            # Update department resolved count
            cursor.execute('''
                SELECT category FROM complaints WHERE id = ?
            ''', (complaint_id,))
            result = cursor.fetchone()
            
            if result:
                category = result['category']
                department = get_department_by_category(category)
                
                cursor.execute('''
                    UPDATE departments 
                    SET complaints_resolved = complaints_resolved + 1
                    WHERE name = ?
                ''', (department,))
        else:
            cursor.execute('''
                UPDATE complaints 
                SET status = ?
                WHERE id = ?
            ''', (new_status, complaint_id))
        
        conn.commit()
        conn.close()
        
        print(f"✅ Complaint {complaint_id} status updated to {new_status}")
        return True
        
    except Exception as e:
        print(f"Error updating status: {str(e)}")
        return False


def get_leaderboard_data():
    """Get department performance data for leaderboard"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT 
                name,
                total_complaints,
                complaints_resolved,
                CASE 
                    WHEN total_complaints > 0 
                    THEN ROUND((complaints_resolved * 100.0 / total_complaints), 1)
                    ELSE 0 
                END as resolution_rate
            FROM departments
            ORDER BY complaints_resolved DESC, resolution_rate DESC
        ''')
        
        rows = cursor.fetchall()
        conn.close()
        
        return [dict(row) for row in rows]
        
    except Exception as e:
        print(f"Error fetching leaderboard data: {str(e)}")
        return []


def send_whatsapp_reply(to_number, message):
    """
    Send WhatsApp reply using Twilio API
    Configure your Twilio credentials in environment variables
    """
    try:
        # Uncomment and configure for production
        # from twilio.rest import Client
        # 
        # account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
        # auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
        # whatsapp_from = os.environ.get('TWILIO_WHATSAPP_NUMBER')
        # 
        # client = Client(account_sid, auth_token)
        # 
        # message = client.messages.create(
        #     from_=f'whatsapp:{whatsapp_from}',
        #     body=message,
        #     to=to_number
        # )
        
        print(f"📱 WhatsApp reply sent to {to_number}: {message}")
        return True
        
    except Exception as e:
        print(f"Error sending WhatsApp reply: {str(e)}")
        return False
