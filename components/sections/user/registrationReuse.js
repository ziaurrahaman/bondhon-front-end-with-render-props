import { React, useState } from "react";
import {
  Box,
  Grid,
  Avatar,
  Container,
  Paper,
  Typography,
  Divider,
  Tooltip,
  
  Button,
  Link,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import Basic from "../../shared/others/userBasic";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { useRouter } from "next/router";
import { userSignup } from "../../../url/ApiList";

// ------------ Copyright Components -------------
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="error" href="https://erainfotechbd.com/">
        ERA-InfoTech Ltd
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Registration = (props) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [nid, setNid] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [religion, setReligion] = useState("");
  const [userType, setUserType] = useState("");
  const [verify, setVerify] = useState("");
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");

  const allDataValue = (a) => {
    console.log("Values from child", a);

    if (a.userName != "") {
      setName(a.userName);
    }
    if (a.userNid != "") {
      setNid(a.userNid);
    }
    if (a.dateofBirth != "") {
      setDob(a.dateofBirth);
    }
    if (a.mobile != "") {
      setMobileNo(a.mobile);
    }
    if (a.email != "") {
      setEmail(a.email);
    }
    if (a.religion != "") {
      setReligion(a.religion);
    }
    if (a.userType != "") {
      setUserType(a.userType);
    }
    if (a.regNo != "") {
      setVerify(a.regNo);
    }
    if (a.loginName != "") {
      setLoginName(a.loginName);
    }
    if (a.password != "") {
      setPassword(a.password);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  let onSubmitData = async (e) => {
    e.preventDefault();

    let payload = {
      name: name,
      nid: nid,
      dob: formatDate(dob),
      mobile_no: mobileNo,
      email: email,
      religion: religion,
      user_type: userType,
      verify: verify,
      user_name: loginName,
      password: password,
      status: "N",
    };
    console.log("payload value after clicking", payload);
    try {
      // console.log("token", config);
      //const userData = await axios.post(userSignup, payload, config);
      //NotificationManager.success(userData.data.message, "Success", 5000);
      //router.push({ pathname: "/coop/income-expense" });
    } catch (error) {
      if (error.response) {
        let message = error.response.data.errors[0].message;
        NotificationManager.error(message, "Error", 5000);
      } else if (error.request) {
        NotificationManager.error("Error Connecting...", "Error", 5000);
      } else if (error) {
        NotificationManager.error(error.toString(), "Error", 5000);
      }
    }
  };
  return (
    <>
      <Container component="main">
        <Paper
          // variant="outlined"
          sx={{ my: { xs: 3, md: 8 }, p: { xs: 2, md: 3 } }}
          elevation={3}
          square
          style={{ marginTop: "8%" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ textAlign: "center", m: 1, bgcolor: "secondary.main" }}
            >
              <ThumbsUpDownIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {props.title}
            </Typography>
          </Box>
          <br />

          <Grid sm={12} md={12} xs={12} spacing={2} pb={2}>
            <Grid sm={12} md={12}>
              <Basic title={"মৌলিক তথ্য"} allData={allDataValue} />
            </Grid>
          </Grid>
          <Divider />
          <Grid
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
              >
                &nbsp; জমা দিন
              </Button>
            </Tooltip>
          </Grid>
        </Paper>
        <Copyright />
      </Container>
    </>
  );
};

export default Registration;
