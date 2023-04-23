import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "./pages/Main";
import { fetchUser, selectUser } from "./redux/features/userSlice";
import ShareBlogModal from "./components/page-contents/ShareBlogModal";
import Loading from "./components/page-contents/Loading";
import ConfirmationPopUp from "./components/page-contents/ConfirmationPopUp";

function App() {
  const selector = useSelector;
  const dispatch = useDispatch();
  let user = selector(selectUser);
  const fetchUserData = async (dispatch, getState) => {
    await dispatch(fetchUser());
  };

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData);
    }
  }, []);

  return (
    <div className="App">
      <Loading />
      <Main />
      <ShareBlogModal />
      <ConfirmationPopUp />
    </div>
  );
}

export default App;
