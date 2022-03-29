import React from "react";
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const HeadTitle = ({ children }) => {
  return (
  <>
   <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: "#F7F7F7", color:"#1eb050", borderRadius: 1, mb: 2}}>
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          { children }
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  </>
);
};

export default HeadTitle;
