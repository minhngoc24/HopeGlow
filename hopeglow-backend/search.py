import firebase_admin
from firebase_admin import firestore, credentials
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize Firebase Admin SDK
cred = credentials.Certificate('search.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/search', methods=['GET'])
def search_items():
    keyword = request.args.get('q', ''). lower()
    current_user_id = request.args.get('user_id', '')

    matching_items = []

    items_ref = db.collection('donations')
    all_items = items_ref.stream()

    for item in all_items:
        data = item.to_dict()
        title = data.get('title', '').lower()
        description = data.get('description', '').lower()
        donor_id = data.get('donor_id', '')
        if keyword in title or keyword in description:
            if donor_id != current_user_id:  # Exclude items donated by the current user
                matching_items.append({
                    'id': item.id,
                    'title': data.get('title', ''),
                    'description': data.get('description', ''),
                    'donor_id': donor_id,
                    'image_url': data.get('image_url', ''),
                    'contact_info': data.get('contact_info', '')
                })
    return jsonify({'results' : matching_items})

if __name__ == '__main__':
    print("Starting search service...")
    app.run(debug=True)