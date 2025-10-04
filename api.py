from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from datetime import datetime
from helpers import (
    categorize_image, 
    detect_priority, 
    generate_complaint_id,
    save_complaint,
    get_complaint_by_id,
    get_leaderboard_data,
    send_whatsapp_reply,
    update_complaint_status,
    get_all_complaints
)
from database import init_db

app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app)  # Enable CORS for React frontend

app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
init_db()

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Serve React App
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


# ==================== REST API ENDPOINTS ====================

@app.route('/api/complaints', methods=['GET'])
def get_complaints():
    """Get all complaints"""
    try:
        complaints = get_all_complaints()
        return jsonify({'success': True, 'complaints': complaints})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@app.route('/api/complaints/<complaint_id>', methods=['GET'])
def get_complaint(complaint_id):
    """Get complaint by ID"""
    try:
        complaint = get_complaint_by_id(complaint_id)
        if complaint:
            return jsonify({'success': True, 'complaint': complaint})
        return jsonify({'success': False, 'message': 'Complaint not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@app.route('/api/complaints', methods=['POST'])
def create_complaint():
    """Create new complaint"""
    try:
        description = request.form.get('description', '')
        location = request.form.get('location', '')
        anonymous = request.form.get('anonymous') == 'true'
        latitude = request.form.get('latitude', '')
        longitude = request.form.get('longitude', '')
        
        image_path = None
        category = 'Uncategorized'
        
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                filename = f"{timestamp}_{filename}"
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                image_path = f"uploads/{filename}"
                category = categorize_image(filepath)
        
        priority = detect_priority(description)
        complaint_id = generate_complaint_id()
        
        complaint_data = {
            'id': complaint_id,
            'description': description,
            'image_path': image_path,
            'category': category,
            'priority': priority,
            'location': f"{latitude},{longitude}" if latitude and longitude else location,
            'status': 'Submitted',
            'timestamp': datetime.now(),
            'anonymous': anonymous
        }
        
        save_complaint(complaint_data)
        
        return jsonify({
            'success': True,
            'complaint_id': complaint_id,
            'category': category,
            'priority': priority,
            'message': 'Complaint submitted successfully!'
        })
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@app.route('/api/complaints/<complaint_id>/status', methods=['PUT'])
def update_status(complaint_id):
    """Update complaint status"""
    try:
        data = request.get_json()
        new_status = data.get('status')
        
        if not new_status:
            return jsonify({'success': False, 'message': 'Status is required'}), 400
        
        success = update_complaint_status(complaint_id, new_status)
        
        if success:
            return jsonify({'success': True, 'message': 'Status updated successfully'})
        return jsonify({'success': False, 'message': 'Failed to update status'}), 500
            
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    """Get department leaderboard"""
    try:
        data = get_leaderboard_data()
        return jsonify({'success': True, 'departments': data})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@app.route('/api/analyze-image', methods=['POST'])
def analyze_image():
    """AI image analysis"""
    try:
        if 'image' not in request.files:
            return jsonify({'success': False, 'message': 'No image provided'}), 400
        
        file = request.files['image']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"temp_{timestamp}_{filename}"
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            category = categorize_image(filepath)
            return jsonify({'success': True, 'category': category})
        
        return jsonify({'success': False, 'message': 'Invalid file type'}), 400
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get dashboard statistics"""
    try:
        complaints = get_all_complaints()
        stats = {
            'total': len(complaints),
            'submitted': len([c for c in complaints if c['status'] == 'Submitted']),
            'in_progress': len([c for c in complaints if c['status'] == 'In Progress']),
            'resolved': len([c for c in complaints if c['status'] == 'Resolved']),
        }
        return jsonify({'success': True, 'stats': stats})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


@app.route('/api/whatsapp', methods=['POST'])
def whatsapp_webhook():
    """WhatsApp webhook"""
    try:
        from_number = request.form.get('From', '')
        message_body = request.form.get('Body', '')
        
        priority = detect_priority(message_body)
        complaint_id = generate_complaint_id()
        
        complaint_data = {
            'id': complaint_id,
            'description': message_body,
            'image_path': None,
            'category': 'Uncategorized',
            'priority': priority,
            'location': 'WhatsApp',
            'status': 'Submitted',
            'timestamp': datetime.now(),
            'anonymous': False
        }
        
        save_complaint(complaint_data)
        reply = f"✅ Complaint registered! ID: {complaint_id}"
        send_whatsapp_reply(from_number, reply)
        
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'success': False}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
