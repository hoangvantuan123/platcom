import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../slices/regularUserAccountSlice";
import { PlusOutlined } from "@ant-design/icons";
import DialogActions from "@mui/material/DialogActions";
const sexOptions = [
  { value: "M", label: "Nam" },
  { value: "F", label: "Nữ" },
];
const userStatusOptions = [
  { value: "On", label: "Online" },
  { value: "Off", label: "Offline" },
];
export default function Frame_User_account(props) {
  const dispatch = useDispatch();
  const { useradmin: adminUser, email: Email_Admin } = useSelector(
    (state) => state.authAdmin
  );
  const [buttonValue, setButtonValue] = useState("");
  console.log("useradmin:", adminUser);
  console.log("Email_Admin:", Email_Admin);
  const [error, setError] = useState("");
  const handleElementClick = () => {
    // Xử lý sự kiện tại đây
    props.onClose(); // Gọi hàm handleClose từ prop onClose
  };
  const [formData, setFormData] = useState({
    email: "",
    database: adminUser,
    username: "N/A",
    password: "",
    first_name: "",
    last_name: "",
    sex: "",
    phone_number: "",
    hometown: "",
    birth_date: "",
    user_status: "",
    admin_email: Email_Admin,
    admin_role: false,
    job_title: "",
    department: "",
    department_abbreviation: "",
    department_id: "",
    memory_status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setButtonValue(e.target.value);
    try {
      // Kiểm tra xem trường có phải là 'birth_date' không
      if (name === "birth_date") {
        // Định dạng giá trị là 'YYYY-MM-DD'
        const formattedDate = new Date(value).toISOString().split("T")[0];
        setFormData({ ...formData, [name]: formattedDate });
      } else if (name === "username") {
        // Bỏ qua việc cập nhật trường 'username'
        return;
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } catch (error) {
      // Xử lý lỗi ở đây, ví dụ:
      console.error(error); // Hiển thị lỗi trong console
      setError("Invalid date"); // Cập nhật thông báo lỗi trong state
      alert("Invalid date"); // Hiển thị thông báo lỗi sử dụng hàm alert
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData));
    // Reset form data
    setFormData({
      email: "",
      database: adminUser,
      username: "N/A",
      first_name: "",
      last_name: "",
      sex: "",
      password: "",
      phone_number: "",
      hometown: "",
      birth_date: "",
      user_status: "",
      admin_email: Email_Admin,
      admin_role: false,
      job_title: "",
      department: "",
      department_abbreviation: "",
      department_id: "",
      memory_status: "",
    });
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex flex-col  w-full">
        <div className="flex gap-3 w-full ">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="first_name"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
            />
          </div>
          <div className="  w-1/2 ">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="last_name"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
            />
          </div>
        </div>

        <label className="mt-4 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />
        <label className="mt-4 block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />
        <div className="flex gap-3 w-full">
          <div className="w-full">
            <label className="mt-4 block text-sm font-medium text-gray-700">
              Birth Date
            </label>
            <input
              type="text"
              placeholder="YYYY-MM-DD"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
            />
          </div>
          <div className="w-full">
            <label className="mt-4 block text-sm font-medium text-gray-700">
              Sex
            </label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
            >
              <option disabled value="">
                Select Sex
              </option>
              {sexOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label className=" mt-4 block text-sm font-medium text-gray-700">
              User Status
            </label>

            <select
              name="user_status"
              value={formData.user_status}
              onChange={handleChange}
              className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
            >
               <option disabled value="">
                Select Status
              </option>
              {userStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <div className="w-full">
            <label className="mt-4 block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
            />
          </div>
          <div className="w-full">
            <label className=" mt-4 block text-sm font-medium text-gray-700">
              Hometown
            </label>
            <input
              type="text"
              name="hometown"
              value={formData.hometown}
              onChange={handleChange}
              className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
            />
          </div>
        </div>

        <label className="mt-4 block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <input
          type="text"
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label className="mt-4 block text-sm font-medium text-gray-700">
          Department
        </label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label className=" mt-4 block text-sm font-medium text-gray-700">
          Department Abbreviation
        </label>
        <input
          type="text"
          name="department_abbreviation"
          value={formData.department_abbreviation}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label className=" mt-4 block text-sm font-medium text-gray-700">
          Department ID
        </label>
        <input
          type="text"
          name="department_id"
          value={formData.department_id}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label className=" mt-4 block text-sm font-medium text-gray-700">
          Memory Status:
        </label>
        <input
          type="text"
          name="memory_status"
          value={formData.memory_status}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <DialogActions>
          <button
            type="submit"
            onClick={handleElementClick}
            className=" mt-5 w-44 cursor-pointer border bg-blue-500 hover:bg-blue-600  text-white px-4 py-2 rounded-lg float-right   "
          >
            Create User
          </button>
        </DialogActions>
      </form>
    </div>
  );
}
