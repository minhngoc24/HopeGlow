from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.getenv("OPENAI_API_KEY")
print("API KEY:", api_key)  # kiểm tra key

openai.api_key = api_key

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    title = data.get('title', '')

    if not title:
        return jsonify({'error': 'Title is required'}), 400

    prompt = f"Write a short, friendly product description for a {title}. Make it positive and engaging for donation."

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100,
            temperature=0.7
        )
        description = response.choices[0].message.content.strip()
        return jsonify({'description': description})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Failed to generate description'}), 500

if __name__ == '__main__':
    app.run(debug=True)
