import requests
import json
base_url = 'http://localhost:8000'

# API endpoint: add-member
group_id = "681ad802-bd4a-48d7-b843-93e4f3792eda"
add_member_url = f'{base_url}/add-member/{group_id}/'
add_member_payload = {
    'member_id': "900041cb-923d-4d90-b929-caa5ab726f3e"
}

response = requests.post(add_member_url, json=add_member_payload)
print(response.json())