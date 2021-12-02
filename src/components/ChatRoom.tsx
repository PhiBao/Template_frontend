/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { postPostponeEncounter } from "../redux/actions/encounter";
import { sendMessage, getMessage } from "../redux/actions/chat";
import { openMessage } from "../redux/actions/message";
import { getAuth } from "../utils/helpers";
import {
  Box,
  List,
  ListItem,
  Button,
  Typography,
  Grid,
  Divider,
  TextField,
  Fab,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import jwt_decode from "jwt-decode";

export default function ChatRoom() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const decodedData: any = jwt_decode(auth.encounterID);

  const storeSendMessage = useSelector(
    (state: RootState) => state.chat.sendMessage
  );
  const { loading: sendLoading } = storeSendMessage;

  const storeGetMessage = useSelector(
    (state: RootState) => state.chat.getMessage
  );
  const { data: messageData } = storeGetMessage;

  const callApiSendMessage = async (data: any) => {
    try {
      await dispatch(sendMessage(data));
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

  const onSubmit = (data: any) => {
    callApiSendMessage(data);
  };

  const handleClick = () => {
    callApiPostponeEncounter();
    navigate("/notes");
  };

  React.useEffect(() => {
    if (!sendLoading) {
      dispatch(getMessage(decodedData.id + "|" + decodedData.kind));
    }
  }, [sendLoading]);

  return (
    <div>
      <Box
        mt={10}
        component="form"
        sx={{ width: "100%", mx: "auto" }}
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h6" gutterBottom component="div" mb={5}>
          Chatting with Dr Jones:
        </Typography>
        <List sx={{ height: "50vh", overflowY: "auto" }}>
          {messageData.chatHistoryItems !== undefined &&
            messageData.chatHistoryItems.map((message, index) =>
              message.patientMessage ? (
                <ListItem key="2">
                  <Item style={{ marginLeft: "auto" }}>
                    {message.textContent}
                  </Item>
                  <AccountCircleIcon />
                </ListItem>
              ) : (
                <ListItem key={index}>
                  <AccountCircleIcon />
                  <Item>{message.textContent}</Item>
                </ListItem>
              )
            )}
        </List>
        <Divider />
        <Grid container style={{ padding: "20px" }}>
          <Grid item xs={11}>
            <TextField
              id="outlined-basic-email"
              label="Type Something"
              fullWidth
              {...register("message")}
            />
          </Grid>
          <Grid item xs={1}>
            <Fab color="primary" aria-label="add" type="submit">
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Link to="/notes">
            <Button variant="outlined" size="large" onClick={handleClick}>
              Finish Chat
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}

const Item = styled.div`
  margin: 0px 10px;
  background-color: #51d0ed;
  padding: 12px 16px;
  text-align: center;
  color: #fff;
  border: solid 1px;
  border-radius: 10px;
`;
