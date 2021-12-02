import * as types from '../constants';

const initialState = {
  open: false,
  data: {}
};

export default function reducer(state = initialState, { payload, type }) {
  switch (type) {
    case types.OPEN_MESSAGE:
      return {
        ...state,
        open: true,
        data: payload
      };
    case types.CLOSE_MESSAGE:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}
