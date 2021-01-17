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
    session = opentok.create_session()
    sessions[session.session_id] = session
    return jsonify({'sessionID': session.session_id})

@app.route("/get-token", methods=["POST"])
def get_token():
    request_json = request.get_json()
    if 'sessionID' not in request_json.keys():
        return jsonify({'error': 'sessionID key is missing'})

    session = sessions.get(request_json['sessionID'])
    if session is None:
        return jsonify({'error': 'invalid sessionID'})

    return jsonify({'token': session.generate_token()})

if __name__=='__main__':
    load_dotenv()
