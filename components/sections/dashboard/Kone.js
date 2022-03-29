// **************************************Development By Md. Hasibuzzaman****************************************

import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { green } from '@mui/material/colors';

const Kone = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            কনে
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: green[600],
              height: 56,
              width: 56
            }}
          > 30
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default Kone;
