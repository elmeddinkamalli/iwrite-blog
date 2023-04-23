// actions.js
export const toggleModal = () => ({
  type: "TOGGLE_MODAL",
});

export const togglePopUp = (handleConfirmation) => ({
  type: "TOGGLE_POPUP",
  payload: {
    confirmationPopUp: true,
    handleConfirmation: handleConfirmation,
  },
});
