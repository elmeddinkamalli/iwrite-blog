import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadingEffect } from "../../redux/features/userSlice";
import spinnerReducer from "../../redux/reducers/SpinnerReducer";

const Loading = () => {
  const selector = useSelector;
  let loading = selector((state) => state.spinner.loading);

  useEffect(() => {}, [loading]);
  return (
    <div className={`grayed-bg ${loading ? "active" : ""}`}>
      <div className="spinner-border text-primary spinner" role="status"></div>
    </div>
  );
};

export default Loading;
