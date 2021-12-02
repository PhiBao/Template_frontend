import * as types from "../constants";
import request from "../../utils/request";

export function postInitializeEncounter(data: any) {
  return (dispatch) => {
    dispatch({ type: types.POST_INITIALIZE_ENCOUNTER });
    return request("user")
      .post("/user-encounters/initialize", data)
      .then((dataResponse) => {
        dispatch({
          type: types.POST_INITIALIZE_ENCOUNTER_SUCCEED,
          payload: dataResponse,
        });
        return dataResponse;
      })
      .catch((error) => {
        dispatch({
          type: types.POST_INITIALIZE_ENCOUNTER_FAIL,
          payload: error,
        });
        throw error;
      });
  };
}

export function postPrepareEncounter(data: any) {
  return (dispatch) => {
    dispatch({ type: types.POST_PREPARE_ENCOUNTER });
    return request("user")
      .post("/user-encounters/prepare", data)
      .then((dataResponse) => {
        dispatch({
          type: types.POST_PREPARE_ENCOUNTER_SUCCEED,
          payload: dataResponse,
        });
        return dataResponse;
      })
      .catch((error) => {
        dispatch({
          type: types.POST_PREPARE_ENCOUNTER_FAIL,
          payload: error,
        });
        throw error;
      });
  };
}

export function postReadyEncounter(data: any) {
  return (dispatch) => {
    dispatch({ type: types.POST_READY_ENCOUNTER });
    return request("user")
      .post("/user-encounters/ready", data)
      .then((dataResponse) => {
        dispatch({
          type: types.POST_READY_ENCOUNTER_SUCCEED,
          payload: dataResponse,
        });
        return dataResponse;
      })
      .catch((error) => {
        dispatch({
          type: types.POST_READY_ENCOUNTER_FAIL,
          payload: error,
        });
        throw error;
      });
  };
}

export function postPostponeEncounter(data: any) {
  return (dispatch) => {
    dispatch({ type: types.POST_POSTPONE_ENCOUNTER });
    return request("user")
      .post("/user-encounters/postpone", data)
      .then((dataResponse) => {
        dispatch({
          type: types.POST_POSTPONE_ENCOUNTER_SUCCEED,
          payload: dataResponse,
        });
        return dataResponse;
      })
      .catch((error) => {
        dispatch({
          type: types.POST_POSTPONE_ENCOUNTER_FAIL,
          payload: error,
        });
        throw error;
      });
  };
}

export function batchEncounter(data: any) {
  return (dispatch) => {
    dispatch({ type: types.BATCH_ENCOUNTER });
    return request("provider")
      .post("/provider-encounters/batch-get-encounters", data)
      .then((dataResponse) => {
        dispatch({
          type: types.BATCH_ENCOUNTER_SUCCEED,
          payload: dataResponse,
        });
        return dataResponse;
      })
      .catch((error) => {
        dispatch({
          type: types.BATCH_ENCOUNTER_FAIL,
          payload: error,
        });
        throw error;
      });
  };
}
