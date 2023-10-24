// IMPORT: React
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useRef } from 'react';
// IMPORT: Styles
import logo from '../assets/logo.svg';
import '../assets/App.css';

// creates scrollbars on windows devices
import PerfectScrollbar from "perfect-scrollbar";

// IMPORT: Routes
import routes from "../util/routes.js";

const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        if (prop.layout === "TestLayout") {
            return (
                <Route path={prop.path} element={prop.component} key={key} exact />
            );
        } else {
            return null;
        }
    });
};

function TestLayout(props) {

    const mainPanelRef = useRef(null);

    return (
        <div className="App">

            <div className="main-panel" ref={mainPanelRef}>

                <Routes>
                    {/* Each possible route with its associated Test Component */}
                    {getRoutes(routes)}

                    {/* Catch-all redirect for non-declared routes*/}
                    <Route
                        path="/*"
                        element={<Navigate to="/test" replace />}
                    />

                </Routes>
            </div>

        </div>
    );
}

export default TestLayout;
