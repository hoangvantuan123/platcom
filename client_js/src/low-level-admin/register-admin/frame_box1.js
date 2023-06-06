import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CountryOptions from "./countryOptions";
export default function Frame_box1() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
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
              placeholder="e.g. PlatCom"
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
              placeholder="e.g. PlatCom.vn"
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
              defaultValue="1-10"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="1-10"
                control={<Radio />}
                label="1-10 employees"
              />
              <FormControlLabel
                value="11-50"
                control={<Radio />}
                label="11-50 employees"
              />
              <FormControlLabel
                value="51-100"
                control={<Radio />}
                label="51-100 employees"
              />
              <FormControlLabel
                value="101-500"
                control={<Radio />}
                label="101-500 employees"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </form>
    </div>
  );
}
