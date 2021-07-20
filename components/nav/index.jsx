import { AppBar, Toolbar, Typography, Link, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

const nav = ({ alert }) => {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Link href="/" color="textPrimary">
              <img src="/duck.ico" alt="duck.fed.icon" height="25px" />
            </Link>
          </Typography>
          <Button href="/add" color="secondary">
            Add Duck Fed
          </Button>
          <Button href="/view" color="secondary">
            View Duck Fed
          </Button>
        </Toolbar>
      </AppBar>
      {alert && alert.hasOwnProperty("severity") ? (
        <Alert severity={alert.severity}>{alert.message}</Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default nav;
