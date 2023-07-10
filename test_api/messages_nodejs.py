import requests

base_url = 'http://localhost:5000'

send_message_url = f'{base_url}/api/messages/'
send_message_payload = {
    'content': 'Hi?',
    'sender_id': '7668899',
    'receiver_id': '7668899',
    
}
response = requests.post(send_message_url, json=send_message_payload)
print(response.json())
