import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


import { purple } from '@mui/material/colors';

const CoatFee = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
        <Typography
            color="textPrimary"
            variant="h5"
          >
            কোর্ট ফি
          </Typography>       
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: purple[600],
              height: 56,
              width: 56
            }}
          > <ArrowForwardIosIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default CoatFee;
