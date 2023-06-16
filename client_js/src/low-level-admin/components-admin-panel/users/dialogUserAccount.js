import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Frame_User_account from "./frameUserAccount";
export default function DialogUserAccount() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };
  return (
    <div>
      <div variant="outlined" onClick={handleClickOpen}>
        <h3>Create a new user account</h3>
        <span>
          Create a new user account from scratch with the following template
        </span>
      </div>
      <Dialog
        open={open}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        scroll="body"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create a new user account"}
        </DialogTitle>
        <DialogContent   >
          <Frame_User_account onClose={handleClose}  />
        </DialogContent>
        
      </Dialog>
    </div>
  );
}
