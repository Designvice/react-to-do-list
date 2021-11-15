import { Typography } from "@mui/material";
import React, { useEffect } from "react";

const Alert = ({ color, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return <Typography color={color}>{msg}</Typography>;
};

export default Alert;
