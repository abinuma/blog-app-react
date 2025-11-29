import { NavLink } from "react-router-dom";

const PublicNavbar = () => {
    return (
        <nav className="public-navbar"> 
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
        </nav>
    )
}

export default PublicNavbar;