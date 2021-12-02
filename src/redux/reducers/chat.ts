import * as types from "../constants";

const initialState = {
  sendMessage: {
    data: {},
    loading: false,
    error: null,
  },
  getMessage: {
    data: {},
    loading: false,
    error: null,
  },
};

export default function reducer(state = initialState, { payload, type }) {
  switch (type) {
    // SEND MESSAGE
    case types.SEND_MESSAGE:
      return {
        ...state,
        sendMessage: {
          ...state.sendMessage,
          loading: true,
        },
      };
    case types.SEND_MESSAGE_SUCCEED:
      return {
        ...state,
        sendMessage: {
          ...state.sendMessage,
          data: payload.data,
          loading: false,
        },
      };
    case types.SEND_MESSAGE_FAIL:
      return {
        ...state,
        sendMessage: {
          ...state.sendMessage,
          error: payload,
          loading: false,
        },
      };

    // GET MESSAGE
    case types.GET_MESSAGE:
      return {
        ...state,
        getMessage: {
          ...state.getMessage,
          loading: true,
        },
      };
    case types.GET_MESSAGE_SUCCEED:
      return {
        ...state,
        getMessage: {
          ...state.getMessage,
          data: payload.data,
          loading: false,
        },
      };
    case types.GET_MESSAGE_FAIL:
      return {
        ...state,
        getMessage: {
          ...state.getMessage,
          error: payload,
          loading: false,
        },
      };
    default:
      return state;
  }
}
