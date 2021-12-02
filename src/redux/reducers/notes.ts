import * as types from "../constants";

const initialState = {
  data: {
    items: [],
    pageToken: "",
  },
  loading: false,
  error: null,
};

export default function reducer(state = initialState, { payload, type }) {
  switch (type) {
    case types.GET_NOTES:
      return { ...initialState, loading: true };
    case types.GET_NOTES_SUCCEED:
      return {
        ...state,
        data: payload.data,
        loading: false,
      };
    case types.GET_NOTES_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
