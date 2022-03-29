/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { Drawer, Grid, Tooltip } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Link from "next/link";
import TranslateIcon from "@mui/icons-material/Translate";

const useStyles = makeStyles((theme) => ({
  navBar: {
    // backgroundColor: theme.palette.primary.main,
    zIndex: 1,
    position: "fixed",
    top: "0",
    left: "0",
    // height:"50px",
    // display:"flex",
    // justifyContent:"center"
  },
  drawer: {
    width: "50%",
  },
  rightMenu: {
    zIndex: 100,
    background: "#707070",
    height: "40px",
    width: "40px",
    position: "absolute",
    top: "80px",
    right: "-5px",
    // borderRadius: "5px 0px 0px 5px",
    cursor: "pointer",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },
  rOption: {
    zIndex: 100,
    background: "#f4f4f4",
    width: "200px",
    height: "250px",
    padding: "5px",
    position: "absolute",
    top: "122px",
    right: "0px",
    border: "1px solid #C8C6C6",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const [rMenu, setRMenu] = useState(false);

  const showRMenu = () => {
    setRMenu(!rMenu);
  };

  // Drawer control section ================
  const [drawerFlag, setDrawerFlag] = useState(false);
  const controlDrawer = (e) => {
    setDrawerFlag(!drawerFlag);
  };

  // Toggle sections ====================
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    // console.log("Checked", event.target.checked);
    setChecked(event.target.checked);
  };

  // Hidden Menu sections====================
  const [showMenu, setShowMenu] = useState(null);

  const open = Boolean(showMenu);
  const handleClick = (event) => {
    setShowMenu(event.currentTarget);
  };
  const handleClose = () => {
    setShowMenu(null);
  };

  return (
    <Box>
      <AppBar className={classes.navBar} sx={{ backgroundColor: 'primary', zIndex: '1'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={controlDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          বন্ধন
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerFlag} onClose={controlDrawer}>
        <div
          style={{ width: "250px" }}
          role="presentation"
          onClick={controlDrawer}
        >
          <div
            className="text-center"
            style={{ background: "#1976d2", padding: "8px 0px 8px 0px" }}
          >
            <img src="/govt2.png" width="50px" height="50px" />
            <span style={{ color: "#fff", marginLeft: "5px" }}>বন্ধন</span>
          </div>
          <Divider />
          <List>
            <Link href="/citizen-dashboard">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <p
                  style={{
                    fontSize: "14px",
                    fontFamily: "'Bangla', sans-serif",
                    margin: "0",
                    padding: "5px",
                  }}
                >
                  ড্যাশবোর্ড
                </p>
              </ListItem>
            </Link>

            <Link href="/groom">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <p style={{ fontSize: "14px", fontFamily: "'Bangla', sans-serif", margin: "0", padding: "5px" }}>
                বরের তথ্যাদি</p>
              </ListItem>
            </Link>
            <Link href="/bride">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <p style={{ fontSize: "14px", fontFamily: "'Bangla', sans-serif", margin: "0", padding: "5px" }}>
                কনের তথ্যাদি</p>
              </ListItem>
            </Link>
            <Link href="/lawyer-witness">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <p style={{ fontSize: "14px", fontFamily: "'Bangla', sans-serif", margin: "0", padding: "5px" }}>
                উকিলের তথ্যাদি</p>
              </ListItem>
            </Link>
            <Link href="/marriageInfo">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <p style={{ fontSize: "14px", fontFamily: "'Bangla', sans-serif", margin: "0", padding: "5px" }}>
                বিবাহের তথ্যাদি</p>
              </ListItem>
            </Link>

          </List>

        </div>
      </Drawer>
    </Box>
  );
};

export default Navbar;
