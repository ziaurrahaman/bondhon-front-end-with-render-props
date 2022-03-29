import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Title from "./Title";
import userInput from "../../hooks/userInput";
import MaleIcon from "@mui/icons-material/Male";
import InputAdornment from "@mui/material/InputAdornment";

const Address = (props) => {
  const [addressType, setAddressType] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [union, setUnion] = useState("");

  const handleAddTypeChange = (event) => {
    setAddressType(event.target.value);
  };

  const handleDivisionChange = (event) => {
    setDivision(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleUpazilaChange = (event) => {
    setUpazila(event.target.value);
  };

  const handleUnionChange = (event) => {
    setUnion(event.target.value);
  };

  const {
    value: selectedAddressType,
    hasError: addressTypeInputHasError,
    isValid: enteredAddressTypeIsValid,
    valueChangeHandler: enteredAddressTypeChangeHandler,
    inputBlurHandler: addressInputOnBlurHandler,
    reset: addressTtypeInputReset,
  } = userInput((value) => value.trim() !== "");
  const {
    value: enteredHouseRoadVillage,
    hasError: houseRoadVillageInputHasError,
    isValid: enteredHouseRoadVillageIsValid,
    valueChangeHandler: enteredHouseRoadVillageChangeHandler,
    inputBlurHandler: houseRoadVillageInputOnBlurHandler,
    reset: houseRoadVillageInputReset,
  } = userInput((value) => value.trim() !== "");
  const {
    value: selectedDistrict,
    hasError: districtInputHasError,
    isValid: enteredDistrictIsValid,
    valueChangeHandler: enteredDistrictChangeHandler,
    inputBlurHandler: districtInputOnBlurHandler,
    reset: districtInputReset,
  } = userInput((value) => value.trim() !== "");
  const {
    value: selectedUpazila,
    hasError: upazilaInputHasError,
    isValid: enteredUpazilaIsValid,
    valueChangeHandler: enteredUpazilaChangeHandler,
    inputBlurHandler: upazilaInputOnBlurHandler,
    reset: upazilaInputReset,
  } = userInput((value) => value.trim() !== "");
  const {
    value: selectedUnionWord,
    hasError: unionWordInputHasError,
    isValid: enteredUnionWordIsValid,
    valueChangeHandler: enteredUnionWordChangeHandler,
    inputBlurHandler: unionWordInputOnBlurHandler,
    reset: unionWordInputReset,
  } = userInput((value) => value.trim() !== "");
  const {
    value: selectedPostOffice,
    hasError: postOfficeInputHasError,
    isValid: enteredPostOfficeIsValid,
    valueChangeHandler: enteredPostOfficeChangeHandler,
    inputBlurHandler: postOfficeInputOnBlurHandler,
    reset: postOfficeInputReset,
  } = userInput((value) => value.trim() !== "");

  return (
    <>
      <Title>
        <Typography variant="h6">{props.title}</Typography>
      </Title>
      <Grid container spacing={3} px={2}>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            fullWidth
            label="ঠিকানার ধরন"
            name="addressType"
            //onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            //value={commInfo.committeeType}
            variant="outlined"
            size="small"
            value={selectedAddressType}
            onChange={enteredAddressTypeChangeHandler}
            onBlur={addressInputOnBlurHandler}
          >
            {" "}
            <option>- নির্বাচন করুন -</option>
            <option value={10}>বর্তমান ঠিকানা</option>
            <option value={20}>স্থায়ী ঠিকানা</option>
          </TextField>
          {addressTypeInputHasError && (
            <span style={{ color: "red" }}>ঠিকানার ধরণ নির্ধারণ করুন</span>
          )}
          
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            fullWidth
            label="জেলা"
            name="district"
            //onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            //value={commInfo.committeeType}
            variant="outlined"
            size="small"
            value={selectedDistrict}
            onChange={enteredDistrictChangeHandler}
            onBlur={districtInputOnBlurHandler}
          >
            {" "}
            <option>- নির্বাচন করুন -</option>
            <option value={10}>ঢাকা</option>
            <option value={20}>মুন্সীগঞ্জ</option>
          </TextField>
          {districtInputHasError && (
            <span style={{ color: "red" }}>জেলা নির্ধারণ করুন</span>
          )}
          
        </Grid>

        <Grid item xs={12} md={4} sm={12}>
          <TextField
            fullWidth
            label="উপজেলা/থানা"
            name="upazila"
            //onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            //value={commInfo.committeeType}
            variant="outlined"
            size="small"
            value={selectedUpazila}
            onChange={enteredUpazilaChangeHandler}
            onBlur={upazilaInputOnBlurHandler}
          >
            {" "}
            <option>- নির্বাচন করুন -</option>
            <option value={10}>মিরপুর</option>
            <option value={20}>তুরাগ</option>
          </TextField>
          {upazilaInputHasError && (
            <span style={{ color: "red" }}>উপজেলা/থানা নির্ধারণ করুন</span>
          )}
          
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          

          <TextField
            fullWidth
            label="ইউনিয়ন/ওয়ার্ড"
            name="unionWord"
            //onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            //value={commInfo.committeeType}
            variant="outlined"
            size="small"
            value={selectedUnionWord}
            onChange={enteredUnionWordChangeHandler}
            onBlur={unionWordInputOnBlurHandler}
          >
            {" "}
            <option>- নির্বাচন করুন -</option>
            <option value={10}>ওয়ার্ড-3</option>
            <option value={20}>ওয়ার্ড-9</option>
          </TextField>
          {unionWordInputHasError && (
            <span style={{ color: "red" }}>ইউনিয়ন/ওয়ার্ড</span>
          )}
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            fullWidth
            label="পোস্ট অফিস"
            name="postOffice"
            //onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            //value={commInfo.committeeType}
            variant="outlined"
            size="small"
            value={selectedPostOffice}
            onChange={enteredPostOfficeChangeHandler}
            onBlur={postOfficeInputOnBlurHandler}
          >
            {" "}
            <option>- নির্বাচন করুন -</option>
            <option value={10}>1216</option>
            <option value={20}>1000</option>
          </TextField>
          {postOfficeInputHasError && (
            <span style={{ color: "red" }}>পোস্ট অফিস নির্ধারণ করুন</span>
          )}
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            required
            id="houseRoadVillage"
            name="houseRoadVillage"
            label="বাড়ি নং, রাস্তা নং, গ্রাম/মহল্লা লিখুন"
            fullWidth
            size="small"
            variant="outlined"
            value={enteredHouseRoadVillage}
            onChange={enteredHouseRoadVillageChangeHandler}
            onBlur={houseRoadVillageInputOnBlurHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MaleIcon />
                </InputAdornment>
              ),
            }}
          />
          {houseRoadVillageInputHasError && (
            <span style={{ color: "red" }}>
              বাড়ি নং, রাস্তা নং, গ্রাম/মহল্লা লিখুন
            </span>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Address;
