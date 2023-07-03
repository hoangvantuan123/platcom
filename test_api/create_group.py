import requests
import json
base_url = 'http://localhost:8000'

create_group_url = f'{base_url}/create-group/'
create_group_payload = {
    'name': 'Chat Base Group',
    'members': ["e5faa672-6d94-4d5d-a73b-8af46425312a", "1b4bb640-635b-46c0-8963-cdc41fa1b5ed"]
}

response = requests.post(create_group_url, json=create_group_payload)
print(response.json())