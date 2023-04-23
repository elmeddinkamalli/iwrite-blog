// reducer.js
const initialState = {
  show: false,
  confirmationPopUp: false,
  handleConfirmation: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return { show: !state.show };
    case "TOGGLE_POPUP":
      return {
        ...state,
        confirmationPopUp: !state.confirmationPopUp,
        handleConfirmation: action.payload.handleConfirmation,
      };
    default:
      return state;
  }
};

export default reducer;
