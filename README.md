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




# No.02
- Sử dụng DèaultRouter và router.register()
- Đây là một cách nhanh và gọn để đăng ký các viwset và xác định các đường dẫn tương ứng. Nó giúp giảm bớt việc lặp lại và tự động tạo ra các đường dẫn 
RESTful cho các tài nguyên.

Tuy nhiên, nếu bạn muốn sử dụng path để định nghĩa từng đường dẫn một, điều đó cũng hoàn toàn khả thi và phổ biến. Nó cho phép bạn có kiểm soát tốt hơn về cấu trúc đường dẫn và phương thức xử lý tương ứng.

Cả hai cách tiếp cận đều có nhược điểm và lợi ích của riêng chúng. Lựa chọn giữa hai phụ thuộc vào yêu cầu cụ thể của dự án của bạn và sự ưu tiên của bạn với sự tiện lợi, linh hoạt hoặc độ chính xác trong việc định nghĩa đường dẫn và xử lý view.

Nếu bạn quan tâm đến việc giảm thiểu mã lặp lại và tự động tạo ra các đường dẫn RESTful, sử dụng DefaultRouter và router.register() là một lựa chọn tốt. Nếu bạn muốn kiểm soát cấu trúc đường dẫn và phương thức xử lý một cách chi tiết hơn, bạn có thể sử dụng path để định nghĩa từng đường dẫn một.

- Nếu sử dụng Reactjs và Redux, việc sử dụng DefaultRouter và router.register() có thể đem lại lợi ích lớn. Điều này cho phép Django tự động tạo ra các đường dẫn RESTful cho tài nguyên của bạn, giúp giảm thiểu công việc lặp lại và giúp việc tương tác với API dễ dàng hơn. Bạn có thể sử dụng các thư viện HTTP như Axios để thực hiện các yêu cầu HTTP từ phía frontend của bạn và Redux Toolkit để quản lý trạng thái ứng dụng.


curl -X POST -H "Content-Type: application/json" -d '{"sender": "c6984ef5-cb7b-4379-afdc-5a1254c2524e", "content": "Nội dung tin nhắn"}' http://localhost:8000/messages/
