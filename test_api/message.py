import requests

url = 'http://localhost:8000/api/messages/'

data = {
    "text": "Hello toi la tuan",
    "sender_id": "e5faa672-6d94-4d5d-a73b-8af46425312a",
    "receiver_id": "1b4bb640-635b-46c0-8963-cdc41fa1b5ed"
}

response = requests.post(url, json=data)

if response.status_code == 200:
    print(response.json())
else:
    print('Error:', response.status_code)
