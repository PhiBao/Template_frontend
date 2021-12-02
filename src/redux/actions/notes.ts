import * as types from "../constants";
import request from "../../utils/request";

export function getNotes(userID: string) {
  console.log(userID);
  return (dispatch) => {
    dispatch({ type: types.GET_NOTES });
    return request("provider")
      .get("/user-records/chart/" + userID)
      .then((dataResponse) => {
        dispatch({
          type: types.GET_NOTES_SUCCEED,
          payload: dataResponse,
        });
        return dataResponse;
      })
      .catch((error) => {
        dispatch({
          type: types.GET_NOTES_FAIL,
          payload: error,
        });
        throw error;
      });
  };
}
