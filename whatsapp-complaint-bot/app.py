from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv
import logging
import json

# Load .env from parent directory
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

# Initialize Flask app
app = Flask(__name__)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Configuration from environment variables
WHATSAPP_TOKEN = os.getenv('WHATSAPP_TOKEN')
PHONE_NUMBER_ID = os.getenv('PHONE_NUMBER_ID')
VERIFY_TOKEN = os.getenv('VERIFY_TOKEN')
VERSION = os.getenv('VERSION', 'v21.0')

# WhatsApp API URL
WHATSAPP_API_URL = f"https://graph.facebook.com/{VERSION}/{PHONE_NUMBER_ID}/messages"


# Headers for API requests
HEADERS = {
    "Authorization": f"Bearer {WHATSAPP_TOKEN}",
    "Content-Type": "application/json"
}


@app.route('/')
def home():
    return jsonify({"status": "active", "message": "Bot running!"}), 200

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "phone_id": PHONE_NUMBER_ID,
        "webhook_configured": VERIFY_TOKEN is not None
    }), 200

@app.route('/webhook', methods=['GET'])
def verify_webhook():
    """
    Webhook verification endpoint
    Meta will send a GET request to verify the webhook URL
    """
    mode = request.args.get('hub.mode')
    token = request.args.get('hub.verify_token')
    challenge = request.args.get('hub.challenge')
    
    logger.info(f"Webhook verification request: mode={mode}")
    
    # Check if mode and token are correct
    if mode == 'subscribe' and token == VERIFY_TOKEN:
        logger.info("✅ WEBHOOK VERIFIED SUCCESSFULLY!")
        return challenge, 200
    else:
        logger.error(f"❌ Webhook verification failed! Token: {token}")
        return jsonify({"error": "Forbidden", "message": "Invalid verify token"}), 403

