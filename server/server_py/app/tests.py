   
      
""" 

{ 
  "email": "user@gmail.com", 
  "password": "1234567890"
}
{ 
  "email": "user3@gmail.com  ", 
  "password": "pbkdf2_sha256$600000$KkjxR5mPrsZ2JTYMBwe36O$6rViFPBbgBqeQAfXzqkn0oLeTTvCTYlPxax/cIxXW7k="

}
{
  "email": "tuanhoang@gmail.com",
  "username": "backenddata",
  "password": "1234567890"        
}

                                         password                                         |                  id                  |        email        | username  | phone_number | hometown | birth_date | user_status | admin_role |     admin_email     | job_title | department | department_abbreviation | department_id | memory_status |          created_at           |          updated_at           | last_login 
------------------------------------------------------------------------------------------+--------------------------------------+---------------------+-----------+--------------+----------+------------+-------------+------------+---------------------+-----------+------------+-------------------------+---------------+---------------+-------------------------------+-------------------------------+------------
 pbkdf2_sha256$600000$y84FSyejwQl3GYZnViTRto$zm7A/1tgSkZCu448q27eVIy1sAmoH/FsriajvowA5bA= | 862d49fa-f485-4a3a-a0af-04edd8a566a4 | user@gmail.com      | user      | 0353203012   | Hà Nội   | 2023-06-12 | online      | f          | tuanhoang@gmail.com | Giám đốc  | Coder      | GĐ                      | MD_GĐ         | 50            | 2023-06-12 20:22:52.108264+07 | 2023-06-12 20:22:52.108279+07 | 

   """ 

from django.test import TestCase, Client
from rest_framework.test import APIClient

class UserRegistrationTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_user_registration(self):
        # Đăng nhập vào tài khoản siêu người dùng trước
        # Đăng nhập vào tài khoản siêu người dùng trước
        logged_in = self.client.login(email="user@gmail.com", password="1234567890")
        print(logged_in)
        self.assertTrue(logged_in)
        # Lấy thông tin đăng nhập của tài khoản siêu người dùng
        current_user = self.client.user
        # Gửi yêu cầu đăng ký người dùng
        data = {
            "email": "tuanhoang@gmail.com",
            "username": "backenddata",
            "password": "examplepassword"
            # Thêm các trường thông tin người dùng khác tùy ý
        }
        response = self.client.post('/register/', data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['message'], 'User registered successfully')
        # Kiểm tra xem người dùng đã được tạo thành công trong cơ sở dữ liệu
        # Kiểm tra các giá trị khác tùy ý

