// IMPORTS
// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// IMPORTS: Components


// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import PhotoUpload from './components/Forms/PhotoUpload';
// import Listings from '../../TEMP/Listings';
import Listings from './components/Listings';
// import ListingsV3 from '../../TEMP/ListingsV3';
import CreateListing from './components/Forms/CreateListing';
import Admin from './layouts/Admin';
import Standard from './layouts/Standard';

import Header from './components/Navbars/Header';
import { Auth } from './context/Auth';
import PageNotFound from './components/Pages/PageNotFound';
import Login from './components/Forms/Login';
import Logout from './components/Buttons/Logout';
// import UserProfile from './components/UserProfile';
import UserProfileV2 from './components/Pages/UserProfileV2';



import 'bootstrap/dist/css/bootstrap.css';

// STYLES //
import './index.css';
import './assets/App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/*  NOTE: THESE WERE ALL MOVED TO TestLayout.js AND/OR routes.js (client)
  
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test001" element={<App />} />
        <Route path="/header" element={<Header />} />
        <Route path="/photoupload" element={<PhotoUpload />} />
        <Route path="/createlisting" element={<CreateListing />} />
        <Route path="/listings" element={<Listings />} />
        
        <Route path="/logout" element={<Logout />} />
        <Route path="/user/:id" element={<UserProfileV2 />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/notfound" element={<PageNotFound />} />

        */}

        {/* <Route path="/listingsv2" element={<ListingsV2 />} /> */}
        {/* <Route path="/listingsv3" element={<ListingsV3 />} /> */}
        {/* <Route path="/userprofile" element={<UserProfile />} /> */}

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


/* UNUSED DEFAULTS */
//import reportWebVitals from './reportWebVitals';
//reportWebVitals();
// Pass a function to log results (e.g: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals




// return (
//   <Router>
//   <Routes>
//       <Route path="/photoupload" element={<PhotoUpload />} />
//   </Routes>
//   </Router>

// );
// }