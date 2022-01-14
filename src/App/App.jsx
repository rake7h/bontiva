import { hot } from "react-hot-loader/root";
import React, { useState } from "react";
import { Grommet, Box, Grid } from "grommet";
import Container from "@material-ui/core/Container";
import CreatePackageForm from "../Components/CreatePackageForm";
import PackageList from "../Components/Packages/PackageList";
import Sidebar from "../Components/Sidebar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "contain",
    },
  },
};

export function App() {
  return (
    <Grommet theme={theme}>
      <CssBaseline />
      <Router>
        <Grid
          fill
          rows={["auto", "flex"]}
          columns={["auto", "flex"]}
          areas={[
            { name: "nav", start: [0, 1], end: [0, 1] },
            { name: "main", start: [1, 1], end: [1, 1] },
          ]}
        >
          <Box gridArea="nav" background="light-5">
            <Sidebar />
          </Box>
          <Box gridArea="main">
            <Container>
              <Switch>
                <Route path="/packages">
                  <PackageList />
                </Route>
                <Route path="/workspaces">
                  <CreatePackageForm />
                </Route>
              </Switch>
            </Container>
          </Box>
        </Grid>
      </Router>
    </Grommet>
  );
}

export default hot(App);
