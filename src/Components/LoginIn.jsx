import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Box,
} from "@mui/material";

const AuthenticationExample = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "kminchelle",
          password: "0lelplR",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        setIsLoggedIn(true);
        setError("");
      } else {
        setIsLoggedIn(false);
        setError(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setIsLoggedIn(false);
      setError("An error occurred during authentication");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {isLoggedIn ? "Welcome" : "Login"}
          </Typography>
          <form>
            <Grid container spacing={2}>
              {!isLoggedIn && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      variant="outlined"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </Grid>
                </>
              )}
              {error && (
                <Grid item xs={12}>
                  <Typography variant="body2" style={{ color: "red" }}>
                    {error}
                  </Typography>
                </Grid>
              )}
              {isLoggedIn && (
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthenticationExample;
