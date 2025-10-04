"""
Configuration file for the AI Complaint Redressal System
Modify these settings as needed for your deployment
"""

import os

class Config:
    # Flask Configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    DEBUG = True
    
    # File Upload Configuration
    UPLOAD_FOLDER = 'static/uploads'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}
    
    # Database Configuration
    DATABASE_NAME = 'complaints.db'
    
    # Twilio Configuration (for WhatsApp integration)
    TWILIO_ACCOUNT_SID = os.environ.get('TWILIO_ACCOUNT_SID', '')
    TWILIO_AUTH_TOKEN = os.environ.get('TWILIO_AUTH_TOKEN', '')
    TWILIO_WHATSAPP_NUMBER = os.environ.get('TWILIO_WHATSAPP_NUMBER', '')
    
    # AI Model Configuration
    AI_MODEL_PATH = 'models/complaint_classifier.h5'
    USE_AI_CLASSIFICATION = False  # Set to True when AI model is implemented
    
    # Priority Keywords
    HIGH_PRIORITY_KEYWORDS = [
        'urgent', 'emergency', 'dangerous', 'severe', 'critical', 
        'hazardous', 'injury', 'accident', 'blocked', 'broken'
    ]
    MEDIUM_PRIORITY_KEYWORDS = [
        'repair', 'fix', 'problem', 'issue', 'concern', 
        'needs attention', 'damaged'
    ]
    LOW_PRIORITY_KEYWORDS = [
        'minor', 'small', 'request', 'suggestion', 'maintenance'
    ]
    
    # Department Categories
    DEPARTMENTS = [
        'Roads and Infrastructure',
        'Sanitation and Waste Management',
        'Street Lighting',
        'Water Supply',
        'Drainage and Sewerage',
        'Public Health'
    ]
    
    # Complaint Categories
    COMPLAINT_CATEGORIES = [
        'Pothole',
        'Road Damage',
        'Garbage',
        'Waste',
        'Streetlight',
        'Lighting',
        'Water',
        'Drainage',
        'Health',
        'Other'
    ]
    
    # Application Settings
    HOST = '0.0.0.0'
    PORT = 5000
    
    # Pagination
    COMPLAINTS_PER_PAGE = 50
    
    # Email Configuration (optional)
    MAIL_SERVER = os.environ.get('MAIL_SERVER', '')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', 587))
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME', '')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD', '')


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False
    SECRET_KEY = os.environ.get('SECRET_KEY')  # Must be set in production


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
