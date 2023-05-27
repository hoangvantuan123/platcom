import styled from "styled-components";

const CustomCalendar = styled.div`
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 10px;
 
  /*Thêm các thuộc tính CSS khác tại đây để custom giao diện*/
  /* Tùy chỉnh màu nền của sự kiện */
  .fc-event {
    background-color: #ff0000;
  }

  /* Tùy chỉnh màu nền và màu chữ của tiêu đề ngày */
  .fc-day-header {
    background-color: #0000ff;
    color: #ffffff;
  }

  /* Tùy chỉnh kích thước chữ của sự kiện */
  .fc-event {
    font-size: 14px;
  }

  /* Tùy chỉnh kích thước của ô ngày */
  .fc-day {
    height: 100px;
  }

  /* Tùy chỉnh màu nền khi di chuột qua ô ngày */
  .fc-day:hover {
    background-color: #cccccc;
  }

  /* Tùy chỉnh màu nền của ô ngày đã chọn */
  .fc-day.fc-selected {
    background-color: #ffff00;
  }
  .fc-list-day-text{
    display: none;
  }
  .fc-list-day  {
    display: none;
  }
  tr{
    border: none;
  }
  .fc .fc-view-harness {
    border-radius: 20px;
    
  }
  
`;

export default CustomCalendar;