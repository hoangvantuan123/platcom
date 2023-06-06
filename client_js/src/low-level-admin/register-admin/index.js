import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Frame_box1 from "./frame_box1";

const steps = [
  {
    label: <Frame_box1 />,
    content: "Content for Select campaign settings",
  },
  {
    label: "Create an ad group",
    content: "Content for Create an ad group",
  },
  {
    label: "Create an ad",
    content: "Content for Create an ad",
  },
];

export default function Register_admin() {
  const [activeStep, setActiveStep] = React.useState(0);

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
                onClick={handleNext}
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
