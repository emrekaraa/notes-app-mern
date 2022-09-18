import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/composite/Header/Header";
import Home from "./pages/Home";
import { getAllNotesCall } from "./redux/api/notesApiCall";
import { useAppDispatch, useAppSelector } from "./redux/store";

function App() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes);

  useEffect(() => {
    dispatch(getAllNotesCall());
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
