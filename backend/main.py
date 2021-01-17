import os

from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from opentok import OpenTok

VONAGE_API_KEY = os.getenv("VONAGE_API_KEY")
VONAGE_API_SECRET = os.getenv("VONAGE_API_SECRET")

app = Flask(__name__)
CORS(app)

opentok = OpenTok(VONAGE_API_KEY, VONAGE_API_SECRET)

sessions = {}

@app.route("/new-session")
def new_session():
    try:
        session = opentok.create_session()
        sessions[session.session_id] = session
        print(sessions)
        return jsonify({'sessionID': session.session_id})
    except Exception as e:
        print(e)
        return jsonify({'error': 'unknown-error'})

@app.route("/get-token", methods=["POST"])
def get_token():
    try:
        request_json = request.get_json()
        if 'sessionID' not in request_json.keys():
            return jsonify({'error': 'sessionID key is missing'})

        session = sessions.get(request_json['sessionID'])
        print(sessions)
        if session is None:
            return jsonify({'error': 'invalid sessionID'})

        return jsonify({'token': session.generate_token()})
    except Exception as e:
        print(e)
        return jsonify({'error': 'unknown-error'})

if __name__=='__main__':
    load_dotenv()
