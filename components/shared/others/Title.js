import React from "react";
import PrintTwoToneIcon from '@mui/icons-material/PrintTwoTone';
import SimCardDownloadTwoToneIcon from '@mui/icons-material/SimCardDownloadTwoTone';
import { AppBar, Box, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';

const Title = ({ children }) => {
  return (
  <>
   <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: "#1eb050", borderRadius: 2, mb: 2}}>
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          { children }
          </Typography>
            <div>
            <Tooltip title="মুদ্রণ করুন">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <PrintTwoToneIcon />
              </IconButton>
              </Tooltip>
              <Tooltip title="ডাউনলোড করুন">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <SimCardDownloadTwoToneIcon />
              </IconButton>
              </Tooltip>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  </>
);
};

export default Title;
