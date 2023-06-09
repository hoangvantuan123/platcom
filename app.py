import requests

def get_url_info(url):
    try:
        response = requests.post(url)
        response.raise_for_status()  # Kiểm tra lỗi trong response
        data = response.json()  # Giả sử API trả về dữ liệu dạng JSON
        # Xử lý dữ liệu ở đây
        return data
    except requests.exceptions.RequestException as e:
        print(f"Lỗi: Không thể lấy thông tin từ URL. {e}")
        return None

# Sử dụng hàm để lấy thông tin từ URL cụ thể
url = "http://localhost:8000/api/login/"
url_info = get_url_info(url)

if url_info:
    print(url_info)