@app.route('/webhook', methods=['POST'])
def webhook():
    """
    Main webhook endpoint to receive messages from WhatsApp
    """
    try:
        # Get the raw data
        data = request.get_json()
        
        logger.info("="*50)
        logger.info(f"📨 INCOMING WEBHOOK DATA:")
        logger.info(json.dumps(data, indent=2))
        logger.info("="*50)
        
        # Check if it's a WhatsApp Business Account message
        if data.get("object") == "whatsapp_business_account":
            
            # Loop through entries
            for entry in data.get("entry", []):
                for change in entry.get("changes", []):
                    value = change.get("value", {})
                    
                    # Check if there are messages
                    if "messages" in value:
                        for message in value["messages"]:
                            process_message(message, value)
                    
                    # Check for message status updates
                    if "statuses" in value:
                        process_status_update(value["statuses"])
        
        return jsonify({"status": "success"}), 200
    
    except Exception as e:
        logger.error(f"❌ Error processing webhook: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

# ============================================================================
# MESSAGE PROCESSING
# ============================================================================

def process_message(message, value):
    """Process incoming message"""
    try:
        # Extract message details
        from_number = message.get("from")
        message_id = message.get("id")
        message_type = message.get("type")
        timestamp = message.get("timestamp")
        
        logger.info(f"📱 Message from: {from_number}")
        logger.info(f"🔖 Message ID: {message_id}")
        logger.info(f"📝 Message type: {message_type}")
        
        # Mark message as read
        mark_as_read(message_id)
        
        # Route based on message type
        if message_type == "text":
            text_body = message.get("text", {}).get("body", "")
            logger.info(f"💬 Text: {text_body}")
            handle_text_message(from_number, text_body, message_id)
        
        elif message_type == "image":
            image_data = message.get("image", {})
            logger.info(f"🖼️ Image received: {image_data.get('id')}")
            handle_image_message(from_number, image_data, message_id)
        
        elif message_type == "location":
            location_data = message.get("location", {})
            logger.info(f"📍 Location received: {location_data}")
            handle_location_message(from_number, location_data, message_id)
        
        elif message_type == "audio":
            send_text_message(from_number, "🎤 Audio messages are not supported yet.")
        
        elif message_type == "document":
            send_text_message(from_number, "📄 Document messages are not supported yet.")
        
        else:
            send_text_message(from_number, f"Sorry, {message_type} messages are not supported.")
    
    except Exception as e:
        logger.error(f"Error processing message: {str(e)}")

def handle_text_message(from_number, text, message_id):
    """Handle incoming text messages with command routing"""
    text_lower = text.lower().strip()
    
    logger.info(f"Processing command: {text_lower}")
    
    # Command routing
    if text_lower in ["hello", "hi", "hey", "start"]:
        response = """👋 *Welcome to AI-Driven Complaint Management System!*

I can help you file complaints about:

🗑️ *Garbage* collection issues
🕳️ *Potholes* on roads  
💡 *Streetlight* problems

*Available Commands:*
• Type *complaint* to file a new complaint
• Type *status* to check complaint status
• Type *help* for more options

How can I assist you today?"""
        
        # Send reaction emoji
        send_reaction(from_number, message_id, "👋")
        send_text_message(from_number, response)
    
    elif text_lower == "complaint":
        response = """📝 *File a New Complaint*

Please provide the following information:

1️⃣ *Photo* of the issue (send an image)
2️⃣ *Location* (share your location)
3️⃣ *Description* (brief text about the problem)

I'll automatically:
✅ Categorize your complaint
✅ Generate a unique Complaint ID
✅ Track status updates

Send your photo first!"""
        
        send_text_message(from_number, response)
    
    elif text_lower == "status":
        response = """🔍 *Check Complaint Status*

Please reply with your *Complaint ID*

Format: CMP-YYYYMMDD-XXXXXX

Example: CMP-20251004-A1B2C3"""
        
        send_text_message(from_number, response)
    
    elif text_lower == "help":
        response = """ℹ️ *Help Menu*

*Available Commands:*
• *hello* - Greet the bot
• *complaint* - File a new complaint
• *status* - Check complaint status  
• *help* - Show this menu

*How to File a Complaint:*
1. Type "complaint"
2. Send a photo of the issue
3. Share your location
4. Add a brief description

*Need Human Support?*
📞 Contact: +91-XXXXXXXXXX
📧 Email: support@complaints.in"""
        
        send_text_message(from_number, response)
    
    elif text_lower.startswith("cmp-"):
        # Check complaint status
        complaint_id = text.upper()
        response = f"""📋 *Complaint Status*

🆔 Complaint ID: {complaint_id}
⏳ Status: *Pending*
📂 Category: Pothole
📅 Filed: 2025-10-04
⏰ Last Updated: 2 hours ago

Your complaint is being reviewed by our team. 
You'll receive updates on this number.

Type *help* for more options."""
        
        send_text_message(from_number, response)
    
    else:
        # Echo message
        response = f"""You said: _{text}_

Type *help* to see available commands or *complaint* to file a new complaint."""
        
        send_text_message(from_number, response)

def handle_image_message(from_number, image_data, message_id):
    """Handle incoming image messages"""
    image_id = image_data.get("id")
    caption = image_data.get("caption", "")
    mime_type = image_data.get("mime_type", "")
    
    logger.info(f"Processing image: {image_id}")
    
    # Send reaction
    send_reaction(from_number, message_id, "📸")
    
    # TODO: Download and process image with OCR
    # image_content = download_media(image_id)
    # extracted_text = process_with_ocr(image_content)
    
    response = f"""✅ *Image Received!*

📸 Image ID: {image_id}
📝 Caption: {caption if caption else "No caption"}

*Next Steps:*
📍 Please share your *location*
💬 Add a brief *description* of the issue

Your complaint will be registered shortly!"""
    
    send_text_message(from_number, response)

def handle_location_message(from_number, location_data, message_id):
    """Handle incoming location messages"""
    latitude = location_data.get("latitude")
    longitude = location_data.get("longitude")
    name = location_data.get("name", "")
    address = location_data.get("address", "")
    
    logger.info(f"Location: {latitude}, {longitude}")
    
    # Send reaction
    send_reaction(from_number, message_id, "📍")
    
    response = f"""✅ *Location Received!*

📍 *Coordinates:*
Latitude: {latitude}
Longitude: {longitude}

📌 *Location:* {name if name else 'Location captured'}
🏠 *Address:* {address if address else 'Nearby area'}

*Almost done!*
Please send a brief *text description* of the issue to complete your complaint.

Example: "Large pothole causing accidents on main road" """
    
    send_text_message(from_number, response)

def process_status_update(statuses):
    """Process message status updates (sent, delivered, read)"""
    for status in statuses:
        message_id = status.get("id")
        recipient_id = status.get("recipient_id")
        status_type = status.get("status")
        
        logger.info(f"📊 Message {message_id} status: {status_type}")

# ============================================================================
# WHATSAPP API FUNCTIONS
# ============================================================================

def send_text_message(to, message_text):
    """Send a text message via WhatsApp Cloud API"""
    payload = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": to,
        "type": "text",
        "text": {
            "preview_url": False,
            "body": message_text
        }
    }
    
    try:
        response = requests.post(
            WHATSAPP_API_URL,
            headers=HEADERS,
            json=payload,
            timeout=10
        )
        response.raise_for_status()
        logger.info(f"✅ Message sent successfully to {to}")
        return response.json()
    except requests.exceptions.RequestException as e:
        logger.error(f"❌ Failed to send message: {str(e)}")
        if hasattr(e.response, 'text'):
            logger.error(f"Response: {e.response.text}")
        return None

