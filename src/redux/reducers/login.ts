import * as types from "../constants";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default function reducer(state = initialState, { payload, type }) {
  switch (type) {
    // PROVIDER LOGIN
    case types.POST_PROVIDER_LOGIN:
      return { ...initialState, loading: true };
    case types.POST_PROVIDER_LOGIN_SUCCEED:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case types.POST_PROVIDER_LOGIN_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
