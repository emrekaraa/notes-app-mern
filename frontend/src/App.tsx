import Header from "./components/composite/Header/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLoading } from "./components/ui";
import { useAppSelector } from "./redux/store";
import { ToastContainer } from "react-toastify";

function App() {
  const { loading } = useAppSelector((state) => state.siteConfig);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
