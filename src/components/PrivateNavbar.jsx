import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Collapse } from "bootstrap";

const PrivateNavbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const closeNavbar = () => {
    const nav = document.getElementById("navMain2");
    const bsCollapse = Collapse.getInstance(nav);

    if (bsCollapse) {
      bsCollapse.hide();
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("blogData");
    toast.success("Logout successful", {
      position: "top-right",
      autoClose: true,
    });
    navigate("/login");
  };

  return (
    <nav className="primary-link navbar navbar-expand-lg navbar-light ">
      <div className="container">
        <NavLink to="/" className="navbar-brand" onClick={closeNavbar}>
          BlogApp
        </NavLink>
        <button
          className="navbar-toggler ms-auto border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMain2"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navMain2">
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={closeNavbar}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              {(auth.role === 1 || auth.role === 2) && (
                <NavLink
                  className="nav-link"
                  to="/categories"
                  onClick={closeNavbar}
                >
                  Categories
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/posts" onClick={closeNavbar}>
                Posts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile" onClick={closeNavbar}>
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/setting" onClick={closeNavbar}>
                Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login" onClick={() => { handleLogout(); closeNavbar(); }}>
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
