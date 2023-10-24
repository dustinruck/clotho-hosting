// IMPORT: Dashboards/Views
import AdminDashboard from "../views/AdminDashboard";
import StandardDashboard from "../views/StandardDashboard";
import TestDashboard from "../views/TestDashboard";

// IMPORT: Test Components
import PhotoUpload from '../components/Forms/PhotoUpload';
import CreateListing from '../components/Forms/CreateListing';
import CreateListingAdminTest from '../components/Forms/CreateListingAdminTest';
import CreateListingUserTest from '../components/Forms/CreateListingUserTest';
import UserProfilePrivate from '../components/Pages/UserProfilePrivate';
import UserProfilePublic from '../components/Pages/UserProfilePublic';
import Listings from '../components/Tables/Listings';
import Sell from "../components/Pages/Sell";
import ListingPage from "../components/Pages/ListingPage"
import Header from '../components/Navbars/Header';
import { Auth } from '../context/Auth';
import PageNotFound from '../components/Pages/PageNotFound';
import UserProfileV2 from '../components/Pages/UserProfileV2';
import UserProfile from '../components/Pages/UserProfile';
import EditProfile from "../components/Pages/EditProfile";
import AdminTables from "../components/Tables/AdminTables";
import Avatar from "../components/Forms/Avatar";
import Checkout from "../components/Pages/Checkout";
// import ListingsV2 from '../components/ListingsV2';
// import ListingsV3 from '../components/ListingsV3';
// import Listings from '../../TEMP/Listings';

var routes = [

    ///////////////////////////// ADMIN ROUTES ////////////////////////
    {
        layout: "AdminLayout",
        path: "/dashboard",
        name: "Admin Dashboard",
        component: <AdminDashboard />,
    },

    {
        layout: "AdminLayout",
        path: "/admintables/",
        name: "Admin Tables",
        component: <AdminTables />,
    },
    ///////////////////////////// USER ROUTES ////////////////////////
    {
        layout: "StandardLayout",
        path: "/",
        name: "Standard Dashboard",
        component: <StandardDashboard />,
    },

    {
        layout: "StandardLayout",
        path: "/:username",
        name: "Public profile",
        component: <UserProfile />,
    },

    {
        layout: "StandardLayout",
        path: "/products/:id",
        name: "Listing Page",
        component: <ListingPage />,
    },

    // {
    //     layout: "StandardLayout",
    //     path: "/products/:id",
    //     name: "Edit Listing",
    //     component: <ListingPage />,
    // },

    {
        layout: "StandardLayout",
        path: "/profile",
        name: "Private profile",
        component: <UserProfilePrivate />,
    },

    {
        layout: "StandardLayout",
        path: "/settings",
        name: "Settings",
        component: <EditProfile />,
    },

    {
        layout: "StandardLayout",
        path: "/sell",
        name: "Sell",
        component: <Sell />,
    },

    {
        layout: "StandardLayout",
        path: "/checkout",
        name: "Checkout",
        component: <Checkout />
    },

    ///////////////////////////// TEST ROUTES ////////////////////////

    {
        layout: "TestLayout",
        path: "/",
        name: "Test: Dashboard",
        component: <TestDashboard />,
    },
 

    {
        layout: "TestLayout",
        path: "/:username",
        name: "Test: Public profile (add username param)",
        component: <UserProfilePublic />,
    },

    {
        layout: "TestLayout",
        path: "/photoupload",
        name: "Test: Photo Upload",
        component: <PhotoUpload />,
    },

    {
        layout: "TestLayout",
        path: "/avatar",
        name: "Test: Avatar Upload",
        component: <Avatar />,
    },

    {
        layout: "TestLayout",
        path: "/createlisting",
        name: "Test: Create Listing",
        component: <CreateListing />,
    },

    {
        layout: "TestLayout",
        path: "/createlistingadmin",
        name: "Test: Create Listing Admin (test)",
        component: <CreateListingAdminTest />,
    },

    {
        layout: "TestLayout",
        path: "/createlistinguser",
        name: "Test: Create Listing User (test)",
        component: <CreateListingUserTest />,
    },

    {
        layout: "TestLayout",
        path: "/listings",
        name: "Test: Listings",
        component: <Listings />,
    },

    {
        layout: "TestLayout",
        path: "/products/:id",
        name: "Test: Listing Page",
        component: <ListingPage />,
    },

/* DONE
    {
        layout: "TestLayout",
        path: "/header",
        name: "Test: Header",
        component: <Header />,
    },
*/

/*
    {
        layout: "TestLayout",
        path: "/ListingsV2",
        name: "Test: ListingsV2",
        component: <ListingsV2 />,
    },

    {
        layout: "TestLayout",
        path: "/ListingsV3",
        name: "Test: ListingsV3",
        component: <ListingsV3 />,
    },
    
    {
        layout: "TestLayout",
        path: "/UserProfile",
        name: "Test: UserProfile",
        component: <UserProfile />,
    },
    
    {
        layout: "TestLayout",
        path: "/PageNotFound",
        name: "Test: PageNotFound",
        component: <PageNotFound />,
    },
    
/* 
// OBSOLETE
    {
        layout: "TestLayout",
        path: "/UserProfileV2",
        name: "Test: UserProfileV2",
        component: <UserProfileV2 />,
    },
*/
    
/*
// UNUSED DEFAULTS
    {
        path: "/user-profile",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        icon: "tim-icons icon-single-02",
        component: <UserProfile />,
        layout: "/admin",
    },
*/

];

export default routes;
