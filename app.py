import bcrypt

# Mật khẩu không mã hoá cụ thể
password = 'mypass123'

# Mật khẩu đã được mã hoá (được cung cấp)
hashed_password = b'$2b$12$dsHpJLJV.zNQFK9eR4Hx.eg2awww4sRBf08ft.xUl97ILl0wKj.b.'

# Kiểm tra mật khẩu
is_match = bcrypt.checkpw(password.encode('utf-8'), hashed_password)

if is_match:
    print("Mật khẩu hợp lệ!")
else:
    print("Mật khẩu không hợp lệ!")
import bcrypt

# Mật khẩu không mã hoá cụ thể
password = 'mypass123'

# Mật khẩu đã được mã hoá (được cung cấp)
hashed_password = b'$2b$12$9f42NvwPjCp7F4qds2KS1OT7GYlpZhpvUkL9ICaSCS5MSMiXAWBD6'

# Kiểm tra mật khẩu
is_match = bcrypt.checkpw(password.encode('utf-8'), hashed_password)

if is_match:
    print("Mật khẩu hợp lệ!")
else:
    print("Mật khẩu không hợp lệ!")
