
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'password', 'domainAddress', 'employeeCount', 'firstName', 'lastName', 'phone', 'emailContact', 'businessAddress', 'created_at', 'updated_at']

    def validate_password(self, value):
        return make_password(value)

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Users.objects.create(password=self.validate_password(password), **validated_data)

        database_name = f"user_{validated_data['username']}"
        with connection.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE {database_name};")
            # Thực hiện các câu truy vấn tạo bảng và cấu trúc dữ liệu khác trong cơ sở dữ liệu con

        return user

    def access_database(self, username):
        database_name = f"user_{username}"
        # Thực hiện các câu truy vấn để truy cập vào cơ sở dữ liệu con



def compare_password(last_part, hashed_password):
    """
    Hàm so sánh giá trị cuối cùng của mật khẩu trong bảng và giá trị cuối cùng của mật khẩu đã mã hoá.
    Trả về True nếu khớp và False nếu không khớp.
    """
    encoded_password = hashed_password.split('$')[-1]
    return check_password(last_part, encoded_password)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
   
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(request=self.context.get('request'), email=email, password=password)
        if email and password:
            user = Users.objects.filter(email=email).first()
            if user:
                # Kiểm tra mật khẩu đã được mã hoá chưa
                if not user.password.startswith('pbkdf2_sha256'):
                    raise serializers.ValidationError('Mật khẩu chưa được mã hoá')

                # Lấy phần mã hoá của mật khẩu
                hashed_password = user.password
                print('hashed_password', hashed_password)
                # Lấy giá trị cuối cùng của mật khẩu
                last_part = hashed_password.split('$')[-1]
                print('last_part', last_part)
                # So sánh mật khẩu
                if compare_password(last_part, hashed_password):
                    print("Mật khẩu đã khớp với mật khẩu trong cơ sở dữ liệu")
                else:
                    print("Mật khẩu không khớp với mật khẩu trong cơ sở dữ liệu")

                # Gán giá trị cho 'user'
                attrs['user'] = user

                # Tiếp tục xử lý các bước đăng nhập khác
                # ...

                return attrs
            else:
                raise serializers.ValidationError('Email hoặc mật khẩu không chính xác')
        else:
            raise serializers.ValidationError('Vui lòng cung cấp cả email và mật khẩu')