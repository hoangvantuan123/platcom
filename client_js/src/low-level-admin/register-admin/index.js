import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Frame_box1 from "./frame_box1";
import Frame_box2 from "./frame_box2";
import Frame_box3 from "./frame_box3";
import { useDispatch } from "react-redux";
import { registerUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Register_admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [domainAddress, setDomainAddress] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const steps = [
    {
      label: (
        <Frame_box1
          username={username}
          domainAddress={domainAddress}
          employeeCount={employeeCount}
          setUsername={setUsername}
          setDomainAddress={setDomainAddress}
          setEmployeeCount={setEmployeeCount}
        />
      ),
      content: "Content for Select campaign settings",
    },
    {
      label: (
        <Frame_box2
          firstName={firstName}
          lastName={lastName}
          emailContact={emailContact}
          phone={phone}
          businessAddress={businessAddress}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setPhone={setPhone}
          setEmailContact={setEmailContact}
          setBusinessAddress={setBusinessAddress}
        />
      ),
      content: "Content for Create an ad group",
    },
    {
      label: (
        <Frame_box3
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      ),
      content: "Content for Create an ad",
    },
  ];
  // console.log("steps", steps);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra điều kiện các giá trị trước khi tiếp tục
    if (
      !username ||
      !email ||
      !password ||
      !domainAddress ||
      !employeeCount ||
      !firstName ||
      !lastName ||
      !phone ||
      !emailContact ||
      !businessAddress
    ) {
      alert("Vui lòng điền đầy đủ thông tin");
      return; // Dừng hàm nếu có giá trị không hợp lệ
    }
    const userData = {
      username: username, // 1. Tên Doanh nghiệp
      email: email, // 3. Thư điện tử
      password: password, // 3 Mật Khâu
      domainAddress: domainAddress, // 1 Địa chỉ miền
      employeeCount: employeeCount, // 1 Số Lượng nhân viên
      firstName: firstName, // 2 Tên
      lastName: lastName, // 2 Họ
      phone: phone, // 2 Số điện thoại
      emailContact: emailContact, // 2 Email liên hệ
      businessAddress: businessAddress, // 2 Địa chỉ doanh nghiệp
    };
    // Thiết lập biến trạng thái để kiểm tra việc gửi thành công
    let requestSuccess = false;

    try {
      if (requestSuccess) {
        alert("Gửi không thành công. Vui lòng thử lại sau.");
      } else {
        // Gửi yêu cầu đăng ký người dùng
        await dispatch(registerUser(userData));
        // Xử lý logic khi thành công
        // Ví dụ: Hiển thị thông báo thành công và chuyển hướng đến trang mới
        alert("Đăng ký thành công!");
        // Chuyển hướng đến trang mới
        requestSuccess = true;
        navigate("/new-page");
        // Đánh dấu yêu cầu thành công
      }
    } catch (error) {
      // Xử lý logic khi có lỗi
      setError(error.message);
      // Hiển thị thông báo lỗi
      alert("Gửi không thành công. Vui lòng thử lại sau.");
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <button
              onClick={() => setActiveStep(0)}
              className="inline-block rounded-lg border hover:bg-slate-100 px-7 py-3 text-sm font-medium text-black opacity-80"
            >
              Reset
            </button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box className="mb-11">
            <Typography sx={{ mt: 2, mb: 1 }}>
              {steps[activeStep].label}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
                gap: " 0 20px",
                justifyContent: "flex-end",
              }}
            >
              {activeStep > 0 && (
                <button
                  onClick={handleBack}
                  className="inline-block rounded-lg border hover:bg-slate-100 px-7 py-3 text-sm font-medium text-black opacity-80"
                >
                  Back
                </button>
              )}
              <button
                onClick={
                  activeStep === steps.length - 1 ? handleSubmit : handleNext
                }
                className="inline-block rounded-lg border hover:bg-slate-100 px-7 py-3 text-sm font-medium text-black opacity-80"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </button>
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
