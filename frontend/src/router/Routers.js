import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import ProtectedRoute from "./ProtectedRoute";
import MyBookings from "../pages/MyBookings";
import BookingDetails from "../pages/BookingDetails";

const Routers = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/search" element={<SearchResultList />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/bookingDetails/:id" element={<BookingDetails />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Route>
    </Routes>
  );
};

export default Routers;
