// **************************************Development By Md. Hasibuzzaman****************************************
import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { indigo } from '@mui/material/colors';

const Bor = (props) => (
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
            variant="h4"
          >
            বর
          </Typography>       
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: indigo[600],
              height: 56,
              width: 56
            }}
          > 50
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default Bor;
