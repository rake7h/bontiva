import React from "react";
import { Sidebar, Nav } from "grommet";
import "react-pro-sidebar/dist/css/styles.css";
import { GoPackage, GoFileDirectory } from "react-icons/go";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

const SideBar = () => (
  <Sidebar>
    <Nav gap="medium">
      <Link to="/packages">
        <IconButton aria-label="delete" size="medium">
          <GoPackage />
        </IconButton>
      </Link>
      <Link to="/workspaces">
        <IconButton aria-label="delete" size="medium">
          <GoFileDirectory />
        </IconButton>
      </Link>
    </Nav>
  </Sidebar>
);

export default SideBar;
