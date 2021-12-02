import * as types from "../constants";

const initialState = {
  initialize: {
    data: {},
    loading: false,
    error: null,
  },
  prepare: {
    data: {},
    loading: false,
    error: null,
  },
  ready: {
    data: {},
    loading: false,
    error: null,
  },
  postpone: {
    data: {},
    loading: false,
    error: null,
  },
  batch: {
    data: {
      items: [],
    },
    loading: false,
    error: null,
  },
};

export default function reducer(state = initialState, { payload, type }) {
  switch (type) {
    // INITITALIZE ENCOUNTER
    case types.POST_INITIALIZE_ENCOUNTER:
      return {
        ...state,
        initialize: {
          ...state.initialize,
          loading: true,
        },
      };
    case types.POST_INITIALIZE_ENCOUNTER_SUCCEED:
      return {
        ...state,
        initialize: {
          ...state.initialize,
          data: payload.data,
          loading: false,
        },
      };
    case types.POST_INITIALIZE_ENCOUNTER_FAIL:
      return {
        ...state,
        initialize: {
          ...state.initialize,
          error: payload,
          loading: false,
        },
      };

    // PREPARE ENCOUNTER
    case types.POST_PREPARE_ENCOUNTER:
      return {
        ...state,
        prepare: {
          ...state.prepare,
          loading: true,
        },
      };
    case types.POST_PREPARE_ENCOUNTER_SUCCEED:
      return {
        ...state,
        prepare: {
          ...state.prepare,
          data: payload.data,
          loading: false,
        },
      };
    case types.POST_PREPARE_ENCOUNTER_FAIL:
      return {
        ...state,
        prepare: {
          ...state.prepare,
          error: payload,
          loading: false,
        },
      };

    // READY ENCOUNTER
    case types.POST_READY_ENCOUNTER:
      return {
        ...state,
        ready: {
          ...state.ready,
          loading: true,
        },
      };
    case types.POST_READY_ENCOUNTER_SUCCEED:
      return {
        ...state,
        ready: {
          ...state.ready,
          data: payload.data,
          loading: false,
        },
      };
    case types.POST_READY_ENCOUNTER_FAIL:
      return {
        ...state,
        ready: {
          ...state.ready,
          error: payload,
          loading: false,
        },
      };

    // POSTPONE ENCOUNTER
    case types.POST_POSTPONE_ENCOUNTER:
      return {
        ...state,
        postpone: {
          ...state.postpone,
          loading: true,
        },
      };
    case types.POST_POSTPONE_ENCOUNTER_SUCCEED:
      return {
        ...state,
        postpone: {
          ...state.postpone,
          data: payload.data,
          loading: false,
        },
      };
    case types.POST_POSTPONE_ENCOUNTER_FAIL:
      return {
        ...state,
        postpone: {
          ...state.postpone,
          error: payload,
          loading: false,
        },
      };

    // BATCH ENCOUNTER
    case types.BATCH_ENCOUNTER:
      return {
        ...state,
        batch: {
          ...state.batch,
          loading: true,
        },
      };
    case types.BATCH_ENCOUNTER_SUCCEED:
      return {
        ...state,
        batch: {
          ...state.batch,
          data: payload.data,
          loading: false,
        },
      };
    case types.BATCH_ENCOUNTER_FAIL:
      return {
        ...state,
        batch: {
          ...state.batch,
          error: payload,
          loading: false,
        },
      };
    default:
      return state;
  }
}
