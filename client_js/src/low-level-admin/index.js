import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../slices/userSlice";
const RegisterForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      email: email,
      password: password,
    };
    dispatch(registerUser(userData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
      />
      <button
        type="submit"
        className="inline-block rounded-md bg-white px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
