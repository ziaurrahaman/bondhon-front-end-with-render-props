import React, { useState, useEffect } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FemaleIcon from "@mui/icons-material/Female";

import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import {
  Grid,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import Title from "../../shared/others/HeadTitle";

const BasicInformationComponent = ({
  handleDataType,
  onChange,
  onFetchNidData,
  formError,
  formatDateInString,
  brideGroomInfo,
  dataType,
}) => {
  return (
    <Grid sm={12} md={12}>
      <>
        <Title>
          <Typography variant="h6">মৌলিক তথ্য</Typography>
        </Title>

        <Grid container spacing={2.5} px={2} py={2}>
          <Grid item xs={12} md={4} sm={12}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="position"
                name="dataType"
                defaultValue="nid"
                onChange={handleDataType}
              >
                <FormControlLabel
                  name="nid"
                  value="nid"
                  control={<Radio color="primary" />}
                  label="জাতীয় পরিচয়পত্র"
                />
                <FormControlLabel
                  name="brn"
                  value="brn"
                  control={<Radio color="success" />}
                  label="জন্ম নিবন্ধন"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {dataType === "brn" ? (
            <>
              <Grid item xs={12} lg={4} sm={12} md={4}>
                <TextField
                  required
                  name="userBrn"
                  label="জন্ম নিবন্ধন নাম্বার"
                  fullWidth
                  size="small"
                  variant="outlined"
                  onChange={onChange}
                  value={brideGroomInfo.nid}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCardIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} lg={4} sm={12} md={4}>
                <TextField
                  required
                  name="nid"
                  label="জাতীয় পরিচয়পত্র নাম্বার"
                  fullWidth
                  size="small"
                  variant="outlined"
                  onChange={(e) => {
                    onChange(e, "B");
                  }}
                  onKeyUp={(e) => {
                    onFetchNidData(e, "B");
                  }}
                  value={brideGroomInfo.nid}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCardIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                {formError.nid.length > 0 && (
                  <span style={{ color: "red" }}>{formError.nid}</span>
                )}
              </Grid>
            </>
          )}

          <Grid item xs={12} md={4} sm={12}>
            <Stack>
              <TextField
                name="dob"
                id="date"
                // label="জন্ম তারিখ"
                label="জন্ম তারিখ"
                fullWidth
                size="small"
                type="date"
                onChange={(e) => {
                  onChange(e, "B");
                }}
                // defaultValue="2021-12-27"
                value={brideGroomInfo.dob}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: "1920-01-01",
                  max: formatDateInString(new Date()),
                }}
              />

              {formError.dob.length > 0 && (
                <span style={{ color: "red" }}>{formError.dob}</span>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} md={4} sm={12}>
            <TextField
              required
              id="userName"
              name="name"
              label="নাম"
              fullWidth
              size="small"
              variant="outlined"
              value={brideGroomInfo.name}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FemaleIcon />
                  </InputAdornment>
                ),
              }}
            />
            {formError.name.length > 0 && (
              <span style={{ color: "red" }}>{formError.name}</span>
            )}
          </Grid>

          <Grid item xs={12} md={4} sm={12}>
            <TextField
              required
              id="userMobile"
              name="mobile_no"
              label="মোবাইল নম্বর"
              fullWidth
              size="small"
              variant="outlined"
              value={brideGroomInfo.mobile_no}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MobileScreenShareIcon />
                  </InputAdornment>
                ),
              }}
            />
            {formError.mobile_no.length > 0 && (
              <span style={{ color: "red" }}>{formError.mobile_no}</span>
            )}
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <TextField
              id="email"
              name="email"
              label="ইমেইল"
              fullWidth
              size="small"
              variant="outlined"
              value={brideGroomInfo.email}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
            {formError.email.length > 0 && (
              <span style={{ color: "red" }}>{formError.email}</span>
            )}
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <TextField
              fullWidth
              label="ধর্ম"
              name="relegion"
              //onChange={handleChange}
              required
              select
              SelectProps={{ native: true }}
              //value={commInfo.committeeType}
              variant="outlined"
              size="small"
              value={brideGroomInfo.relegion}
              onChange={onChange}
            >
              {" "}
              <option>- নির্বাচন করুন -</option>
              <option value={10}>ইসলাম</option>
              <option value={20}>হিন্দু</option>
              <option value={20}>বৌদ্ধ</option>
              <option value={20}>খ্রিষ্টান</option>
            </TextField>
            {formError.relegion.length > 0 && (
              <span style={{ color: "red" }}>{formError.relegion}</span>
            )}
          </Grid>

          <Grid item xs={12} md={4} sm={12}>
            <TextField
              required
              name="father_name"
              label="পিতার নাম"
              type="text"
              fullWidth
              size="small"
              variant="outlined"
              value={brideGroomInfo.father_name}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
            {formError.father_name.length > 0 && (
              <span style={{ color: "red" }}>{formError.father_name}</span>
            )}
          </Grid>

          <Grid item xs={12} md={4} sm={12}>
            <TextField
              required
              name="mother_name"
              label="মাতার নাম"
              type="text"
              fullWidth
              size="small"
              variant="outlined"
              value={brideGroomInfo.mother_name}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
            {formError.mother_name.length > 0 && (
              <span style={{ color: "red" }}>{formError.mother_name}</span>
            )}
          </Grid>
        </Grid>
      </>
    </Grid>
  );
};
export default BasicInformationComponent;
