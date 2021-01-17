import os
from dataclasses import dataclass

from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from opentok import OpenTok, Session

load_dotenv()

VONAGE_API_KEY = os.getenv("VONAGE_API_KEY")
VONAGE_API_SECRET = os.getenv("VONAGE_API_SECRET")

app = Flask(__name__)
CORS(app)

opentok = OpenTok(VONAGE_API_KEY, VONAGE_API_SECRET)

sessions = {}

@dataclass
class WorkoutSession:
    session: Session
    workout: int

@app.route("/new-session")
def new_session():
    try:
        session = opentok.create_session()
        sessions[session.session_id] = WorkoutSession(session, -1)
        return jsonify({'sessionID': session.session_id})
    except Exception:
        return jsonify({'error': 'unknown-error'})

@app.route("/get-token", methods=["POST"])
def get_token():
    try
        request_json = request.get_json()
        if 'sessionID' not in request_json.keys():
            return jsonify({'error': 'sessionID key is missing'})

        workout_session = sessions.get(request_json['sessionID'])
        if workout_session is None:
            return jsonify({'error': 'invalid sessionID'})

        return jsonify({'token': workout_session.session.generate_token()})
    except Exception:
        return jsonify({'error': 'unknown-error'})

@app.route("/set-workout", methods=["POST"])
def set_workout():
    try:
        request_json = request.get_json()
        if not all(req_key in request_json.keys() for req_key in ['sessionID', 'workout']):
            return jsonify({'error': 'key is missing'})

        workout_session = sessions.get(request_json['sessionID'])
        if workout_session is None:
            return jsonify({'error': 'invalid sessionID'})

        workout_session.workout = request_json['workout']
        return jsonify({'success': True})
    except Exception:
        return jsonify({'error': 'unknown-error'})

if __name__=='__main__':
    load_dotenv()
