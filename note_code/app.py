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
    


##################################
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            user = Users.objects.filter(email=email).first()
            if not user:
                raise serializers.ValidationError('Email hoặc mật khẩu không chính xác')

            if not user.check_password(password):
                raise serializers.ValidationError('Email hoặc mật khẩu không chính xác')

            # Mật khẩu chính xác, tiếp tục xử lý
            db_name = f"user_{user.username}"
            db_connection = {
                'dbname': db_name,
                'user': 'tuanhoang',
                'password': 'password',
                'host': 'localhost',
                'port': '5432',
            }
            
            conn = psycopg2.connect(**db_connection)
            print('Kết nối cơ sở dữ liệu thành công')
            
            cursor = conn.cursor()
            table_names = []
            data_from_tables = {}

            cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
            for row in cursor.fetchall():
                table_names.append(row[0])

            for table_name in table_names:
                cursor.execute(f'SELECT * FROM {table_name}')
                rows = cursor.fetchall()
                columns = [desc[0] for desc in cursor.description]
                data = [dict(zip(columns, row)) for row in rows]
                data_from_tables[table_name] = data

            attrs['user'] = user
            attrs['data_from_tables'] = data_from_tables

            cursor.close()
            conn.close()
            return attrs
        else:
            raise serializers.ValidationError('Vui lòng cung cấp cả email và mật khẩu')

    def to_representation(self, instance):
        user = instance['user']
        user_info = {
            'id': str(user.id),
            'username': user.username,
            'email': user.email,
        }
        if 'data_from_tables' in instance:
            user_info['data_from_tables'] = instance['data_from_tables']
        return user_info