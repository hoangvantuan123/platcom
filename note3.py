class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        print('password' , password)
        hashed_password_password = make_password(password)
        print('hashed_password_password' , hashed_password_password)
        if email and password:
            user = Users.objects.filter(email=email).first()
            if not user:
                raise serializers.ValidationError('Email hoặc mật khẩu không chính xác')
            
            # Kiểm tra mật khẩu
            if check_password(password, make_password(password)):
                if not make_password(password).startswith('pbkdf2_sha256'):
                    raise serializers.ValidationError('Mật khẩu chưa được mã hoá')
                
                # Mật khẩu chính xác, tiếp tục xử lý
                db_name = f"user_{user.username}"
                db_url = f"postgresql://tuanhoang:password@localhost/{db_name}"
                engine = create_engine(db_url)

                Session = sessionmaker(bind=engine)
                session = Session()
                if session.is_active:
                    attrs['user'] = user
                    attrs['db_connection'] = 'Kết nối cơ sở dữ liệu thành công'
                    session.close()
                    return attrs
                else:
                    raise serializers.ValidationError('Không thể kết nối đến cơ sở dữ liệu con')
            else:
                raise serializers.ValidationError('Email hoặc mật khẩu không chính xác')
        else:
            raise serializers.ValidationError('Vui lòng cung cấp cả email và mật khẩu')

