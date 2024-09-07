import { Outlet } from "react-router-dom";
import { AdminNavbar, Navbar } from "../components";

const AdminDashboard=()=>{
    return(
        <>
            <Navbar />
            <AdminNavbar />
            <Outlet />
        </>
    )
}

export default AdminDashboard;