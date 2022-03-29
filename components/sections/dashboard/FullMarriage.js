// **************************************Development By Md. Hasibuzzaman****************************************

import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { orange } from '@mui/material/colors';

const FullMarriage = (props) => (
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
          > বিবাহ সম্পন্ন
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: orange[600],
              height: 56,
              width: 56
            }}
          > 20
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default FullMarriage;
