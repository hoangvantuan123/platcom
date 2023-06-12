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



#################################

Base = declarative_base()
class UserAccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = UserAccount
        # fields = ['id', 'email' ,'username','password', 'phone_number', 'hometown', 'birth_date', 'user_status', 'admin_email', 'job_title', 'department', 'department_abbreviation', 'department_id', 'memory_status', 'created_at', 'updated_at', 'last_login']
        fields = ['id', 'email' ,'username','password', 'created_at', 'updated_at']
    def create(self, validated_data):
        password = validated_data.pop('password')
        # Lấy thông tin đăng nhập của tài khoản siêu người dùng
        current_user = self.context['request'].user

        # Gắn giá trị username từ tải khoản siêu người dùng vào validated_data
        validated_data['username'] = current_user.username

        # Tạo đối tượng UserAccount
        user = UserAccount(**validated_data)
        user.set_password(password)

        # Kết nối với cơ sở dữ liệu với posgreSQl 
        db_name = f"user_{validated_data['username']}"
        db_url = f"postgresql://tuanhoang:password@localhost/backenddata"
        engine = create_engine(db_url)  

        # Tạo bảng và lưu dữ liệu 
        Session = sessionmaker(bind=engine)
        session = Session()

        # Tạo bảng trong cơ sở dữ liệu 

        Base.metadata.create_all(engine)

        # Lưu thông tin người dùng vào bảng
        session.add(user)
        session.commit()

      #  kết nối với cơ sở dữ liệu postgsql tương ứng 

        return user