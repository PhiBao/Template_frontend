import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { closeMessage } from "../redux/actions/message";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Message() {
  const dispatch = useDispatch();
  const storeMessage = useSelector((state: RootState) => state.message);

  React.useEffect(() => {
    if (storeMessage.open && storeMessage.data.timeout) {
      const timer = setTimeout(() => {
        dispatch(closeMessage());
      }, storeMessage.data.timeout);
      return () => clearTimeout(timer);
    }
  }, [storeMessage, dispatch]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={storeMessage.open}
        autoHideDuration={storeMessage.data.timeout}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {storeMessage.data.title}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
