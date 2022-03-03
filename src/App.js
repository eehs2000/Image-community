import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import Header from "./shared/Header";
import { useDispatch, useSelector } from "react-redux";
import AddPost from "./pages/AddPost";
import Detail from "./pages/Detail";
import { loginCheck } from "./redux/modules/user";
import { useEffect } from "react";
import Edit from "./pages/Edit";
import Loading from "./pages/Loading";
import { setLoading, setNewPaging } from "./redux/modules/post";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.is_login);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      dispatch(loginCheck());
    }
  }, []);

  return (
    <>
      <Header isLogin={isLogin} />
      <Routes>
        <Route path="/" element={<Main isLogin={isLogin} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/postdetail/:boardid" element={<Detail />} />
        <Route path="/edit/:boardid" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
