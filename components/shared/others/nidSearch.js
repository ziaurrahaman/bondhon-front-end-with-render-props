import * as React from "react";
import { useState } from "react";
import { Grid, Tooltip, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';


const Basic = (props) => {
  const [religion, setReligion] = useState("");

  const handleChange = (event) => {
    setReligion(event.target.value);
  };

  return (
    <>
      <Title>
        <Typography variant="h6">{props.title}</Typography>
      </Title>

      <Grid container spacing={2.5} px={2}>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            required
            id="nid"
            name="nid"
            label="জাতীয় আইডি নম্বর"
            fullWidth
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={12}>
          <Stack>
            <TextField
              id="date"
              label="জন্ম তারিখ"
              fullWidth
              size="small"
              type="date"
              defaultValue="2021-12-27"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={3} sm={12}>
          <TextField
            required
            name="nikahno"
            label={props.title}
            fullWidth
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={2} sm={12}>
          <Stack>
          <Tooltip title="নিকাহনামা খুঁজুন">
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 1 }}
              startIcon={<SearchIcon />}
            > {props.title}
            </Button>
          </Tooltip>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Basic;
