import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Grid, Link } from "@mui/material";

const pages = [" ", "হোম", " "];
const settings = ["Logout"];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));


const ResponsiveAppBar = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (

    <AppBar position="fixed" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Image src="/logo.png" alt="Logo" width={100} height={60} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Image src="/logo.png" alt="Logo" width={100} height={60} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/avater.svg" />
              </IconButton> */}

              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                onClick={handleOpenUserMenu}
              >
                <Avatar alt="Remy Sharp" src="/avater.svg" />
              </StyledBadge>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             <Link href="/" passHref color="inherit" underline="none">
                <MenuItem onClick={handleCloseUserMenu}>
                 <PowerSettingsNewIcon sx={{ marginRight: 1 }} />
                Sign Out
            </MenuItem>
            </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    // <AppBar position="fixed" color="inherit">
    //   <Container maxWidth="xl">
    //     <Toolbar disableGutters>
    //       <Grid md={11}>
    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="div"
    //         sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
    //       >
    //         <Image src="/logo.png" alt="Logo" width={100} height={60} />
    //       </Typography>
    //       </Grid>
    //       <Grid md={1}>
    //       <Box sx={{ flexGrow: 0}}>
    //         <Tooltip title="Open settings">
    //           <StyledBadge
    //             sx={{alignContent:'end'}}
    //             overlap="circular"
    //             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    //             variant="dot"
    //             onClick={handleOpenUserMenu}
    //           >
    //             <Avatar alt="Remy Sharp" src="/avater.jpg" />
    //           </StyledBadge>
    //         </Tooltip>
    //         <Menu
    //           sx={{ mt: "45px" }}
    //           id="menu-appbar"
    //           anchorEl={anchorElUser}
    //           anchorOrigin={{
    //             vertical: "top",
    //             horizontal: "right",
    //           }}
    //           keepMounted
    //           transformOrigin={{
    //             vertical: "top",
    //             horizontal: "right",
    //           }}
    //           open={Boolean(anchorElUser)}
    //           onClose={handleCloseUserMenu}
    //         >
    //           <Link href="/" passHref color="inherit" underline="none">
    //             <MenuItem onClick={handleCloseUserMenu}>
    //               <PowerSettingsNewIcon sx={{ marginRight: 1 }} />
    //               Sign Out
    //             </MenuItem>
    //           </Link>
    //         </Menu>
    //       </Box>
    //       </Grid>
    //     </Toolbar>
    //   </Container>
    // </AppBar>
  );
};
export default ResponsiveAppBar;
