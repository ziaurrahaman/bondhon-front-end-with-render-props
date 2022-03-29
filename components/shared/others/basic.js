import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InputAdornment from "@mui/material/InputAdornment";
import MaleIcon from "@mui/icons-material/Male";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import userInput from "../../hooks/userInput";

const Basic = (props) => {
  const [citizen, setCitizen] = useState({
    userNid : '',
    userName : '',
    date : '',
    userMobile : '',
    email : '',
    religion : '',
  });

  const [religion, setReligion] = useState("");

  const handleChange = (event) => {
    setReligion(event.target.value);
  };

  const {
    value: enteredNid,
    hasError: nidInputHasError,
    isValid: enteredNidIsValid,
    valueChangeHandler: nidInputChangeHandler,
    inputBlurHandler: nidInputBlurHandler,
    reset: resetNidInput,
  } = userInput(
    (value) =>
      value.trim() !== "" &&
      (value.length === 10 || value.length === 13 || value.length === 17)
  );
  const {
    value: enteredFathersNid,
    hasError: fathersNidInputHasError,
    isValid: fathersNidIsValid,
    valueChangeHandler: fathersNidInputChangeHandler,
    inputBlurHandler: fathersNidInputBlurHandler,
    reset: resetFathersNidInput,
  } = userInput(
    (value) =>
      value.trim() !== "" &&
      (value.length === 10 || value.length === 13 || value.length === 17)
  );

  const {
    value: enteredMothersNid,
    hasError: mothersNidInputHasError,
    isValid: mothersNidIsValid,
    valueChangeHandler: mothersNidInputChangeHandler,
    inputBlurHandler: mothersNidInputBlurHandler,
    reset: resetMothersNidInput,
  } = userInput(
    (value) =>
      value.trim() !== "" &&
      (value.length === 10 || value.length === 13 || value.length === 17)
  );

  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    valueChangeHandler: enteredNameChangeHandler,
    inputBlurHandler: nameInputOnBlurHandler,
    reset: nameInputReset,
  } = userInput((value) => value.trim() !== "");

  const {
    value: enteredFathersName,
    hasError: fathersNameInputHasError,
    isValid: enteredFathersNameIsValid,
    valueChangeHandler: enteredFathersNameChangeHandler,
    inputBlurHandler: fathersNameInputOnBlurHandler,
    reset: fathersNameInputReset,
  } = userInput((value) => value.trim() !== "");

  const {
    value: enteredMothersName,
    hasError: mothersNameInputHasError,
    isValid: enteredMothersNameIsValid,
    valueChangeHandler: enteredMothersNameChangeHandler,
    inputBlurHandler: mothersNameInputOnBlurHandler,
    reset: mothersNameInputReset,
  } = userInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: enteredEmailChangeHandler,
    inputBlurHandler: emailInputOnBlurHandler,
    reset: emailInputReset,
  } = userInput(
    (value) =>
      value.trim() !== "" &&
      RegExp(
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      ).test(value) === true
  );

  const {
    value: enteredDob,
    hasError: dobInputHasError,
    isValid: enteredDobIsValid,
    valueChangeHandler: enteredDobChangeHandler,
    inputBlurHandler: dobInputOnBlurHandler,
    reset: dobInputReset,
  } = userInput((value) => value.trim() !== "");

  const {
    value: enteredReligion,
    hasError: religionInputHasError,
    isValid: enteredReligionIsValid,
    valueChangeHandler: enteredReligionChangeHandler,
    inputBlurHandler: religionInputOnBlurHandler,
    reset: religionInputReset,
  } = userInput((value) => value.trim() !== "");

  const {
    value: enteredMobileNumber,
    hasError: mobileInputHasError,
    isValid: enteredMobileIsValid,
    valueChangeHandler: mobileInputChangeHandler,
    inputBlurHandler: mobileInputOnBlurHandler,
    reset: mobileInputReset,
  } = userInput(
    (value) =>
      value.trim() !== "" &&
      RegExp(/(^(01){1}[3456789]{1}(\d){8})$/).test(value) === true
  );

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    isValid: enteredPasswordIsValid,
    valueChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputOnBlurHandler,
    reset: passwordInputReset,
  } = userInput((value) => value.trim() !== "" && value.length >= 5);
  const {
    value: enteredConfirmPassword,
    hasError: confirmPasswordInputHasError,
    isValid: confirmPasswordIsValid,
    valueChangeHandler: confirmPasswordInputChangeHandler,
    inputBlurHandler: confirmPasswordInputOnBlurHandler,
    reset: confirmPasswordInputReset,
  } = userInput((value) => value.trim() !== "" && value === enteredPassword);

  return (
    <>
      <Title>
        <Typography variant="h6">{props.title}</Typography>
      </Title>

      <Grid container spacing={2.5} px={2}>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            required
            id="userNid"
            name="userNid"
            label="জাতীয় আইডি নম্বর"
            fullWidth
            size="small"
            variant="outlined"
            value={enteredNid}
            onChange={nidInputChangeHandler}
            onBlur={nidInputBlurHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
          />
          {nidInputHasError && (
            <span style={{ color: "red" }}>
              প্রদত্ত জাতীয় আইডি নম্বর সঠিক নয়
            </span>
          )}
        </Grid>

        <Grid item xs={12} md={6} sm={12}>
          <TextField
            required
            id="userName"
            name="userName"
            label="নাম"
            fullWidth
            size="small"
            variant="outlined"
            value={enteredName}
            onChange={enteredNameChangeHandler}
            onBlur={nameInputOnBlurHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MaleIcon />
                </InputAdornment>
              ),
            }}
          />
          {nameInputHasError && (
            <span style={{ color: "red" }}>আপনার নাম দিন</span>
          )}
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Stack>
            <TextField
              id="date"
              label="জন্ম তারিখ"
              fullWidth
              size="small"
              type="date"
              onChange={enteredDobChangeHandler}
              onBlur={dobInputOnBlurHandler}
              // defaultValue="2021-12-27"
              value={enteredDob}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {dobInputHasError && (
              <span style={{ color: "red" }}>আপনার জন্ম তারিখ দিন</span>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            required
            id="userMobile"
            name="userMobile"
            label="মোবাইল নম্বর"
            fullWidth
            size="small"
            variant="outlined"
            value={enteredMobileNumber}
            onChange={mobileInputChangeHandler}
            onBlur={mobileInputOnBlurHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MobileScreenShareIcon />
                </InputAdornment>
              ),
            }}
          />
          {mobileInputHasError && (
            <span style={{ color: "red" }}>
              আপনার দেওয়া মোবাইল নম্বরটি সঠিক নয়
            </span>
          )}
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            required
            id="email"
            name="email"
            label="ইমেইল"
            fullWidth
            size="small"
            variant="outlined"
            value={enteredEmail}
            onChange={enteredEmailChangeHandler}
            onBlur={emailInputOnBlurHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
          {emailInputHasError && (
            <span style={{ color: "red" }}>প্রদত্ত ইমেইল সঠিক নয়</span>
          )}
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            fullWidth
            label="ধর্ম"
            name="religion"
            //onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            //value={commInfo.committeeType}
            variant="outlined"
            size="small"
            value={enteredReligion}
            onChange={enteredReligionChangeHandler}
            onBlur={religionInputOnBlurHandler}
          >
            {" "}
            <option>- নির্বাচন করুন -</option>
            <option value={10}>ইসলাম</option>
            <option value={20}>হিন্দু</option>
            <option value={20}>বৌদ্ধ</option>
            <option value={20}>খ্রিষ্টান</option>
          </TextField>
          {religionInputHasError && (
            <span style={{ color: "red" }}>আপনার ধর্ম নির্বাচন করুন</span>
          )}
        </Grid>

        <Grid item xs={12} md={4} sm={12}>
          <TextField
            required
            name="fathersName"
            label="পিতার নাম"
            type="text"
            fullWidth
            size="small"
            variant="outlined"
            value={enteredFathersName}
            onChange={enteredFathersNameChangeHandler}
            onBlur={fathersNameInputOnBlurHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
          {fathersNameInputHasError && (
            <span style={{ color: "red" }}>আপনার পিতার নাম দিন</span>
          )}
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            required
            id="fathersNid"
            name="fathersNid"
            label="পিতার জাতীয় আইডি নম্বর"
            fullWidth
            size="small"
            variant="outlined"
            value={enteredFathersNid}
            onChange={fathersNidInputChangeHandler}
            onBlur={fathersNidInputBlurHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
          />
          {fathersNidInputHasError && (
            <span style={{ color: "red" }}>
              প্রদত্ত জাতীয় আইডি নম্বর সঠিক নয়
            </span>
          )}
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            required
            name="mothersName"
            label="মাতার নাম"
            type="text"
            fullWidth
            size="small"
            variant="outlined"
            value={enteredMothersName}
            onChange={enteredMothersNameChangeHandler}
            onBlur={mothersNameInputOnBlurHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
          {mothersNameInputHasError && (
            <span style={{ color: "red" }}>আপনার পিতার নাম দিন</span>
          )}
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            required
            id="mothersNid"
            name="mothersNid"
            label="মাতার জাতীয় আইডি নম্বর"
            fullWidth
            size="small"
            variant="outlined"
            value={enteredMothersNid}
            onChange={mothersNidInputChangeHandler}
            onBlur={mothersNidInputBlurHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
          />
          {mothersNidInputHasError && (
            <span style={{ color: "red" }}>
              প্রদত্ত জাতীয় আইডি নম্বর সঠিক নয়
            </span>
          )}
        </Grid>
        {props.type === "user" && (
          <>
            <Grid item xs={12} md={4} sm={12}>
              <TextField
                required
                id="pass"
                name="pass"
                label="পাসওয়ার্ড"
                type="password"
                fullWidth
                size="small"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4} sm={12}>
              <TextField
                required
                id="confirmpass"
                name="confirmpass"
                label="পাসওয়ার্ড নিশ্চিত করুন"
                type="password"
                fullWidth
                size="small"
                variant="outlined"
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Basic;
