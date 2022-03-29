import { React, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InputAdornment from "@mui/material/InputAdornment";
import MaleIcon from "@mui/icons-material/Male";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import userInput from "../../../components/hooks/userInput";

const emailRegex = RegExp(
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
);
const mobileRegex = RegExp(/(^(01){1}[3456789]{1}(\d){8})$/);

const UserBasic = (props) => {
  const { allData } = props;

  const [userType, setUserType] = useState("");
  const [religionType, setReligionType] = useState("");
  const [dobvalue, setDobValue] = useState("");
  const [citizen, setCitizen] = useState({
    userNid: "",
    userName: "",
    dateofBirth: "",
    mobile: "",
    email: "",
    religion: "",
    userType: "",
    regNo: "",
    loginName: "",
    password: "",
    confirmpassword: "",
  });

  allData({
    userNid: citizen.userNid,
    userName: citizen.userName,
    dateofBirth: dobvalue,
    mobile: citizen.mobile,
    email: citizen.email,
    religion: religionType,
    userType: userType,
    regNo: citizen.regNo,
    loginName: citizen.loginName,
    password: citizen.password,
  });

  const [formErrors, setFormErrors] = useState({
    userNid: "",
    userName: "",
    mobile: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "userNid":
        formErrors.value =
          value.length == 13 ||
          value.length == 10 ||
          value.length == 17 ||
          value.length == 0
            ? ""
            : "আপনার সঠিক এনআইডি প্রদান করুন";
        break;
      case "userName":
        formErrors.userName =
          value.length < 6 && value.length > 0
            ? "সর্বনিন্ম ৬টি অক্ষর প্রদান"
            : "";
        break;
      case "email":
        formErrors.email =
          emailRegex.test(value) || value.length == 0
            ? ""
            : "আপনার সঠিক ইমেইল প্রদান করুন";
        break;
      case "mobile":
        setCitizen({
          ...citizen,
          [e.target.name]: e.target.value.replace(/\D/g, ""),
        });

        formErrors.mobile =
          mobileRegex.test(value) || value.length == 0
            ? ""
            : "আপনার সঠিক মোবাইল নং প্রদান করুন";
        break;
    }
    if (e.target.name != "mobile") {
      setCitizen({
        ...citizen,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUserType = (event) => {
    setUserType(event.target.value);
  };

  const handleReligion = (event) => {
    setReligionType(event.target.value);
  };

  return (
    <>
      <Title>
        <Typography variant="h6">{props.title}</Typography>
      </Title>

      <Grid container spacing={2.5} px={2}>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            required
            name="userNid"
            label="জাতীয় আইডি নম্বর"
            fullWidth
            size="small"
            variant="outlined"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            required
            name="userName"
            label="নাম"
            fullWidth
            size="small"
            variant="outlined"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MaleIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="জন্ম তারিখ"
              name="dateofBirth"
              value={dobvalue}
              required
              onChange={(newValue) => {
                setDobValue(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  style={{ backgroundColor: "#FFF" }}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            required
            name="mobile"
            label="মোবাইল নম্বর"
            fullWidth
            size="small"
            variant="outlined"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MobileScreenShareIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            required
            name="email"
            label="ইমেইল"
            fullWidth
            size="small"
            variant="outlined"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            fullWidth
            label="ধর্ম"
            name="religion"
            required
            select
            SelectProps={{ native: true }}
            variant="outlined"
            size="small"
            onChange={handleReligion}
          >
            <option>- নির্বাচন করুন -</option>
            <option value={10}>ইসলাম</option>
            <option value={20}>হিন্দু</option>
            <option value={20}>বৌদ্ধ</option>
            <option value={20}>খ্রিষ্টান</option>
          </TextField>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              name="userType"
              defaultValue="top"
              onChange={handleUserType}
            >
              <FormControlLabel
                value="groom"
                control={<Radio color="primary" />}
                label="বর"
              />
              <FormControlLabel
                value="bride"
                control={<Radio color="success" />}
                label="কনে"
              />
              <FormControlLabel
                value="kazi"
                control={<Radio color="secondary" />}
                label="কাজী"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {userType == "kazi" ? (
          <>
            <Grid item xs={12} md={4} sm={12}>
              <TextField
                required
                name="regNo"
                label="নিবন্ধন নং"
                onChange={handleChange}
                type="number"
                fullWidth
                size="small"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AppRegistrationIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </>
        ) : (
          ""
        )}
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            required
            name="loginName"
            label="ইউজার নাম"
            type="text"
            fullWidth
            size="small"
            variant="outlined"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            required
            name="password"
            label="পাসওয়ার্ড"
            type="password"
            fullWidth
            size="small"
            variant="outlined"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            required
            name="confirmpassword"
            label="পাসওয়ার্ড নিশ্চিত করুন"
            type="password"
            fullWidth
            size="small"
            variant="outlined"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpenIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default UserBasic;
