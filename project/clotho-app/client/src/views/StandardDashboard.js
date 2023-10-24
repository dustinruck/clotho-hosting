//IMPORT: React
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

// IMPORT: Components
import TestSquarePlaceholder from "../components/PLACEHOLDERS/TestSquarePlaceholder";
import Listings from "../components/Tables/Listings";

function StandardDashboard(props) {

    return (
        <>
            <div className="text-center">
                <Listings />

            </div>
        </>
    );
}

export default StandardDashboard;