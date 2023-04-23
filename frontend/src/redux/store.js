import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import thunk from "redux-thunk";
import reducer from "./reducers/ModalReducer";
import spinnerReducer from "./reducers/SpinnerReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: reducer,
    spinner: spinnerReducer,
  },
  middleware: [thunk],
});

export default store;
