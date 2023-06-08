import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import CountryOptions from "./countryOptions";
export default function Frame_box2({
  setFirstName,
  setLastName,
  setPhone,
  setEmailContact,
  setBusinessAddress,
  firstName ,
  lastName,
  phone ,
  emailContact ,
  businessAddress 
}) {
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleEmailContactChange = (e) => {
    setEmailContact(e.target.value);
  };
  const handleBusinessAddressChange = (e) => {
    setBusinessAddress(e.target.value);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4  sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Contact Info</h1>
        <p className="mt-4 text-gray-500">
          You will be the management representative and administrator of your
          business/organization.
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
              First name
            </FormLabel>
            <input
              type="name"
              className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Hoang"
              onChange={handleFirstNameChange}
              value={firstName}
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
              Last name
            </FormLabel>
            <input
              type="text"
              className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Tuan"
              onChange={handleLastNameChange}
              value={lastName}
            />
          </div>
        </div>
        <div className="flex  items-center gap-2">
          <div className="w-1/2">
            <FormLabel
              style={{
                color: "inherit", // Tắt màu cho FormLabel khi click
                opacity: "0.6",
              }}
            >
              Email
            </FormLabel>
            <input
              type="name"
              className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="example@platcom.vn"
              onChange={handleEmailContactChange}
              value={emailContact}
            />
          </div>
          <div className="w-1/2">
            <FormLabel
              style={{
                color: "inherit", // Tắt màu cho FormLabel khi click
                opacity: "0.6",
              }}
            >
              Phone number
            </FormLabel>
            <input
              type="name"
              className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="123-45-678"
              onChange={handlePhoneChange}
              value={phone}
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
              Address
            </FormLabel>
            <input
              type="text"
              className="w-full rounded-lg border outline-none border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="123 Main Street, City, State, ZIP Code
              "
              onChange={handleBusinessAddressChange}
              value={businessAddress}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
