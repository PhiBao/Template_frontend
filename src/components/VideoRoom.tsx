import React from "react";
import { useDispatch } from "react-redux";
import { postPostponeEncounter } from "../redux/actions/encounter";
import { openMessage } from "../redux/actions/message";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import IconButton from "@mui/material/IconButton";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import CallEndIcon from "@mui/icons-material/CallEnd";

export default function VideoRoom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const callApiPostponeEncounter = async () => {
    try {
      await dispatch(postPostponeEncounter({}));
    } catch (error) {
      dispatch(
        openMessage({
          title: "Something went wrong, please try again!",
          type: "error",
        })
      );
    }
  };

  const handleClick = () => {
    callApiPostponeEncounter();
    navigate("/notes");
  };

  return (
    <div>
      <Box mt={10} sx={{ width: "100%", mx: "auto" }}>
        <Typography variant="h6" gutterBottom component="div" mb={5}>
          Speaking with Dr Jones
        </Typography>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "560px",
            mx: "auto",
            backgroundColor: "#e1e1e1",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "150px",
              height: "200px",
              marginLeft: "20px",
              marginTop: "20px",
              backgroundColor: "#9e8eb3",
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#8767b1",
              }}
            >
              <PlayCircleIcon
                sx={{
                  fontSize: "50px",
                }}
              />
            </IconButton>
          </Box>
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#b8b8b8",
            }}
          >
            <PlayCircleIcon
              sx={{
                fontSize: "200px",
              }}
            />
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              top: "90%",
              left: "40%",
              transform: "translate(-40%, -90%)",
              color: "#db5e5e",
            }}
          >
            <PauseCircleIcon
              sx={{
                fontSize: "80px",
              }}
            />
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              top: "90%",
              left: "60%",
              transform: "translate(-60%, -90%)",
              color: "#db5e5e",
            }}
            onClick={handleClick}
          >
            <CallEndIcon
              sx={{
                fontSize: "80px",
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
}
