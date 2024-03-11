import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import AddNotes from "../Pages/AddNotes/AddNotes";
import AddLabel from "../Pages/AddLabel/AddLabel";
import Archived from "../Pages/Archived/Archived";
import CategoryFilter from "../Pages/CategoryFilter/CategoryFilter";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/add/note" element={<AddNotes />} />
        <Route path="/add/label" element={<AddLabel />} />
        <Route path="/Archived" element={<Archived />} />
        <Route path="/home/category/:categoryId" element={<CategoryFilter />} />


      </Routes>
    </BrowserRouter>
  );
}
export default AppRoute;