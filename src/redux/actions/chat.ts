import * as types from "../constants";
import request from "../../utils/request";

export function sendMessage(data: any) {
  return (dispatch) => {
    dispatch({ type: types.SEND_MESSAGE });
    return request("user")
      .post("/user-encounters/send-message-to-async-chat", data)
      .then((dataResponse) => {
        dispatch({
          type: types.SEND_MESSAGE_SUCCEED,
          payload: dataResponse,
        });
        return dataResponse;
      })
      .catch((error) => {
        dispatch({
          type: types.SEND_MESSAGE_FAIL,
          payload: error,
        });
        throw error;
      });
  };
}

export function getMessage(encounterReferenceKey: string) {
  return (dispatch) => {
    dispatch({ type: types.GET_MESSAGE });
    return request("user")
      .get(
        "/user-encounters/get-async-chat-messages?encounterReferenceKey=" +
          encounterReferenceKey
      )
      .then((dataResponse) => {
        dispatch({
          type: types.GET_MESSAGE_SUCCEED,
          payload: dataResponse,
        });
        return dataResponse;
      })
      .catch((error) => {
        dispatch({
          type: types.GET_MESSAGE_FAIL,
          payload: error,
        });
        throw error;
      });
  };
}
