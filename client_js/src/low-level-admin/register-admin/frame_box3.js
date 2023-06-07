import React, { useState } from "react";
import { useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import FormLabel from "@mui/material/FormLabel";
import {
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";

export default function Frame_box3({ setEmail, setPassword }) {
  const [type, toggle] = useToggle(["login", "register"]);
  const [showPassword, setShowPassword] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Paper className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:px-8">
      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          <div className="input-wrapper">
            <FormLabel
              style={{
                color: "inherit", // Tắt màu cho FormLabel khi click
                opacity: "0.6",
              }}
            >
              Email
            </FormLabel>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="hello@mantine.dev"
                value={form.values.email}
                onChange={(event) => {
                  form.setFieldValue("email", event.currentTarget.value);
                  handleEmailChange(event);
                }}
                className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
              {form.errors.email && <div className="error">Invalid email</div>}
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-4 w-4 opacity-60"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="input-wrapper">
            <FormLabel
              style={{
                color: "inherit", // Tắt màu cho FormLabel khi click
                opacity: "0.6",
              }}
            >
              Password
            </FormLabel>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) => {
                  form.setFieldValue("password", event.currentTarget.value);
                  handlePasswordChange(event);
                }}
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

            {form.errors.password && (
              <div className="error">
                Password should include at least 6 characters
              </div>
            )}
          </div>

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>
      </form>
    </Paper>
  );
}
