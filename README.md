# platcom

# Back-end

Để sử dụng Django REST framework, bạn cần cài đặt nó thông qua pip bằng cách chạy lệnh sau trong terminal:

```
pip install pipenv
pip install djangorestframework
pip install django-cors-headers
django-admin startproject project .
python manage.py startapp app
python manage.py makemigrations
python manage.py migrate
#Dat mat khau
python manage.py createsuperuser
python manage.py runserver

```

Backend là một phần quan trọng của hệ thống web, nó giúp xử lý các yêu cầu từ phía người dùng, lưu trữ và truy vấn dữ liệu từ cơ sở dữ liệu và cung cấp các dịch vụ web qua các API. Trong mô tả này, chúng ta sẽ tìm hiểu về việc sử dụng Django Rest Framework và PostgreSQL để xây dựng một backend cho một ứng dụng web.

## **Django Rest Framework**

Django là một framework phổ biến trong lập trình web, nó cung cấp một cách tiếp cận nhanh chóng và hiệu quả để xây dựng các ứng dụng web. Django Rest Framework (DRF) là một phần mở rộng của Django, nó cung cấp các công cụ và thư viện hỗ trợ để xây dựng các API RESTful cho ứng dụng web.

DRF cho phép xây dựng các API RESTful phức tạp với các tính năng như xác thực, phân quyền, serialization, thực hiện CRUD, … và nhiều tính năng khác. DRF sử dụng các Serializer để tạo ra định dạng dữ liệu phù hợp cho API. Serializer cũng hỗ trợ validation để đảm bảo tính toàn vẹn và độ chính xác của dữ liệu.

## **PostgreSQL**

PostgreSQL là một hệ quản trị cơ sở dữ liệu (DBMS) mã nguồn mở, nó được sử dụng phổ biến trong các ứng dụng web để lưu trữ và truy vấn dữ liệu. PostgreSQL có khả năng xử lý dữ liệu rất lớn và đa dạng, cung cấp các tính năng như hỗ trợ cho các kiểu dữ liệu phức tạp, đa luồng, và các tính năng quản lý dữ liệu tiên tiến.




## No.01:  Trong file app/serializer.py
Để tối ưu việc lấy dữ liệu từ tất cả các bảng trong cơ sở dữ liệu con, bạn có thể sử dụng một số phương pháp như sau:

1. Sử dụng kỹ thuật "Lazy Loading": Thay vì lấy tất cả dữ liệu từ các bảng trong cùng một thời điểm, bạn có thể chỉ lấy dữ liệu khi cần thiết. Khi người dùng yêu cầu dữ liệu từ một bảng cụ thể, bạn mới truy vấn và trả về dữ liệu từ bảng đó. Điều này giúp giảm tải cho cơ sở dữ liệu và giảm thời gian phản hồi.

2. Sử dụng Caching: Bạn có thể sử dụng các công cụ caching như Redis để lưu trữ dữ liệu từ các bảng con. Khi một người dùng yêu cầu dữ liệu từ bảng, bạn có thể kiểm tra xem dữ liệu đã được lưu trong cache chưa. Nếu có, bạn có thể trả về dữ liệu từ cache mà không cần truy vấn cơ sở dữ liệu. Điều này cải thiện hiệu suất và giảm tải cho cơ sở dữ liệu.

3. Tối ưu câu truy vấn: Đảm bảo rằng các câu truy vấn SQL của bạn đã được tối ưu. Sử dụng các chỉ mục, đồng bộ hóa truy vấn, và sử dụng các câu truy vấn hiệu quả để chỉ lấy dữ liệu cần thiết.

4. Sử dụng Pagination: Trong trường hợp có rất nhiều dữ liệu trong các bảng con, hãy xem xét việc sử dụng phân trang (pagination) để trả về dữ liệu theo từng phần. Điều này giúp giảm tải cho cả server và client và tăng hiệu suất của ứng dụng.

Ngoài ra, còn một số yếu tố khác cần xem xét như cấu trúc cơ sở dữ liệu, quy mô hệ thống, số lượng người dùng và yêu cầu chức năng cụ thể. Tối ưu hóa hiệu suất là quá trình liên tục và tùy thuộc vào yêu cầu và tình huống cụ thể của dự án.




 {data &&
        data.map((item) => (
          <div key={item.id}>
            {/* Hiển thị dữ liệu từ mỗi bản ghi */}
            <p>{item.admin_email}</p>
            {/* Thêm các trường dữ liệu khác tùy thuộc vào cấu trúc dữ liệu */}
          </div>
        ))}