def send_reaction(to, message_id, emoji):
    """React to a message with an emoji"""
    payload = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": to,
        "type": "reaction",
        "reaction": {
            "message_id": message_id,
            "emoji": emoji
        }
    }
    
    try:
        response = requests.post(
            WHATSAPP_API_URL,
            headers=HEADERS,
            json=payload,
            timeout=10
        )
        response.raise_for_status()
        logger.info(f"✅ Reaction {emoji} sent to message {message_id}")
        return response.json()
    except Exception as e:
        logger.error(f"❌ Failed to send reaction: {str(e)}")
        return None

def mark_as_read(message_id):
    """Mark a message as read"""
    payload = {
        "messaging_product": "whatsapp",
        "status": "read",
        "message_id": message_id
    }
    
    try:
        response = requests.post(
            WHATSAPP_API_URL,
            headers=HEADERS,
            json=payload,
            timeout=10
        )
        response.raise_for_status()
        logger.info(f"✅ Message {message_id} marked as read")
        return response.json()
    except Exception as e:
        logger.error(f"❌ Failed to mark as read: {str(e)}")
        return None

def download_media(media_id):
    """Download media from WhatsApp (images, documents, etc.)"""
    media_url = f"https://graph.facebook.com/{VERSION}/{media_id}"
    
    try:
        # Get media URL
        response = requests.get(
            media_url,
            headers={"Authorization": f"Bearer {WHATSAPP_TOKEN}"},
            timeout=10
        )
        response.raise_for_status()
        media_data = response.json()
        download_url = media_data.get('url')
        
        # Download media content
        media_response = requests.get(
            download_url,
            headers={"Authorization": f"Bearer {WHATSAPP_TOKEN}"},
            timeout=30
        )
        media_response.raise_for_status()
        
        logger.info(f"✅ Media {media_id} downloaded successfully")
        return media_response.content
    
    except Exception as e:
        logger.error(f"❌ Failed to download media: {str(e)}")
        return None

# ============================================================================
# RUN APPLICATION
# ============================================================================

if __name__ == '__main__':
    # Check if required env variables are set
    if not WHATSAPP_TOKEN:
        logger.error("❌ WHATSAPP_TOKEN not set in .env file!")
    if not PHONE_NUMBER_ID:
        logger.error("❌ PHONE_NUMBER_ID not set in .env file!")
    if not VERIFY_TOKEN:
        logger.error("❌ VERIFY_TOKEN not set in .env file!")
    
    # Get port from environment or use default
    port = int(os.getenv('PORT', 8000))
    
    logger.info("="*50)
    logger.info("🚀 Starting WhatsApp Complaint Bot Server")
    logger.info(f"📱 Phone Number ID: {PHONE_NUMBER_ID}")
    logger.info(f"🔑 Verify Token: {VERIFY_TOKEN}")
    logger.info(f"🌐 Port: {port}")
    logger.info("="*50)
    
    # Run the Flask app
    app.run(
        host='0.0.0.0',
        port=port,
        debug=True
    )
