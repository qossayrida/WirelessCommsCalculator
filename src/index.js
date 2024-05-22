import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles/dashboard.scss";


import AdminLayout from "./dashboard/Admin.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter basename="/WirelessCommsCalculator">
        <Routes>
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="*" element={<Navigate to="/admin/home-page" replace />} />
        </Routes>
    </BrowserRouter>
);


