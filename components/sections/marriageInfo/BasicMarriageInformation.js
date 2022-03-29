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

const BasicMarriageInformation = () => {
  useEffect(() => {
    setAllFormContext(AllFormContext.fields);
  }, []);
  // const [addressType, setAddressType] = useState("");
  // const [division, setDivision] = useState("");
  // const [district, setDistrict] = useState("");
  // const [upazila, setUpazila] = useState("");
  // const [union, setUnion] = useState("");

  // const handleAddTypeChange = (event) => {
  //   setAddressType(event.target.value);
  // };

  // const handleDivisionChange = (event) => {
  //   setDivision(event.target.value);
  // };

  // const handleDistrictChange = (event) => {
  //   setDistrict(event.target.value);
  // };

  // const handleUpazilaChange = (event) => {
  //   setUpazila(event.target.value);
  // };

  // const handleUnionChange = (event) => {
  //   setUnion(event.target.value);
  // };

  const [allFormContext, setAllFormContext] = useState([]);
  function giveValueToTextField(index) {
    const ids = [
      marriageInfo.division_id,
      marriageInfo.district_id,
      marriageInfo.upazila_id,
      marriageInfo.union_id,
    ];
    console.log("idINdex", ids[index]);
    return ids[index];
  }
  const dispatch = useDispatch();
  const mrgInfoPayload = useSelector((state) => state.mrgInfo);

  const [isHusbandPerfomDevorce, setIsHunbandPerformDevorec] =
    React.useState(false);
  const [
    isHusbandTakenPrmissionFromCurrentWife,
    setHusbandTakenPermissionFromCurrentWife,
  ] = React.useState(false);

  const [isDevorcy, setIsDevorcy] = React.useState(false);

  const [isAlimonyGiven, setIsAlimonyGiven] = React.useState(false);

  function maritalStatusChangeHandler(event) {
    if (event.target.value === "devorcy") {
      setIsDevorcy(true);
    } else {
      setIsDevorcy(false);
      setIsAlimonyGiven(false);
    }
  }

  function isHusbandPerfomDevorceChangeHandler(event) {
    console.log(event.target.value);
    if (event.target.value === "married") {
      setIsHunbandPerformDevorec(true);
    }
    if (event.target.value === "unmarried") {
      setIsHunbandPerformDevorec(false);
    }
    if (isHusbandTakenPrmissionFromCurrentWife === true) {
      setHusbandTakenPermissionFromCurrentWife(false);
    }
    // value = !value;
    // setIsHunbandPerformDevorec(value);
    // console.log(value);
  }
  function isHusbandTakenPermissonFromWifeHandler(event) {
    if (event.target.value === "takenPermission") {
      setHusbandTakenPermissionFromCurrentWife(true);
    }
  }

  function husbandsRightRevokedChangeHandler(event) {
    if (event.target.value === "khorposhEvidence") {
      setIsAlimonyGiven(true);
    }
  }
  // status: "",
  // nikahnama_no: "",
  // sonod_no: "",
  // marriage_fixed_date: "",
  // marriage_date: "",
  // marriage_reg_date: "",
  // denmohor: "",
  // denmohor_status: "",
  // muajjol: "",
  // muajjil: "",
  // paid_denmohor_amount: "",
  // special_info: "",
  // special_info_for: "",
  // special_info_type: "",
  // divorce_con: "",
  // alimony_con: "",
  // permission_no: "",
  // permission_date: "",
  // spc_status: "",

  const [marriageInfo, setMarriageInfo] = React.useState({
    status: mrgInfoPayload.status !== undefined ? mrgInfoPayload.status : "",
    nikahnama_no:
      mrgInfoPayload.nikahnama_no !== undefined
        ? mrgInfoPayload.nikahnama_no
        : "",
    sonod_no:
      mrgInfoPayload.sonod_no !== undefined ? mrgInfoPayload.sonod_no : "",
    marriage_fixed_date:
      mrgInfoPayload.marriage_fixed_date !== undefined
        ? mrgInfoPayload.marriage_fixed_date
        : "",
    marriage_date:
      mrgInfoPayload.marriage_date !== undefined
        ? mrgInfoPayload.marriage_date
        : "",
    marriage_reg_date:
      mrgInfoPayload.marriage_reg_date !== undefined
        ? mrgInfoPayload.marriage_reg_date
        : "",
    denmohor_status:
      mrgInfoPayload.denmohor_status !== undefined
        ? mrgInfoPayload.denmohor_status
        : "",
    muajjol: mrgInfoPayload.muajjol !== undefined ? mrgInfoPayload.muajjol : "",
    muajjil: mrgInfoPayload.muajjil !== undefined ? mrgInfoPayload.muajjil : "",
    denmohor:
      mrgInfoPayload.denmohor !== undefined ? mrgInfoPayload.denmohor : "",
    paid_denmohor_amount:
      mrgInfoPayload.paid_denmohor_amount !== undefined
        ? mrgInfoPayload.paid_denmohor_amount
        : "",
    special_info:
      mrgInfoPayload.special_info !== undefined
        ? mrgInfoPayload.special_info
        : "",
    special_info_for:
      mrgInfoPayload.special_info_for !== undefined
        ? mrgInfoPayload.special_info_for
        : "",
    special_info_type:
      mrgInfoPayload.special_info_type !== undefined
        ? mrgInfoPayload.special_info_type
        : "",
    divorce_con:
      mrgInfoPayload.divorce_con !== undefined
        ? mrgInfoPayload.divorce_con
        : "",
    alimony_con:
      mrgInfoPayload.alimony_con !== undefined
        ? mrgInfoPayload.alimony_con
        : "",
    permission_no:
      mrgInfoPayload.permission_no !== undefined
        ? mrgInfoPayload.permission_no
        : "",
    permission_date:
      mrgInfoPayload.permission_date !== undefined
        ? mrgInfoPayload.permission_date
        : "",
    spc_status:
      mrgInfoPayload.spc_status !== undefined ? mrgInfoPayload.spc_status : "",
    brideDoc:
      mrgInfoPayload.brideDoc !== undefined ? mrgInfoPayload.brideDoc : "",
    groomDoc:
      mrgInfoPayload.groomDoc !== undefined ? mrgInfoPayload.groomDoc : "",
    division_id:
      mrgInfoPayload.division_id !== undefined
        ? mrgInfoPayload.division_id
        : "",
    district_id:
      mrgInfoPayload.district_id !== undefined
        ? mrgInfoPayload.district_id
        : "",
    upazila_id:
      mrgInfoPayload.upazila_id !== undefined ? mrgInfoPayload.upazila_id : "",
    union_id:
      mrgInfoPayload.union_id !== undefined ? mrgInfoPayload.union_id : "",
    detail_address:
      mrgInfoPayload.detail_address !== undefined
        ? mrgInfoPayload.detail_address
        : "",

    // (state.division = action.payload.division),
    // (state.district = action.payload.district),
    // (state.union = action.payload.union),
    // (state.cityCorp = action.payload.cityCorp);

    // alimony_pr:
    //   mrgInfoPayload.alimony_pr !== undefined ? mrgInfoPayload.alimony_pr : "",
    // per_no: mrgInfoPayload.per_no !== undefined ? mrgInfoPayload.per_no : "",
    // per_date:
    //   mrgInfoPayload.per_date !== undefined ? mrgInfoPayload.per_date : "",
  });

  const [formErrors, setFormErrors] = React.useState({
    gb_id: "",
    district_id: "",
    upazila_id: "",
    union_id: "",
    post_code: "",
    detail_address: "",
    fixed_on: "",
    marriage_date: "",
    reg_date: "",
    denmohor: "",
    paid_denmohor: "",
    muazzol: "",
    muazzil: "",
    mrg_id: "",
    whom: "",
    mrg_status: "",
    devorce_con: "",
    revoke_per: "",
    alimony_pr: "",
    per_no: "",
    per_date: "",
    brideDoc: "",
    groomDoc: "",
  });
  let checkFormError = () => {
    console.log(`formErrornid:${formErrors.nid}`);
    console.log(`formErrorname:${formErrors.name}`);
    let flag = false;
    for (const key in formErrors) {
      if (formErrors[key].length > 0) {
        flag = true;
      }
    }
    return flag;
  };

  const hadnleChange = (e) => {
    dispatch(SetMarriageInfoPayloadAction(marriageInfo));
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setMarriageInfo({
      ...marriageInfo,
      [name]: e.target.value,
    });
    switch (e.target.name) {
      case "marriage_fixed_date":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        formErrors.fixed_on = value === "" && "তারিখ দিন";
        break;
      case "marriage_date":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        formErrors.marriage_date = value === "" && "তারিখ দিন";
        break;
      case "marriage_reg_date":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        formErrors.reg_date = value === "" && "তারিখ দিন";
        break;
      case "denmohor":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        formErrors.denmohor = value === "" && "দেনমোহরের পরিমাণ দিন";
        break;
      case "muajjol":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        formErrors.denmohor = value === "" && "মুয়াজ্জল পরিমাণ দিন";
        break;
      case "muajjil":
        setMarriageInfo({ ...marriageInfo, [name]: value });

        formErrors.denmohor = value === "" && "মুয়াজ্জিল পরিমাণ দিন";
        break;
      case "paid_denmohor_amount":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        formErrors.denmohor = value === "" && "আদায়কৃতদেনমোহরের পরিমাণ দিন";
        break;
      case "whom":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        break;
      case "mrg_status":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        console.log("mrg_vlu", value);
        break;
      case "devorce_con":
        marriageInfo.devorce_con = value;
        // setMarriageInfo({ ...marriageInfo.devorce_con, [name]: value });
        console.log("omg", e.target.name);
        console.log("omg", e.target.value);
        break;
      case "alimony_con":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        break;

      case "permission_no":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        break;
      case "permission_date":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        break;
      case "brideDoc":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        break;
      case "groomDoc":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        break;
      case "division_id":
        console.log("I am in divvvvvvvvvvvvvvvvvvvvvvvvvv");
        setMarriageInfo({ ...marriageInfo, [e.target.name]: e.target.value });
        break;
      case "district_id":
        setMarriageInfo({ ...marriageInfo, [e.target.name]: e.target.value });
        break;
      case "upazila_id":
        setMarriageInfo({ ...marriageInfo, [e.target.name]: e.target.value });
        break;
      case "union_id":
        setMarriageInfo({ ...marriageInfo, [e.target.name]: e.target.valuee });
        break;
      case "detail_address":
        setMarriageInfo({ ...marriageInfo, [e.target.name]: e.target.valuee });
        break;
        break;
    }
  };
  // console.log("State of my====", marriageInfo);
  let onSubmitData = async (e) => {
    e.preventDefault();

    let payload = {
      gb_id: 123456,
      district_id: marriageInfo.district_id,
      upazila_id: marriageInfo.upazila_id,
      union_id: marriageInfo.union_id,
      post_code: marriageInfo.post_code,
      detail_address: marriageInfo.detail_address,
      fixed_on: marriageInfo.fixed_on,
      marriage_date: marriageInfo.marriage_date,
      reg_date: marriageInfo.reg_date,
      denmohor: marriageInfo.denmohor,
      paid_denmohor: marriageInfo.paid_denmohor,
      muazzol: marriageInfo.muazzol,
      muazzil: marriageInfo.muazzil,

      mrg_id: 23456,
      whom: marriageInfo.whom,
      mrg_status: marriageInfo.mrg_status,
      devorce_con: marriageInfo.devorce_con,
      revoke_per: marriageInfo.revoke_per,
      alimony_prv: marriageInfo.alimony_pr,
      per_no: marriageInfo.per_no,
      per_date: marriageInfo.per_date,
    };
    console.log("marriageINfoPayload:", payload);

    try {
      // console.log("urllllll:", marriageInfoBasicInfoUrl);
      const marriageBasicData = await axios.post(
        marriageInfoBasicInfoUrl,
        payload
      );
      // console.log("pay", marriageBasicData.data.message);

      NotificationManager.success("সফলভাবে ডেটা সংরক্ষণ করা হয়েছে");
    } catch (error) {
      if (error.response) {
        let message = error.response.data.errors[0].message;
        NotificationManager.error(message, "ত্রুটি পাওয়া গেছে", 5000);
      } else if (error.request) {
        NotificationManager.error("সংযোগ ত্রুটি পাওয়া গেছে..", "Error", 5000);
      } else if (error) {
        // NotificationManager.error(error.toString(), "Error", 5000);
      }
    }
  };

  //--------------- Import Doc ------
  const [files, setFiles] = useState([]);

  const handleAdd = (newFiles) => {
    newFiles = newFiles.filter(
      (file) => !files.find((f) => f.data === file.data)
    );
    setFiles([...files, ...newFiles]);
  };

  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };

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
                  { onChange: hadnleChange },
                  {
                    division_Id: marriageInfo.division_id,
                  },
                  {
                    district_Id: marriageInfo.district_id,
                  },
                  {
                    upa_city_Id: marriageInfo.upazila_id,
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
                  value={marriageInfo.detail_address}
                  onChange={hadnleChange}
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
                  value={marriageInfo.marriage_fixed_date}
                  name="marriage_fixed_date"
                  id="marriageFiexedOn"
                  label="বিয়ে ঠিক হয়েছে"
                  fullWidth
                  size="small"
                  type="date"
                  defaultValue="2021-12-27"
                  onChange={hadnleChange}
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
                  onChange={hadnleChange}
                  type="date"
                  defaultValue="2021-12-27"
                  value={marriageInfo.marriage_date}
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
                  onChange={hadnleChange}
                  value={marriageInfo.marriage_reg_date}
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
                onChange={hadnleChange}
                variant="outlined"
                type={"number"}
                value={marriageInfo.denmohor}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2.7}>
              <TextField
                required
                id="muajjol"
                name="muajjol"
                label="দেন মোহর মুয়াজ্জল"
                value={marriageInfo.muajjol}
                fullWidth
                size="small"
                autoComplete="given-name"
                onChange={hadnleChange}
                variant="outlined"
                type={"text"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2.7}>
              <TextField
                required
                id="mohorMoazzol"
                name="muajjil"
                onChange={hadnleChange}
                label="দেন মোহর মু'অজ্জিল"
                fullWidth
                size="small"
                autoComplete="given-name"
                variant="outlined"
                value={marriageInfo.muajjil}
                type={"text"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3.1}>
              <FormControl component="fieldset">
                {/* <FormLabel component="legend">লিঙ্গ</FormLabel> */}
                <RadioGroup
                  row
                  aria-label="gender"
                  name="controlled-radio-buttons-group"
                  size="small"
                  //   value={value}
                  //   onChange={handleChange}
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
                onChange={hadnleChange}
                value={marriageInfo.paid_denmohor_amount}
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
                      onClick={hadnleChange}
                      onChange={(e) => {
                        console.log("e", e.target.name);
                        console.log("e", e.target.value);
                        console.log(marriageInfo);

                        maritalStatusChangeHandler(e);
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
                {isDevorcy && (
                  <>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        name="divorce_con"
                        label="তালাক প্রাপ্ত হওয়ার শর্ত"
                        onChange={(e) => {
                          console.log("e", e.target.name);
                          setMarriageInfo({ ...marriageInfo });
                          hadnleChange(e);
                        }}
                        fullWidth
                        size="small"
                        type="text"
                        value={marriageInfo.divorce_con}
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
                          onChange={(e) => {
                            hadnleChange(e);
                          }}
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
                          onChange={(e) => {
                            hadnleChange(e);
                            husbandsRightRevokedChangeHandler(e);
                          }}
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
                          onChange={(e) => {
                            hadnleChange(e);
                            husbandsRightRevokedChangeHandler(e);
                          }}
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
                {isAlimonyGiven && (
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      name="alimony_con"
                      id="marriageDate"
                      label="খোরপোশের শর্ত"
                      fullWidth
                      size="small"
                      onChange={hadnleChange}
                      value={marriageInfo.alimony_con}
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
                      onClick={hadnleChange}
                      onChange={(e) => {
                        isHusbandPerfomDevorceChangeHandler(e);
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
                {isHusbandPerfomDevorce && (
                  <>
                    <Grid item sm={12} md={12} xs={12}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          aria-label="position"
                          name="userType"
                          defaultValue="top"
                          onChange={(e) => {
                            hadnleChange(e);
                            isHusbandTakenPermissonFromWifeHandler(e);
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
                {isHusbandTakenPrmissionFromCurrentWife &&
                  isHusbandPerfomDevorce && (
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
                      {/* <Grid item xs={12} sm={12} md={6}>
                        <TextField
                          id="marriageDate"
                          label="  অনুমতি নম্বর"
                          fullWidth
                          size="small"
                          type="number"
                          name="permission_no"
                          value={marriageInfo.permission_no}
                          onChange={hadnleChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Stack>
                          <TextField
                            onChange={hadnleChange}
                            value={marriageInfo.permission_date}
                            name="permission_date"
                            id="marriageDate"
                            label=" অনুমতি নেওয়ার তারিখ"
                            fullWidth
                            size="small"
                            type="date"
                            // defaultValue="mm-dd-yyyy"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Stack>
                      </Grid> */}
                    </>
                  )}
              </Grid>
            </Grid>
            {/* <Grid
              item
              xs={12}
              md={12}
              sm={12}
              mx={3}
              my={2}
              sx={{ textAlign: "center" }}
            >
              <Tooltip title="আগের পাতায়">
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mr: 1 }}
                  startIcon={<SaveIcon />}
                  onClick={onSubmitData}
                  // disabled={checkFormError()}
                >
                  &nbsp; জমা দিন
                </Button>
              </Tooltip>
            </Grid> */}
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default BasicMarriageInformation;
