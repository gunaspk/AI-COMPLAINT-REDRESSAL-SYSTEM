import sqlite3
from datetime import datetime
import os

DATABASE_NAME = 'complaints.db'

def get_db_connection():
    """Create a database connection"""
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initialize database with required tables"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create complaints table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS complaints (
            id TEXT PRIMARY KEY,
            description TEXT NOT NULL,
            image_path TEXT,
            category TEXT,
            priority TEXT,
            location TEXT,
            status TEXT DEFAULT 'Submitted',
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            anonymous BOOLEAN DEFAULT 0,
            resolved_at DATETIME
        )
    ''')
    
    # Create departments table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS departments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            complaints_resolved INTEGER DEFAULT 0,
            avg_resolution_time REAL DEFAULT 0.0,
            total_complaints INTEGER DEFAULT 0
        )
    ''')
    
    # Insert default departments if they don't exist
    departments = [
        'Roads and Infrastructure',
        'Sanitation and Waste Management',
        'Street Lighting',
        'Water Supply',
        'Drainage and Sewerage',
        'Public Health'
    ]
    
    for dept in departments:
        cursor.execute('''
            INSERT OR IGNORE INTO departments (name) VALUES (?)
        ''', (dept,))
    
    conn.commit()
    conn.close()
    print("✅ Database initialized successfully!")


def get_department_by_category(category):
    """Map category to department"""
    mapping = {
        'Pothole': 'Roads and Infrastructure',
        'Road Damage': 'Roads and Infrastructure',
        'Garbage': 'Sanitation and Waste Management',
        'Waste': 'Sanitation and Waste Management',
        'Streetlight': 'Street Lighting',
        'Lighting': 'Street Lighting',
        'Water': 'Water Supply',
        'Drainage': 'Drainage and Sewerage',
        'Health': 'Public Health'
    }
    return mapping.get(category, 'Roads and Infrastructure')


if __name__ == '__main__':
    init_db()
