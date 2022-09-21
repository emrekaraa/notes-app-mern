import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/composite/Header/Header";
import { MainLoading } from "./components/ui";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAppSelector } from "./redux/store";

function App() {
  const { loading } = useAppSelector((state) => state.siteConfig);

  return (
    <BrowserRouter>
      <MainLoading fade={loading} />
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
