import * as types from "../constants";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default function reducer(state = initialState, { payload, type }) {
  switch (type) {
    case types.POST_INTAKE:
      return { ...initialState, loading: true };
    case types.POST_INTAKE_SUCCEED:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case types.POST_INTAKE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
