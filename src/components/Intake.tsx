/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch } from "react-redux";
import { postInitializeEncounter } from "../redux/actions/encounter";
import { postIntake } from "../redux/actions/intake";
import { openMessage } from "../redux/actions/message";
import { setEncounterToken } from "../utils/helpers";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@mui/material";

type FormValues = {
  name: string;
  otherIntake: {
    question: string;
    answer: string;
  }[];
};

export default function Intake() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      otherIntake: [
        { question: "Some cgx question" },
        { question: "Some cgx question" },
        { question: "Some cgx question" },
        { question: "Some cgx question" },
        { question: "Some cgx question" },
      ],
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { fields } = useFieldArray({
    name: "otherIntake",
    control,
  });

  const callApiInitializeEncounter = async () => {
    try {
      const response = await dispatch(
        postInitializeEncounter({
          visitType: "cgx",
          followUp: false,
          isEnhanced: false,
        })
      );
      setEncounterToken(response);
    } catch (error) {
      console.log(error);
      dispatch(
        openMessage({
          title: "Something went wrong, please try again!",
          type: "error",
        })
      );
    }
  };

  const callApiIntake = async (data) => {
    const payload: any = {
      otherIntake: data.otherIntake,
    };
    try {
      await dispatch(postIntake(payload));
    } catch (error) {
      dispatch(
        openMessage({
          title: "Something went wrong, please try again!",
          type: "error",
        })
      );
    }
  };

  React.useEffect(() => {
    callApiInitializeEncounter();
  }, []);

  const onSubmit = (data) => {
    callApiIntake(data);
    navigate("/waiting");
  };

  return (
    <div>
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
          Intake
        </Typography>
        <div>
          <TextField
            label="Name"
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={!!errors.name && "Please enter your name"}
          />
        </div>
        {fields.map((field, index) => (
          <div key={index}>
            <TextField
              label={field.question}
              multiline
              {...register(`otherIntake.${index}.answer` as const)}
            />
          </div>
        ))}
        <Button
          variant="outlined"
          size="large"
          type="submit"
          sx={{
            marginTop: "40px",
            width: "160px",
            marginX: "5px",
          }}
          onClick={() => localStorage.setItem("type", "video")}
        >
          Start Video
        </Button>
        <Button
          variant="outlined"
          size="large"
          type="submit"
          sx={{
            marginTop: "40px",
            width: "160px",
            marginX: "5px",
          }}
          onClick={() => localStorage.setItem("type", "chat")}
        >
          Start Chat
        </Button>
      </Box>
    </div>
  );
}
