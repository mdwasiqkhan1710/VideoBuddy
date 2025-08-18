import { useEffect, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  });

  const handleLogin = () => {
    navigate("/");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("You have been logged out successfully!");
  };

  return (
    <div className="landingPageContainer">
      <nav>
        <div style={{ display: "flex", gap: "0.6rem" }} className="navHeader">
          <img
            style={{ height: "4rem", width: "4rem" }}
            src="/videobuddy_logo2.png"
            alt=""
          />
          <Link style={{ textDecoration: "none", color: "orange" }} to={"/"}>
            <h1>Video Buddy</h1>
          </Link>
        </div>
        <div className="navlist">
          {isLoggedIn ? (
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                padding: "2px",
                fontSize: "1.3rem",
                fontWeight: "600",
                marginRight: "1.5px",
              }}
              to={"/home"}
            >
              <div role="button">Home</div>
            </Link>
          ) : (
            <div></div>
          )}
          {isLoggedIn ? (
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                padding: "2px",
                fontSize: "1.3rem",
                fontWeight: "600",
                marginRight: "1.5px",
              }}
              onClick={handleLogOut}
              to={"/"}
            >
              <div role="button">Logout</div>
            </Link>
          ) : (
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                padding: "2px",
                fontSize: "1.3rem",
                fontWeight: "600",
                marginRight: "1.5px",
              }}
              onClick={handleLogin}
              to={"/auth"}
            >
              <div role="button">Login</div>
            </Link>
          )}
          {!isLoggedIn && (
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                padding: "2px",
                fontSize: "1.3rem",
                fontWeight: "600",
                marginRight: "1.5px",
              }}
              to={"/auth"}
            >
              <div role="button">SignUp</div>
            </Link>
          )}
        </div>
      </nav>

      <div className="landingMainConatiner">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your Loved
            ones
          </h1>
          <p style={{ fontSize: "1.3rem" }}>
            Bridge all the distances using Video Buddy, your go to video calling
            & chatting application.
          </p>
          {isLoggedIn ? (
            <div className="gettingStartedbutton" role="button">
              <Link style={{ textDecoration: "none" }} to={"/home"}>
                <p className="gettingStartedbuttontext">Get Started</p>
              </Link>
            </div>
          ) : (
            <div className="gettingStartedbutton" role="button">
              <Link style={{ textDecoration: "none" }} to={"/auth"}>
                <p className="gettingStartedbuttontext">Get Started</p>
              </Link>
            </div>
          )}
        </div>
        <div>
          <img src="/mobile.png" alt="mobile" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
