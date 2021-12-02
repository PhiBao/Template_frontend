import * as types from "../constants";
import axios from "axios";

export function postProviderLogin() {
  return (dispatch) => {
    dispatch({ type: types.POST_PROVIDER_LOGIN });
    return axios
      .get("http://localhost:8080/providers/login")
      .then((dataResponse) => {
        dispatch({
          type: types.POST_PROVIDER_LOGIN_SUCCEED,
          payload: dataResponse,
        });
        return dataResponse;
      })
      .catch((error) => {
        dispatch({
          type: types.POST_PROVIDER_LOGIN_FAIL,
          payload: error,
        });
        throw error;
      });
  };
}
