import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import { Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
import "../App.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const navigate = useNavigate();

  const handleAuth = async () => {
    setLoading(true);
    setError("");
    try {
      if (formState === 0) {
        let result = await handleLogin(username, password);
      }
      if (formState === 1) {
        const result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setFormState(0);
        // Clear form after successful registration
        setName("");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {/* Image Section */}
        <Grid
          size={{ xs: false, sm: 4, md: 7 }}
          //   xs={false}
          //   sm={4}
          //   md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1577864662891-c7b77f10f638?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background:
                "linear-gradient(to right, rgba(255,255,255,0.3), rgba(25,118,210,0.5))",
            },
          }}
        ></Grid>

        {/* Form section */}
        <Grid
          size={{ xs: 12, sm: 8, md: 5 }}
          //   xs={12}
          //   sm={8}
          //   md={5}
          component={Paper}
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button
            style={{ marginLeft: "10px", width: "7rem" }}
            onClick={() => {
              navigate("/");
            }}
            variant="contained"
          >
            <KeyboardBackspaceIcon style={{ marginRight: "10px" }} />
            Back
          </Button>
          <div className="loginFormIntro">
            <h2 style={{ borderBottom: "0rem" }}>Video Buddy</h2>
            <br />
            {formState === 0 ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "1.2rem", marginLeft: "7rem" }}>
                  SignIn to your account.
                </p>
                <p style={{ fontSize: "1.2rem" }}>
                  Don't have an account, click on SignUp button now!
                </p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: "1.2rem" }}>
                  Fill in the below details & SignUp on Video Buddy!
                </p>
              </div>
            )}
          </div>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <div>
              <Button
                variant={formState === 0 ? "contained" : "outlined"}
                onClick={() => setFormState(0)}
                sx={{ mr: 1 }}
                disabled={loading}
              >
                Sign In
              </Button>
              <Button
                variant={formState === 1 ? "contained" : "outlined"}
                onClick={() => setFormState(1)}
                disabled={loading}
              >
                Sign Up
              </Button>
            </div>

            <Box
              component="form"
              noValidate
              sx={{ mt: 1, width: "100%" }}
              onSubmit={(e) => {
                e.preventDefault();
                handleAuth();
              }}
            >
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  value={name}
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />

              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : formState === 0 ? (
                  "Login"
                ) : (
                  "Register"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </ThemeProvider>
  );
}
