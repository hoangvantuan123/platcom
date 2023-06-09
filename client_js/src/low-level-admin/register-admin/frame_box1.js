import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
export default function Frame_box1({
  setDomainAddress,
  setEmployeeCount,
  setUsername,
  domainAddress,
  employeeCount,
  username,
}) {
  const handleUsernameChange = (e) => {
    const inputValue = e.target.value;

    // Xóa dấu tiếng Việt
    const strippedValue = inputValue
      .toLowerCase()
      .replace(/đ/g, "d")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // Xóa khoảng trắng và chuyển thành dạng không dấu
    const sanitizedValue = strippedValue.replace(/\s+/g, "");

    // Cập nhật giá trị
    setUsername(sanitizedValue);
  };
  const handleDomainAddressChange = (e) => {
    setDomainAddress(e.target.value);
  };
  const handleEmployeeCountChange = (e) => {
    const selectedValue = e.target.value;
    let parsedValue;

    switch (selectedValue) {
      case "10":
        parsedValue = 10;
        break;
      case "50":
        parsedValue = 50;
        break;
      case "100":
        parsedValue = 100;
        break;
      default:
        parsedValue = null;
        break;
    }

    setEmployeeCount(parsedValue);
    // Thực hiện các xử lý khác tại đây (nếu cần)
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4  sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>

      <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div className="mb-5">
          <div className="relative">
            <FormLabel
              style={{
                color: "inherit", // Tắt màu cho FormLabel khi click
                opacity: "0.6",
              }}
            >
              Company's name
            </FormLabel>
            <input
              type="name"
              className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="PlatCom"
              onChange={handleUsernameChange}
              value={username} // Thêm giá trị vào trường input
            />
          </div>
        </div>
        <div className=" mb-10">
          <div className="relative">
            <FormLabel
              style={{
                color: "inherit", // Tắt màu cho FormLabel khi click
                opacity: "0.6",
              }}
            >
              Domain address
            </FormLabel>
            <input
              type="text"
              className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="PlatCom.vn"
              onChange={handleDomainAddressChange}
              value={domainAddress} // Thêm giá trị vào trường input
            />
          </div>
        </div>
        <div>
          <FormControl>
            <FormLabel
              style={{
                color: "inherit", // Tắt màu cho FormLabel khi click
                opacity: "0.6",
              }}
            >
              Size of Business/Organization
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={employeeCount}
            >
              <FormControlLabel
                value="10"
                control={<Radio />}
                label="1-10 employees"
                className=" opacity-80"
                onChange={handleEmployeeCountChange}
              />
              <FormControlLabel
                value="50"
                control={<Radio />}
                label="11-50 employees"
                className=" opacity-80"
                onChange={handleEmployeeCountChange}
              />
              <FormControlLabel
                value="100"
                control={<Radio />}
                label="51-100 employees"
                className=" opacity-80"
                onChange={handleEmployeeCountChange}
              />
              <FormControlLabel
                value="500"
                control={<Radio />}
                label="101-500 employees"
                className=" opacity-80"
                onChange={handleEmployeeCountChange}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </form>
    </div>
  );
}
