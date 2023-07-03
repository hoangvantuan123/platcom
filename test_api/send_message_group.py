import requests

base_url = 'http://localhost:8000'
group_id = '681ad802-bd4a-48d7-b843-93e4f3792eda'
# Yêu cầu POST để gửi một tin nhắn mới tới một nhóm
send_message_url = f'{base_url}/send-message-group/{group_id}/'
send_message_payload = {
    'message': 'Hi?',
    'sender_id': 'e5faa672-6d94-4d5d-a73b-8af46425312a'
}
response = requests.post(send_message_url, json=send_message_payload)
print(response.json())
