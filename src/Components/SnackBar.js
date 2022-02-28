import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
const SnackBar = (props) => {
  const { error, tag, open } = props;
  const [toOpen, setOpen] = useState(open);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    setOpen(open);
    return () => {
      setOpen(false);
    };
  }, [open]);
  return (
    <Snackbar open={toOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={tag} sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
