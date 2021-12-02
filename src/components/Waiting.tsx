/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  postPrepareEncounter,
  postReadyEncounter,
} from "../redux/actions/encounter";
import { openMessage } from "../redux/actions/message";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function Waiting() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeReadyEncounter = useSelector(
    (state: RootState) => state.encounter.ready
  );

  const readyData = storeReadyEncounter.data;

  const callApiEncounter = async () => {
    try {
      await dispatch(postPrepareEncounter({}));
      await dispatch(postReadyEncounter({}));
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
    callApiEncounter();
  }, []);

  setTimeout(() => {
    const type = localStorage.getItem("type");
    if (type === "video") {
      navigate("/video-room");
    } else {
      navigate("/chat-room");
    }
  }, 10000);

  return (
    <div>
      <Box mt={10} sx={{ width: "100%", mx: "auto", textAlign: "center" }}>
        <Typography variant="h6" gutterBottom component="div" mb={10}>
          Waiting on Doctor
        </Typography>
        <Typography variant="h3" gutterBottom component="div" mb={10}>
          Estimated Time of {readyData ? readyData.estimatedWait : "..."}
        </Typography>
        <CircularProgress size={80} />
      </Box>
    </div>
  );
}
