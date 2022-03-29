import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Title from "./HeadTitle";

const AddressNew = (props) => {
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
  // district_id: "",
  // upazila_id: "",
  // union_id: "",
  // post_code: "",
  // detail_address: "",

  return (
    <>
      <Title>
        <Typography variant="h6">{props.title}</Typography>
      </Title>
      <Grid container spacing={3} px={2}>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            fullWidth
            label="জেলা"
            name="district_id"
            value={props.mInfo}
            //onChange={handleChange}
            onChange={(e) => {
              props.onChange(e);
            }}
            required
            select
            SelectProps={{ native: true }}
            //value={commInfo.committeeType}
            variant="outlined"
            size="small"
          >
            {" "}
            <option>- নির্বাচন করুন -</option>
            <option value={10}>ঢাকা</option>
            <option value={20}>মুন্সীগঞ্জ</option>
          </TextField>
        </Grid>

        <Grid item xs={12} md={4} sm={12}>
          <TextField
            fullWidth
            label="উপজেলা/থানা"
            name="upazila_id"
            //onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            //value={commInfo.committeeType}
            variant="outlined"
            size="small"
          >
            {" "}
            <option>- নির্বাচন করুন -</option>
            <option value={10}>মিরপুর</option>
            <option value={20}>তুরাগ</option>
          </TextField>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            fullWidth
            label="ইউনিয়ন/ওয়ার্ড"
            name="union_id"
            //onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            //value={commInfo.committeeType}
            variant="outlined"
            size="small"
          >
            {" "}
            <option>- নির্বাচন করুন -</option>
            <option value={10}>ওয়ার্ড-3</option>
            <option value={20}>ওয়ার্ড-9</option>
          </TextField>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            fullWidth
            label="পোস্ট অফিস"
            name="post_code"
            //onChange={handleChange}

            required
            select
            SelectProps={{ native: true }}
            //value={commInfo.committeeType}
            variant="outlined"
            size="small"
          >
            {" "}
            <option>- নির্বাচন করুন -</option>
            <option value={10}>1216</option>
            <option value={20}>1000</option>
          </TextField>
        </Grid>
        <Grid item xs={12} md={8} sm={12}>
          <TextField
            required
            id="village"
            name="detail_address"
            type="text"
            label="বাড়ি নং, রাস্তা নং, গ্রাম/মহল্লা লিখুন"
            fullWidth
            size="small"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressNew;
