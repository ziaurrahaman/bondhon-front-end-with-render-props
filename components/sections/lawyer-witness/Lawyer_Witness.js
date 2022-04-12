import { React, useState } from "react";
import {
  Grid,
  Typography,
  Stack,
  InputAdornment,
  TextField,
  Container,
  Paper,
} from "@mui/material";
import Title from "../../shared/others/HeadTitle";
import Address from "../../shared/others/addressNew";
import WitnessForm from "./WitnessForm";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MaleIcon from "@mui/icons-material/Male";

import AddLocationIcon from "@mui/icons-material/AddLocation";

import AllFormContext from "../../shared/others/zone_form_context.json";
import ZoneComponent from "../../shared/others/ZoneComponent";
import { useEffect } from "react";
import { LawyerWitnessFatherContext } from "./lawyerWitnessContext";
import { useContext } from "react";
const LawyerWitness = (props) => {
  const [allFormContext, setAllFormContext] = useState([]);
  const lawyerFather = useContext(LawyerWitnessFatherContext);
  console.log("context", LawyerWitnessFatherContext);

  const {
    lawyerFatherInfo,
    formErrorsLawyer,
    handleOnChange,
    formatDate,
    nidDataFatch,
    giveValueToTextField,
    onFetchNidServerData,
    handlerOnFatchData,
  } = lawyerFather;
  useEffect(() => {
    setAllFormContext(AllFormContext.fields);
  }, []);

  // console.log("lawFatherState", lawyerFatherInfo);

  /**************************************************************************/

  return (
    <>
      <Container maxWidth="xl">
        <Paper
          sx={{ my: { xs: 2, md: 4 }, p: { xs: 1, md: 2 } }}
          elevation={3}
          rounded
        >
          <Title>
            <Typography variant="h6">উকিল বাবার তথ্য</Typography>
          </Title>

          <Grid container spacing={2} px={2} py={2}>
            <Grid item xs={12} sm={4} md={4}>
              <TextField
                required
                id="nid"
                name="lawyer_father_id"
                label="জাতীয় পরিচয়পত্র নাম্বার"
                fullWidth
                size="small"
                autoComplete="family-name"
                variant="outlined"
                onChange={handleOnChange}
                value={lawyerFatherInfo.lawyer_father_id}
                onKeyUp={handlerOnFatchData}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {formErrorsLawyer.nid.length > 0 && (
                <span style={{ color: "red" }}>{formErrorsLawyer.nid}</span>
              )}
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Stack>
                <TextField
                  name="dob"
                  id="dob"
                  label="জন্ম তারিখ"
                  fullWidth
                  size="small"
                  type="date"
                  // defaultValue="2021-12-27"
                  onChange={handleOnChange}
                  value={lawyerFatherInfo.dob}
                  onKeyUp={onFetchNidServerData}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <TextField
                required
                id="name"
                name="name"
                label="নাম"
                fullWidth
                size="small"
                autoComplete="given-name"
                onChange={handleOnChange}
                variant="outlined"
                value={lawyerFatherInfo.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MaleIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {formErrorsLawyer.name.length > 0 && (
                <span style={{ color: "red" }}>{formErrorsLawyer.name}</span>
              )}
            </Grid>
          </Grid>
          <Title>
            <Typography variant="h6">ঠিকানা</Typography>
          </Title>
          <Grid container spacing={2} px={2} py={2}>
            {allFormContext.map((form, i) => {
              var obj = Object.assign(
                {},
                { ...form },
                {
                  value: giveValueToTextField(i),
                },
                { onChange: handleOnChange },
                {
                  division_Id: lawyerFatherInfo.division_id,
                },
                {
                  district_Id: lawyerFatherInfo.district_id,
                },
                {
                  upa_city_Id: lawyerFatherInfo.upazila_id,
                }
              );

              return (
                <>
                  <ZoneComponent {...obj} />
                </>
              );
            })}
            <Grid item xs={12} md={12} sm={12}>
              <TextField
                required
                id="village"
                name="detail_address"
                type="text"
                label="বিস্তারিত ঠিকানা"
                fullWidth
                onChange={handleOnChange}
                size="small"
                variant="outlined"
                value={lawyerFatherInfo.detail_address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddLocationIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {formErrorsLawyer.detail_address.length > 0 && (
                <span style={{ color: "red" }}>
                  {formErrorsLawyer.detail_address}
                </span>
              )}
            </Grid>
          </Grid>
          <Title>
            <Typography variant="h6">সাক্ষীর তথ্য</Typography>
          </Title>
          <Grid container spacing={2} px={2} py={2}>
            <Grid sm={12} md={12} xs={12} spacing={2}>
              <WitnessForm></WitnessForm>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
export default LawyerWitness;
