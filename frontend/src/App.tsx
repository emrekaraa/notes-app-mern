import Header from "./components/composite/Header/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { MainLoading } from "./components/ui";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { getMeCall } from "./redux/api/authApiCall";
import Cookies from "js-cookie";

function App() {
  const { loading } = useAppSelector((state) => state.siteConfig);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cookiesAuthToken = Cookies.get("authToken");

    if (!cookiesAuthToken) {
      return;
    }

    dispatch(getMeCall({ authToken: cookiesAuthToken })).then((res) => {
      if (!res.payload) {
        Cookies.remove("authToken");
        return navigate("/login");
      }
    });
  }, [dispatch, navigate]);

  return (
    <>
      <MainLoading fade={loading} />
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        closeOnClick
        draggable
        pauseOnHover={false}
      />

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
