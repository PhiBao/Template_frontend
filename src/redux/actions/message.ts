import * as types from "../constants";

export function openMessage(data) {
  const defaultData = { title: "", type: "", timeout: 5000 };
  return (dispatch) => {
    dispatch({
      type: types.OPEN_MESSAGE,
      payload: { ...defaultData, ...data },
    });
  };
}

export function closeMessage() {
  return (dispatch) => {
    dispatch({
      type: types.CLOSE_MESSAGE,
    });
  };
}
