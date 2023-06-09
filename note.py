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
                encoded_password = user.password.split('$')[-1]

                # In ra mật khẩu đã được mã hoá
                print(f"Mật khẩu mã hoá trong cơ sở dữ liệu: {encoded_password}")

                # Kiểm tra mật khẩu
                if check_password(password, user.password):
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