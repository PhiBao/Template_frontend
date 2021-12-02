import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Payment() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let navigate = useNavigate();

  const onSubmit = (data: any) => {
    navigate("/intake");
  };

  const [expirationDate, setExpirationDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const handleChange = (newValue: Date | null) => {
    setExpirationDate(newValue);
  };

  return (
    <Box
      mt={10}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30ch" },
        width: "100%",
        maxWidth: 500,
        mx: "auto",
        textAlign: "center",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" gutterBottom component="div" mb={5}>
        Payment
      </Typography>
      <div>
        <TextField
          label="Name"
          {...register("name", { required: true })}
          error={!!errors.name}
          helperText={!!errors.name && "Please enter your name"}
        />
      </div>
      <div>
        <TextField
          label="Credit Card Number"
          {...register("creditCardNumber", { required: true })}
          error={!!errors.creditCardNumber}
          helperText={
            !!errors.creditCardNumber && "Please enter your credit card number"
          }
        />
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Expiration Date"
            value={expirationDate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <Button
        variant="outlined"
        size="large"
        type="submit"
        sx={{
          marginLeft: "auto",
          marginTop: "40px",
          width: "160px",
          position: "absolute",
        }}
      >
        Next
        <ArrowForwardIcon sx={{ ml: 1 }} />
      </Button>
    </Box>
  );
}
