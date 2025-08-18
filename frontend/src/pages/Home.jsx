import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, Input } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <div className="homePageConatiner">
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2
            style={{
              color: "rgb(255, 152, 57)",
              fontSize: "2rem",
              marginTop: "1rem",
            }}
          >
            Video Buddy
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
            gap: "10px",
            fontSize: "1.2rem",
          }}
        >
          <Button
            onClick={() => {
              navigate("/");
            }}
            variant="contained"
          >
            Back
          </Button>

          <Button
            onClick={() => {
              navigate("/history");
            }}
            variant="contained"
          >
            <RestoreIcon style={{ marginRight: "10px" }} />
            History
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="mainContent">
        <div className="leftPanel">
          <img src="/videobuddy_logo2.png" alt="" />
        </div>

        <div className="meetContainer">
          <div className="rightPanel">
            <div>
              <h1
                style={{ marginBottom: "0.4rem", color: "rgb(255, 152, 57)" }}
              >
                Connect and Chat with just one click.
              </h1>
              <p style={{ marginBottom: "1.8rem" }}>
                Enter the meeting code and join the existing meeting or start
                your own meeting by creating a new meeting code.
              </p>

              <div style={{ display: "flex", gap: "1.25rem" }}>
                <Input
                  onChange={(e) => setMeetingCode(e.target.value)}
                  id="outlined-basic"
                  placeholder="Enter a meeting code"
                  variant="outlined"
                  style={{
                    background: "white",
                    width: "250px",
                    border: "2px solid white",
                    borderRadius: "5px",
                  }}
                />
                <Button
                  style={{
                    fontSize: "1.2rem",
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                  }}
                  onClick={handleJoinVideoCall}
                  variant="contained"
                >
                  Join
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(HomeComponent);
