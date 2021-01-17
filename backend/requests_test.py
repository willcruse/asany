import requests


req = requests.get("http://localhost:5000/new-session")

req_json = req.json()
print(req_json)
req_token = requests.post("http://localhost:5000/get-token", json={'sessionID': req_json['sessionID']})
print(req_token.text)

req_token = requests.post("http://localhost:5000/set-workout", json={'sessionID': req_json['sessionID'], 'workout': 1})
print(req_token.text)
