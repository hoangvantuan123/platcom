import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../slices/authAdminSlice";
import { useNavigate } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import axios from "axios";
export default function Login_admin() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    // Kiểm tra điều kiện trước khi gửi yêu cầu đăng nhập
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }
    dispatch(loginAdmin(email, password))
      .then(() => {
        navigate('/admin-panel/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen  p-3 lg:grid-cols-12">
          <section className="relative flex  h-full  rounded-xl bg-blue-700 lg:col-span-4 lg:h-full xl:col-span-4">
            <div className="hidden lg:relative  lg:block lg:p-12 flex-col justify-between ">
              <div className=" mb-32">
                <h3 className="text-2xl  font-medium text-white sm:text-xl md:text-xl">
                  <a href="">PlatCom Admin </a>
                </h3>
              </div>
              <div className=" mt-32 ">
                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Start your business management journey.
                </h2>
                <p className="mt-10 leading-relaxed text-white/90">
                  Welcome to your Business management interface! Here, you can
                  easily manage business operations and interact with critical
                  data. Discover the powerful and convenient features our Admin
                  interface has to offer to help you run your business smartly
                  and efficiently.
                </p>
              </div>
            </div>
          </section>
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-8 lg:px-16 lg:py-12 xl:col-span-8">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold opacity-90 text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to PlatCom.
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Welcome to the Admin Interface: Manage Your Business Easily and
                Efficiently.
              </p>
              <form
                action="#"
                onSubmit={handleSubmit}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6 ">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  />
                </div>

                <div className="col-span-6 ">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password"
                      className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Outline"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 opacity-60"
                          >
                            <path d="M23.271,9.419A15.866,15.866,0,0,0,19.9,5.51l2.8-2.8a1,1,0,0,0-1.414-1.414L18.241,4.345A12.054,12.054,0,0,0,12,2.655C5.809,2.655,2.281,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162A15.866,15.866,0,0,0,4.1,18.49l-2.8,2.8a1,1,0,1,0,1.414,1.414l3.052-3.052A12.054,12.054,0,0,0,12,21.345c6.191,0,9.719-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419ZM2.433,13.534a2.918,2.918,0,0,1,0-3.068C3.767,8.3,6.782,4.655,12,4.655A10.1,10.1,0,0,1,16.766,5.82L14.753,7.833a4.992,4.992,0,0,0-6.92,6.92l-2.31,2.31A13.723,13.723,0,0,1,2.433,13.534ZM15,12a3,3,0,0,1-3,3,2.951,2.951,0,0,1-1.285-.3L14.7,10.715A2.951,2.951,0,0,1,15,12ZM9,12a3,3,0,0,1,3-3,2.951,2.951,0,0,1,1.285.3L9.3,13.285A2.951,2.951,0,0,1,9,12Zm12.567,1.534C20.233,15.7,17.218,19.345,12,19.345A10.1,10.1,0,0,1,7.234,18.18l2.013-2.013a4.992,4.992,0,0,0,6.92-6.92l2.31-2.31a13.723,13.723,0,0,1,3.09,3.529A2.918,2.918,0,0,1,21.567,13.534Z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Outline"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 opacity-60"
                          >
                            <path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" />
                            <path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" />
                          </svg>
                        )}
                      </button>
                    </span>
                  </div>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  >
                    Log in
                  </button>
                  {error && <div>{error}</div>}
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Don't have an admin account for your business?
                    <a
                      href="/admin/admin-panel/register"
                      className="text-gray-700 underline"
                    >
                      Register
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
