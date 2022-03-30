import React from "react";
import Title from "../../shared/others/HeadTitle";
import Address from "../../shared/others/addressNew";
import {
  Container,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  TextField,
  Grid,
  Stack,
  Typography,
  Tooltip,
  Button,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { marriageInfoBasicInfoUrl } from "../../../url/ApiList";
import SaveIcon from "@mui/icons-material/Save";
import { set, setMilliseconds } from "date-fns";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  // SetGroomRegPayloadAction,
  RegisterGroom,
} from "../../../redux/actions/groom_action";
import { SetMarriageInfoPayloadAction } from "../../../redux/actions/mrg_info";
import ZoneComponent from "../../shared/others/ZoneComponent";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AllFormContext from "../../shared/others/zone_form_context.json";

const BasicMarriageInformation = (props) => {
  useEffect(() => {
    setAllFormContext(AllFormContext.fields);
  }, []);

  const [allFormContext, setAllFormContext] = useState([]);
  function giveValueToTextField(index) {
    const ids = [
      props.marriageInfo.division_id,
      props.marriageInfo.district_id,
      props.marriageInfo.upazila_id,
      props.marriageInfo.union_id,
    ];
    console.log("idINdex", ids[index]);
    return ids[index];
  }

  // console.log("State of my====", marriageInfo);

  //--------------- Import Doc ------

  return (
    <>
      <Container>
        <Paper
          sx={{ my: { xs: 2, md: 4 }, p: { xs: 1, md: 2 } }}
          elevation={3}
          rounded
        >
          <>
            <Title>
              <Typography variant="h6">বিবাহ সম্পন্নের স্থান</Typography>
            </Title>
            <Grid container spacing={3}>
              {allFormContext.map((form, i) => {
                var obj = Object.assign(
                  {},
                  { ...form },
                  { value: giveValueToTextField(i) },
                  { onChange: props.hadnleChangeMrg },
                  {
                    division_Id: props.marriageInfo.division_id,
                  },
                  {
                    district_Id: props.marriageInfo.district_id,
                  },
                  {
                    upa_city_Id: props.marriageInfo.upazila_id,
                  }
                );

                console.log("obj-------------------------", obj);
                // const textFieldValue = giveValueToTextField(i);

                return (
                  <>
                    <ZoneComponent {...obj} />
                  </>
                );
              })}
              <Grid item xs={12} md={12} sm={12}>
                <TextField
                  required
                  id="houseRoadVillage"
                  name="detail_address"
                  label="বিস্তারিত ঠিকানা"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={props.marriageInfo.detail_address}
                  onChange={props.hadnleChangeMrg}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AddLocationIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                {/* {formErrors.details_address.length > 0 && (
                  <span style={{ color: "red" }}>
                    {formErrors.details_address}
                  </span>
                )} */}
              </Grid>
            </Grid>
          </>
          <Title>
            <Typography variant="h6">বিবাহ সম্পর্কে অন্যান্য তথ্য</Typography>
          </Title>

          <Grid container spacing={2} px={2} py={2}>
            <Grid item xs={12} sm={12} md={3}>
              <Stack>
                <TextField
                  value={props.marriageInfo.marriage_fixed_date}
                  name="marriage_fixed_date"
                  id="marriageFiexedOn"
                  label="বিয়ে ঠিক হয়েছে"
                  fullWidth
                  size="small"
                  type="date"
                  defaultValue="2021-12-27"
                  onChange={props.hadnleChangeMrg}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Stack>
                <TextField
                  name="marriage_date"
                  id="marriageDate"
                  label="  বিয়ের তারিখ"
                  fullWidth
                  size="small"
                  onChange={props.hadnleChangeMrg}
                  type="date"
                  defaultValue="2021-12-27"
                  value={props.marriageInfo.marriage_date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Stack>
                <TextField
                  name="marriage_reg_date"
                  id="marriageRegistrationDate"
                  label="বিবাহ নিবন্ধনের তারিখ"
                  fullWidth
                  size="small"
                  type="date"
                  defaultValue="2021-12-27"
                  onChange={props.hadnleChangeMrg}
                  value={props.marriageInfo.marriage_reg_date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <TextField
                required
                id="mohorAmmount"
                name="denmohor"
                label="দেন মোহরের পরিমাণ"
                fullWidth
                size="small"
                autoComplete="given-name"
                onChange={props.hadnleChangeMrg}
                variant="outlined"
                type={"number"}
                value={props.marriageInfo.denmohor}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2.7}>
              <TextField
                required
                id="muajjol"
                name="muajjol"
                label="দেন মোহর মুয়াজ্জল"
                value={props.marriageInfo.muajjol}
                fullWidth
                size="small"
                autoComplete="given-name"
                onChange={props.hadnleChangeMrg}
                variant="outlined"
                type={"text"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2.7}>
              <TextField
                required
                id="mohorMoazzol"
                name="muajjil"
                onChange={props.hadnleChangeMrg}
                label="দেন মোহর মু'অজ্জিল"
                fullWidth
                size="small"
                autoComplete="given-name"
                variant="outlined"
                value={props.marriageInfo.muajjil}
                type={"text"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3.1}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="gender"
                  name="controlled-radio-buttons-group"
                  size="small"
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="দেন মোহর প্রদান হয়েছি কি?"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3.5}>
              <TextField
                required
                id="mohorMoazzol"
                name="paid_denmohor_amount"
                label="পরিশোধিত দেনমোহরের পরিমাণ"
                fullWidth
                size="small"
                onChange={props.hadnleChangeMrg}
                value={props.marriageInfo.paid_denmohor_amount}
                autoComplete="given-name"
                variant="outlined"
                type={"number"}
              />
            </Grid>
          </Grid>
          <Grid
            container
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid item sm={12} md={5.8} xs={12}>
              <Title>
                <Typography variant="h6">কনের বিশেষ তথ্য</Typography>
              </Title>
              <Grid container spacing={1.5} px={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="position"
                      name="mrg_status"
                      onClick={props.hadnleChangeMrg}
                      onChange={(e) => {
                        props.marritalStatusDevorcePermissionRightRevokChangeHandlerObjMrg.maritalStatusChangeHandler(
                          e
                        );
                      }}
                    >
                      <FormControlLabel
                        value="unmarried"
                        control={<Radio color="primary" />}
                        label="কনে কুমারী"
                      />
                      <FormControlLabel
                        value="widow"
                        control={<Radio color="success" />}
                        label="বিধবা"
                      />
                      <FormControlLabel
                        value="devorcy"
                        control={<Radio color="secondary" />}
                        label="তালাকপ্রাপ্ত নারী"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {props.performDevorcePermissionDevorcyFilesAlimonyStateObjMrg
                  .isDevorcy && (
                  <>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        name="divorce_con"
                        label="তালাক প্রাপ্ত হওয়ার শর্ত"
                        onChange={props.devorceConOnChagneMrg}
                        fullWidth
                        size="small"
                        type="text"
                        value={props.marriageInfo.divorce_con}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          aria-label="position"
                          name="revoke_per"
                          onChange={props.hadnleChangeMrg}
                        >
                          <FormControlLabel
                            value="rightRevoked"
                            control={<Radio color="primary"></Radio>}
                            label={"স্বামীর অধিকার বাতিল"}
                          ></FormControlLabel>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          aria-label="position"
                          name="khorposh_pr"
                          onChange={(e) => {}}
                        >
                          <FormControlLabel
                            value="khorposhEvidence"
                            label="খোরপোশের প্রমাণ"
                            control={<Radio color="primary" />}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          aria-label="position"
                          name="khorposh_pr"
                          onChange={props.khorposhOnchangeMrg}
                        >
                          <FormControlLabel
                            value="khorposhEvidence"
                            label="খোরপোশের প্রমাণ"
                            control={<Radio color="primary" />}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        sx={{ marginTop: 3 }}
                        required
                        id="brideDoc"
                        name="brideDoc"
                        label="নথি নির্বাচন করুন"
                        // value={marriageInfo.brideDoc}
                        fullWidth
                        size="small"
                        variant="outlined"
                        type="file"
                        focused
                        //onChange={userPicture}
                        onClick={(event) => (event.target.value = null)}
                      />
                    </Grid>
                  </>
                )}
                {props.performDevorcePermissionDevorcyFilesAlimonyStateObjMrg
                  .isAlimonyGiven && (
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      name="alimony_con"
                      id="marriageDate"
                      label="খোরপোশের শর্ত"
                      fullWidth
                      size="small"
                      onChange={props.hadnleChangeMrg}
                      value={props.marriageInfo.alimony_con}
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item sm={12} md={5.8} xs={12}>
              <Title>
                <Typography variant="h6">বরের বিশেষ তথ্য</Typography>
              </Title>
              <Grid container spacing={1.5} px={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="position"
                      name="whom"
                      defaultValue="top"
                      onClick={props.hadnleChangeMrg}
                      onChange={(e) => {
                        props.marritalStatusDevorcePermissionRightRevokChangeHandlerObjMrg.isHusbandPerfomDevorceChangeHandler(
                          e
                        );
                      }}
                    >
                      <FormControlLabel
                        value="unmarried"
                        control={<Radio color="primary" />}
                        label="অবিবাহিত"
                      />
                      <FormControlLabel
                        value="married"
                        control={<Radio color="success" />}
                        label="বিবাহিত"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {props.performDevorcePermissionDevorcyFilesAlimonyStateObjMrg
                  .isHusbandPerfomDevorce && (
                  <>
                    <Grid item sm={12} md={12} xs={12}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          aria-label="position"
                          name="userType"
                          defaultValue="top"
                          onChange={(e) => {
                            props.hadnleChangeMrg(e);
                            props.marritalStatusDevorcePermissionRightRevokChangeHandlerObjMrg.isHusbandTakenPermissonFromWifeHandler(
                              e
                            );
                          }}
                        >
                          <FormControlLabel
                            value="takenPermission"
                            control={<Radio />}
                            label="
                        স্ত্রীর কাছ থেকে অনুমতি নিয়েছে"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </>
                )}
                {props.performDevorcePermissionDevorcyFilesAlimonyStateObjMrg
                  .isHusbandTakenPrmissionFromCurrentWife &&
                  props.performDevorcePermissionDevorcyFilesAlimonyStateObjMrg
                    .isHusbandPerfomDevorce && (
                    <>
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          sx={{ marginTop: 3 }}
                          required
                          id="groomDoc"
                          name="groomDoc"
                          label="নথি নির্বাচন করুন"
                          // value={marriageInfo.groomDoc}
                          fullWidth
                          size="small"
                          variant="outlined"
                          type="file"
                          focused
                          //onChange={userPicture}
                          onClick={(event) => (event.target.value = null)}
                        />
                      </Grid>
                    </>
                  )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default BasicMarriageInformation;
