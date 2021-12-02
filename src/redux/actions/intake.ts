import * as types from "../constants";
import request from "../../utils/request";

export function postIntake(data: any) {
  return (dispatch) => {
    dispatch({ type: types.POST_INTAKE });
    return request("user")
      .post("/user-encounters/intake/other-intake", data)
      .then((dataResponse) => {
        dispatch({
          type: types.POST_INTAKE_SUCCEED,
          payload: dataResponse,
        });
        return dataResponse;
      })
      .catch((error) => {
        dispatch({
          type: types.POST_INTAKE_FAIL,
          payload: error,
        });
        throw error;
      });
  };
}
