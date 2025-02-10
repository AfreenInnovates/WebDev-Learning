import "./App.css";
import Navbar from "./components/Navbar";
import All from "./components/All";
import Create from "./components/Create";
import Update from "./components/Update";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/all" element={<All />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
