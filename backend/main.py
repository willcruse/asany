import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from opentok import OpenTok

VONAGE_API_KEY = os.getenv("VONAGE_API_KEY")
VONAGE_API_SECRET = os.getenv("VONAGE_API_SECRET")

app = Flask(__name__)
CORS(app)

opentok = OpenTok(VONAGE_API_KEY, VONAGE_API_SECRET)

@app.route("/")
def hello_world(self):
    return "Hello Worlds"


if __name__=='__main__':
    load_dotenv()
