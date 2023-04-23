// reducer.js
const initialState = {
  loading: false,
};

const spinnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SPINNER":
      return { loading: !state.loading };
    default:
      return state;
  }
};

export default spinnerReducer;
