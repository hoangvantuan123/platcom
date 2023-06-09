def compare_pbkdf2_hashes(hash1, hash2):
    # Tách chuỗi hash thành các phần tử
    hash_parts1 = hash1.split('$')
    hash_parts2 = hash2.split('$')

    # Lấy giá trị cuối cùng của chuỗi hash
    last_value1 = hash_parts1[-1]
    last_value2 = hash_parts2[-1]
    print(last_value1)

    print(last_value2)
    # So sánh giá trị cuối cùng
    if last_value1 == last_value2:
        return True
    else:
        return False

hash1 = 'pbkdf2_sha256$600000$TGHqTyXQAUh8F9JUBrf9Yl$ni8A6wUxdAwDcxCAjeiaixDHnUkGoaIpKs6a8l77KpM='
hash2 = 'pbkdf2_sha256$600000$TGHqTyXQAUh8F9JUBrf9Yl$ni8A6wUxdAwDcxCAjeiaixDHnUkGoaIpKs6a8l77KpM='

if compare_pbkdf2_hashes(hash1, hash2):
    print('Giá trị cuối cùng khớp')
else:
    print('Giá trị cuối cùng không khớp')
