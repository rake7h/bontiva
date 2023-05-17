import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ImNpm } from "react-icons/im";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Heading, Box, Menu } from "grommet";
import IconButton from "@material-ui/core/IconButton";
import { CgArrowUpO } from "react-icons/cg";
import Tooltip from "@material-ui/core/Tooltip";

import { getAllPackages, versionBumpXHR } from "../../helpers/xhr";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tableRoot: {
    boxShadow: "none",
  },
}));

export default function SimpleList() {
  const classes = useStyles();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const w = await getAllPackages();
      setPackages(w.data);
    };
    fetchData();
  }, []);

  const versionBump = async (kind, location) => {
    const d = await versionBumpXHR({ kind, location });
    const w = await getAllPackages();
    setPackages(w.data);
    alert(d.data);
  };

  return (
    <div className={classes.root}>
      {packages &&
        packages.map((ws) => (
          <>
            <Box
              direction="row"
              pad="medium"
              align="center"
              alignContent="center"
            >
              <Heading margin="none" level="4">
                {ws.workspace}/
              </Heading>
            </Box>
            <TableContainer component={Paper} className={classes.tableRoot}>
              <Table className={classes.table} dense>
                <TableBody>
                  {ws.packages &&
                    ws.packages.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>
                          <ListItem dense>
                            <ListItemIcon>
                              <ImNpm />
                            </ListItemIcon>
                            <ListItemText primary={row.name} />
                          </ListItem>
                        </TableCell>
                        <TableCell align="right">{row.version}</TableCell>
                        <TableCell align="right">
                          <ListItem dense>
                            <Menu
                              label={
                                <Tooltip title="Version Bump up">
                                  <IconButton
                                    aria-label="delete"
                                    size="medium"
                                    className={classes.margin}
                                  >
                                    <CgArrowUpO />
                                  </IconButton>
                                </Tooltip>
                              }
                              dropProps={{
                                align: { top: "bottom", left: "left" },
                              }}
                              icon={false}
                              items={[
                                {
                                  label: "Patch",
                                  onClick: () =>
                                    versionBump("patch", row.location),
                                },
                                {
                                  label: "Minor",
                                  onClick: () =>
                                    versionBump("minor", row.location),
                                },
                                {
                                  label: "Major",
                                  onClick: () =>
                                    versionBump("major", row.location),
                                },
                              ]}
                            />
                          </ListItem>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ))}
      <Divider />
    </div>
  );
}
