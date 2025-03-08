import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "@material-ui/core/Button";

function Header() {
  const { currentUser } = useAuth();

  return (
    <header>
      <h1>Keeper</h1>
      {currentUser && (
        <div className="profile-link">
          <Button
            component={Link}
            to="/profile"
            color="inherit"
            style={{ color: "white" }}
          >
            Profile
          </Button>
        </div>
      )}
    </header>
  );
}

export default Header;
