import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton, CircularProgress, Alert } from "@mui/material";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getHistoryOfUser();
        // console.log("History response:", response);

        // Handle response format
        if (response && response.success && Array.isArray(response.meetings)) {
          setMeetings(response.meetings);
        } else {
          throw new Error("Invalid meetings data format");
        }
      } catch (err) {
        console.error("Failed to load history:", err);
        setError(err.message || "Failed to load meeting history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "40px" }}
      >
        <CircularProgress />
        <Typography variant="body1" style={{ marginLeft: "16px" }}>
          Loading meeting history...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <Alert severity="error" style={{ marginBottom: "20px" }}>
          {error}
        </Alert>
        <IconButton onClick={() => navigate("/home")}>
          <HomeIcon /> Back to Home
        </IconButton>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <IconButton
        onClick={() => navigate("/home")}
        style={{ marginBottom: "20px" }}
      >
        <HomeIcon /> Back to Home
      </IconButton>

      {meetings.length === 0 ? (
        <Alert severity="info">
          No meeting history found. Your past meetings will appear here.
        </Alert>
      ) : (
        meetings.map((meeting, index) => (
          <Card
            key={`${meeting.meetingCode}-${index}`}
            variant="outlined"
            style={{ marginBottom: "15px" }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Meeting Code: {meeting.meetingCode}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Date: {formatDate(meeting.date)}
              </Typography>
              {meeting.otherData && (
                <Typography variant="body2">
                  {JSON.stringify(meeting.otherData)}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
