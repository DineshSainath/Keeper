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
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box display="flex" width="100%" justifyContent="flex-start" mb={2}>
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            color="primary"
          >
            Back to Notes
          </Button>
        </Box>

        <Typography component="h1" variant="h5">
          Profile
        </Typography>

        {error && (
          <Alert severity="error" style={{ width: "100%", marginTop: "1rem" }}>
            {error}
          </Alert>
        )}

        <Card style={{ width: "100%", marginTop: "1rem" }}>
          <CardContent>
            <Typography variant="h6">Email: {currentUser.email}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              style={{ marginTop: "1rem" }}
            >
              Log Out
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Profile;
