import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../../slices/regularUserAccountSlice";
const sexOptions = [
  { value: "M", label: "Nam" },
  { value: "F", label: "Nữ" },
];
export default function User_account() {
  const dispatch = useDispatch();
  const { useradmin: adminUser } = useSelector((state) => state.authAdmin);

  console.log("useradmin:", adminUser);
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
    admin_email: "",
    admin_role: false,
    job_title: "",
    department: "",
    department_abbreviation: "",
    department_id: "",
    memory_status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is 'birth_date'
    if (name === "birth_date") {
      // Format the value as 'YYYY-MM-DD'
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setFormData({ ...formData, [name]: formattedDate });
    } else if (name === "username") {
      // Skip updating the 'username' field
      return;
    } else {
      setFormData({ ...formData, [name]: value });
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
      admin_email: "",
      admin_role: false,
      job_title: "",
      department: "",
      department_abbreviation: "",
      department_id: "",
      memory_status: "",
    });
  };

  return (
    <div className="ml-64">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label>Database:</label>
        <input
          type="text"
          name="database"
          value={formData.database}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />
        <label>first_name:</label>
        <input
          type="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />
        <label>last_name:</label>
        <input
          type="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label>admin_role:</label>
        <input
          type="admin_role"
          name="admin_role"
          value={formData.admin_role}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />
        <label>sex:</label>
        <select
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        >
          <option value="">Chọn giới tính</option>
          {sexOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label>Hometown:</label>
        <input
          type="text"
          name="hometown"
          value={formData.hometown}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label>Birth Date:</label>
        <input
          type="text"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label>User Status:</label>
        <input
          type="text"
          name="user_status"
          value={formData.user_status}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label>Admin Email:</label>
        <input
          type="text"
          name="admin_email"
          value={formData.admin_email}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label>Job Title:</label>
        <input
          type="text"
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label>Department Abbreviation:</label>
        <input
          type="text"
          name="department_abbreviation"
          value={formData.department_abbreviation}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label>Department ID:</label>
        <input
          type="text"
          name="department_id"
          value={formData.department_id}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <label>Memory Status:</label>
        <input
          type="text"
          name="memory_status"
          value={formData.memory_status}
          onChange={handleChange}
          className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
        />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
