import jwt

# Chuỗi JWT cần giải mã
jwt_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuYXNhIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsImRvbWFpbkFkZHJlc3MiOiIucGxhdGNvbSIsImVtcGxveWVlQ291bnQiOjEyLCJmaXJzdE5hbWUiOiJUdWFuIiwibGFzdE5hbWUiOiJIb2FuZyIsInBob25lIjoiKCs4NCkgMzUzMjAzMDEyIiwiZW1haWxDb250YWN0IjoidHVhbnZob2FuZzIxQGdtYWlsLmNvbSIsImJ1c2luZXNzQWRkcmVzcyI6Ik5hbSBTXHUwMWExbiwgQlx1MWVhZmMgTmluaCIsImNyZWF0ZWRfYXQiOiIyMDIzLTA2LTEzVDE0OjQ3OjA0LjY2MDMyNFoiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNi0xM1QxNDo0NzowNS4xNDc4MzJaIn0.dffBsQzP1Vmljt3dqys1XaV0MqY_uojfCyLYqp5zvMs'

# Giải mã JWT
decoded_token = jwt.decode(jwt_token, 'SECRET_KEY', algorithms=['HS256'])

# Truy cập thông tin từ đối tượng giải mã
user_id = decoded_token['id']
username = decoded_token['username']
email = decoded_token['email']
# ... và các thông tin khác

print(decoded_token)  # In ra thông tin giải mã
print(user_id)
print(username)
print(email)
