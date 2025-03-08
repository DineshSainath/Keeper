import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "../../config/firebase";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function Profile() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      const { error: logoutError } = await signOut();

      if (logoutError) {
        setError(logoutError);
        return;
      }

      history.push("/login");
    } catch (err) {
      setError("Failed to log out");
      console.error(err);
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <div className="auth-container">
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          className="back-button"
        >
          Back to Notes
        </Button>

        <Typography component="h1" variant="h5">
          Profile
        </Typography>

        {error && (
          <Alert severity="error" style={{ width: "100%", marginTop: "1rem" }}>
            {error}
          </Alert>
        )}

        <div className="profile-card">
          <Typography
            variant="h6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Email: {currentUser.email}
          </Typography>
          <Button
            variant="contained"
            className="logout-button"
            onClick={handleLogout}
            style={{ marginTop: "1rem" }}
          >
            Log Out
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Profile;
