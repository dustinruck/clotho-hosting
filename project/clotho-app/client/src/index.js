// IMPORT: React
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


// IMPORT: Styles
import './index.css';
import './assets/App.css';
import 'bootstrap/dist/css/bootstrap.css';

// IMPORT: Layouts
import AdminLayout from './layouts/AdminLayout';
import StandardLayout from './layouts/StandardLayout';
import TestLayout from './layouts/TestLayout';

// IMPORT: Contexts
//import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
//import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

// SETUP: root
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<StandardLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/test/*" element={<TestLayout />} />
        <Route path="/*" element={<Navigate to="/app" replace />} />
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);




