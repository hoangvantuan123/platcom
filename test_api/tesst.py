import requests
import json

# Thay đổi URL của API nếu cần thiết
url = 'http://localhost:8000/api/messages/'

# Dữ liệu tin nhắn mới với chuỗi UUID hợp lệ
data = {
    'text': 'Hello from the client',
    'sender_id': 'a1f357bd-a734-484f-b5dd-aa1166b6ab2d',
    'receiver_id': 'f8ffaadf-ff3f-4c3e-a0b4-1d730f7f37c0',
}

# Chuyển đổi dữ liệu thành chuỗi JSON
json_data = json.dumps(data)

# Gửi yêu cầu POST với header 'Content-Type' là 'application/json'
response = requests.post(url, data=json_data, headers={'Content-Type': 'application/json'})

# Kiểm tra mã trạng thái HTTP
if response.status_code == 200:
    print('Tin nhắn đã được tạo thành công')
    print(response.json())
else:
    print('Lỗi trong quá trình tạo tin nhắn:', response.json())
