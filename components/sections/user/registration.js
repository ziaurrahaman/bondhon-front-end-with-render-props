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
  TextField,
  InputAdornment,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MaleIcon from "@mui/icons-material/Male";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SaveIcon from "@mui/icons-material/Save";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Title from "../../shared/others/HeadTitle";
import axios from "axios";
import Image from "next/image";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { deepOrange, green, blue } from "@mui/material/colors";
import { useRouter } from "next/router";
import { userSignup, nidServerGetDataUrl } from "../../../url/ApiList";
import { NotificationManager } from "react-notifications";

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

const emailRegex = RegExp(
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
);
const mobileRegex = RegExp(/(^(01){1}[3456789]{1}(\d){8})$/);

const Registration = (props) => {
  const router = useRouter();
  const [dataType, setDataType] = useState("");
  const [userType, setUserType] = useState("");
  const [religionType, setReligionType] = useState("");
  const [dobvalue, setDobValue] = useState("");
  // const [brideType, setBrideType] = useState("");
  // const [groomType, setGroomType] = useState("");
  // const [kaziType, setKaziType] = useState("");

  //----- Groom, bride, kazi selection
  const [groomCheck, setGroomCheck] = useState("N");
  const [brideCheck, setBrideCheck] = useState("N");
  const [kaziCheck, setKaziCheck] = useState("N");

  const [nidDataFatch, setNidDataFatch] = useState();
  console.log("roleType", userType);
  const handleGroomType = (event) => {
    setCitizen({
      dataType: "",
      userNid: "",
      userBrn: "",
      dateofBirth: "",
      mobile: "",
      email: "",
      religion: "নির্বাচন করুন",

      regNo: 0,
      name: "",

      userType: "",
    });
    setFormErrors({
      dataType: "",
      userNid: "",
      userBrn: "",
      userName: "",
      mobile: "",
      email: "",
      dob: "",
      loginName: "",
      religion: "",
      userType: "",
      verify: "",
    });
    setUserType("G");
    setGroomCheck("Y");
    setBrideCheck("N");
    setKaziCheck("N");
    console.log("GroomType", userType);
  };
  const handleBrideType = (event) => {
    setCitizen({
      dataType: "",
      userNid: "",
      userBrn: "",
      dateofBirth: "",
      mobile: "",
      email: "",
      religion: "নির্বাচন করুন",

      regNo: 0,
      name: "",

      userType: "",
    });
    setFormErrors({
      dataType: "",
      userNid: "",
      userBrn: "",
      userName: "",
      mobile: "",
      email: "",
      dob: "",
      loginName: "",
      religion: "",
      userType: "",
      verify: "",
    });
    setUserType("B");
    setGroomCheck("N");
    setBrideCheck("Y");
    setKaziCheck("N");
    console.log("BrideType", userType);
  };
  const handleKaziType = (event) => {
    setCitizen({
      dataType: "",
      userNid: "",
      userBrn: "",
      dateofBirth: "",
      mobile: "",
      email: "",
      religion: "নির্বাচন করুন",

      regNo: 0,
      name: "",

      userType: "",
    });
    setFormErrors({
      dataType: "",
      userNid: "",
      userBrn: "",
      userName: "",
      mobile: "",
      email: "",
      dob: "",
      loginName: "",
      religion: "",
      userType: "",
      verify: "",
    });
    setUserType("K");
    setDataType("");
    setGroomCheck("N");
    setBrideCheck("N");
    setKaziCheck("Y");
    console.log("GroomType", userType);
  };

  // const [initData, setInitData] = useState(false);
  // const [kaziData, setKaziData] = useState("");
  // const [koneData, setKoneData] = useState("");
  // const [borData, setBorData] = useState("");
  const [citizen, setCitizen] = useState({
    dataType: "",
    userNid: "",
    userBrn: "",
    dateofBirth: "",
    mobile: "",
    email: "",
    religion: "",
    userType: "",
    regNo: 0,
    name: "",
  });

  const [formErrors, setFormErrors] = useState({
    dataType: "",
    userNid: "",
    userBrn: "",
    userName: "",
    mobile: "",
    email: "",
    dob: "",
    loginName: "",
    religion: "",
    userType: "",
    verify: "",
  });
  function getAge(birthDate) {
    var dob = new Date(birthDate);

    var today = new Date();
    var age = today.getFullYear() - dob.getFullYear();

    var m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    console.log("validAge", age);
    return age;
  }

  let checkFormError = () => {
    console.log(`formError:${formErrors}`);
    let flag = false;
    for (const key in formErrors) {
      if (formErrors[key].length > 0) {
        flag = true;
      }
    }
    return flag;
  };

  function formatDateInString(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  function formatDateInString(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const onFetchNidServerData = async (e) => {
    // if (e.key === "Enter") {
    if (citizen.userNid !== "" && citizen.dateofBirth) {
      try {
        const nidServerData = await axios.get(
          nidServerGetDataUrl +
            "/" +
            citizen.userNid +
            "/" +
            citizen.dateofBirth
        );
        if (nidServerData) {
          setCitizen({
            ...citizen,
            userNid: nidServerData.data.data.nid
              ? nidServerData.data.data.nid
              : nidServerData.data.data.citizen_doc_no,

            dateofBirth: formatDateInString(
              nidServerData.data.data.dob
                ? nidServerData.data.data.dob
                : nidServerData.data.data.citizen_dob
            ),
            religion: "নির্বাচন করুন",
            name: nidServerData.data.data.nameEn
              ? nidServerData.data.data.nameEn
              : nidServerData.data.data.citizen_name,
          });
        }
        console.log("nidserverdata", nidServerData);
      } catch (error) {
        console.log("nidServerError", error);
      }
    }
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "userBrn":
        setCitizen({
          ...citizen,
          [e.target.name]: e.target.value,
        });
        formErrors.userNid =
          value.length == 10 || value.length == 17
            ? ""
            : "আপনার সঠিক জন্ম নিবন্ধন প্রদান করুন";
        break;
      case "userNid":
        setCitizen({
          ...citizen,
          [e.target.name]: e.target.value,
        });
        formErrors.userNid =
          value.length == 10 || value.length == 17
            ? ""
            : "আপনার সঠিক এনআইডি প্রদান করুন";
        break;
      case "name":
        setCitizen({
          ...citizen,
          [e.target.name]: e.target.value,
        });
        formErrors.userName =
          value.length < 6 && value.length > 0
            ? "সর্বনিন্ম ৬টি অক্ষর প্রদান"
            : "";
        break;
      case "email":
        setCitizen({
          ...citizen,
          [e.target.name]: e.target.value,
        });
        formErrors.email =
          emailRegex.test(value) || value.length == 0
            ? ""
            : "আপনার সঠিক ইমেইল প্রদান করুন";
        break;
      case "mobile":
        setCitizen({
          ...citizen,
          [e.target.name]: e.target.value,
        });
        // setCitizen({
        //   ...citizen,
        //   [e.target.name]: e.target.value.replace(/\D/g, ""),
        // });

        formErrors.mobile =
          mobileRegex.test(value) || value.length == 0
            ? ""
            : "আপনার সঠিক মোবাইল নং প্রদান করুন";
        break;

      case "dateofBirth":
        setCitizen({
          ...citizen,
          [e.target.name]: e.target.value,
        });
        onFetchNidServerData(e);
        console.log("UserType", userType);
        const age = getAge(e.target.value);
        if (userType === "G") {
          formErrors.dob = age < 21 && "বরের বয়স ২১ বছর হতে হবে";
        } else if (userType === "B") {
          formErrors.dob = age < 18 && "কনের বয়স ১৮ বছর হতে হবে";
        } else if (userType === "K") {
          formErrors.dob = age < 18 && "কাজীর বয়স ১৮ বছর হতে হবে";
        }

        break;

      case "religion":
        console.log("namename", name);
        console.log("valuevalue", value);
        setCitizen({
          ...citizen,
          [e.target.name]: e.target.value,
        });
        formErrors.religion = value === "" && "ধর্ম নির্বাচন করুন";
        break;
      case "userType":
        setCitizen({
          ...citizen,
          [e.target.name]: e.target.value,
        });
        formErrors.userType = value === "" && "ইউসার এর ধরণ নির্বাচন করুন";
        break;
      case "regNo":
        setCitizen({
          ...citizen,
          [e.target.name]: e.target.value,
        });
        formErrors.verify = value === "" && "রেজিস্ট্রেশন নম্বর প্রদান করুন";
        break;
    }
    // if (e.target.name != "mobile") {
    //   setCitizen({
    //     ...citizen,
    //     [e.target.name]: e.target.value,
    //   });
    // }
  };
  // const handleDataBor = () => {
  //   setBorData("bor");
  // };

  // const handleDataKone = () => {
  //   setBorData("kone");
  // };

  // const handleDataKazi = () => {
  //   setBorData("kazi");
  // };
  const handleDataType = (event) => {
    setCitizen({
      dataType: "",
      userNid: "",
      userBrn: "",
      dateofBirth: "",
      mobile: "",
      email: "",
      religion: "নির্বাচন করুন",

      regNo: 0,
      name: "",

      userType: "",
    });
    setFormErrors({
      dataType: "",
      userNid: "",
      userBrn: "",
      userName: "",
      mobile: "",
      email: "",
      dob: "",
      loginName: "",
      religion: "",
      userType: "",
      verify: "",
    });
    setDataType(event.target.value);
  };

  // const handleUserType = (event) => {
  //   console.log("userType", event.target);
  //   setUserType(event);
  // };

  // const handleReligion = (event) => {
  //   setReligionType(event.target.value);
  // };

  // const formatDate = (event) => {
  //   setDobValue(event.target.value);
  // };
  const handelNibondhon = async (event) => {
    // setNidDataFatch(event.target.value);

    // event.key === "Enter"
    if (event.key === "Enter") {
      // setUserType("groom");
    }
  };

  let onSubmitData = async (e) => {
    // console.log(`formErrro: ${formErrors}`);
    e.preventDefault();
    //   {
    //     "citizenInfo":{

    //     "citizen_doc_type":"NID",
    //     "citizen_doc_no":1234567891 ,
    //     "citizen_name":"shojol" ,
    //     "citizen_dob":"2022-5-5" ,
    //     "citizen_mobile":"01679714001" ,
    //     "citizen_email":"ziaurshojol@gmail.com" ,
    //     "citizen_religion" :"islam",
    //     "citizen_father_name":"male" ,
    //     "citizen_father_nid" :8547855214,
    //   "citizen_mother_name" :"female",
    //     "citizen_mother_nid": 656511115155},
    //     "userInfo":{
    //         "user_role":"Groom",
    //         "kazi_citizen_id":123456,
    //         "status":"Unmarried"

    //     }

    // }
    let payload = {
      citizenInfo: {
        citizen_doc_type: citizen.userType,
        citizen_doc_no: citizen.userNid,
        citizen_name: citizen.name,
        citizen_dob: citizen.dateofBirth,
        citizen_mobile: citizen.mobile,
        citizen_email: citizen.email,
        citizen_religion: citizen.religion,
        citizen_father_name: null,
        citizen_father_nid: null,
        citizen_mother_name: null,
        citizen_mother_nid: null,
      },
      userInfo: {
        user_role: userType,
        kazi_citizen_id: citizen.regNo,
        status: "Unmarried",
      },
    };
    // name: citizen.userName,
    // nid: citizen.userNid,
    // dob: dobvalue,
    // mobile_no: citizen.mobile,
    // email: citizen.email,
    // religion: religionType,
    // user_type: userType,
    // verify: citizen.regNo,
    // status: "N",

    console.log("payload value after clicking", payload);
    try {
      // console.log("token", config);
      const userData = await axios.post(userSignup, payload);

      // console.log("pay", userData.data.message);
      // console.log("Status", typeof userData.status);
      if (userData.status === 201) {
        console.log("In If");
        router.push("./");
      }
      //userData.data.message
      NotificationManager.success(
        "নিবন্ধন সফলভাবে সম্পন্ন হয়েছে",
        "Success",
        5000
      );

      //router.push({ pathname: "/coop/income-expense" });
    } catch (error) {
      if (error.response) {
        let message = error.response.data.errors[0].message;
        NotificationManager.error(message, "সংযোগ ত্রুটি পাওয়া গেছে..", 5000);
      } else if (error.request) {
        NotificationManager.error("সংযোগ ত্রুটি পাওয়া গেছে..", "Error", 5000);
      } else if (error) {
        NotificationManager.error(error.toString(), "Error", 5000);
      }
    }
  };
  const printValue = (e) => {
    console.log("sellectedDate", e);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
          backgroundColor: "#fedcac",
          backgroundImage: "url('/artBride.png')",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
          minHeight: "100%",
        }}
      >
        <Container maxWidth="lg">
          <Paper
            sx={{ my: { xs: 2, md: 4 }, p: { xs: 1, md: 2 } }}
            elevation={3}
            rounded
          >
            <Box
              sx={{
                my: 0.5,
                mx: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="primary"
                sx={{ fontSize: "30px", textAlign: "center" }}
              >
                <Image src="/logo.png" alt="Logo" width={100} height={60} />
                <br />
                বন্ধন
              </Typography>
            </Box>
            <Title>
              <Typography variant="h6">{props.title}</Typography>
            </Title>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={3}>
                <Tooltip title="বর">
                  <Avatar
                    // sx={{ width: 100, height: 100 }}
                    sizes="100"
                    onClick={handleGroomType}
                    style={{ cursor: "pointer" }}
                    sx={{
                      bgcolor: green[500],

                      width: 100,
                      height: 80,
                      "&:hover": {
                        backgroundColor: green[500],
                        opacity: [0.9, 0.8, 0.7],
                      },
                    }}
                    variant="rounded"
                    // src="/bor.png"
                    value="G"
                    name="groom"
                    //
                    // onClick={handleDataBor}
                  >
                    বর
                    {groomCheck == "Y" ? (
                      <CheckCircleIcon sx={{ marginLeft: 1 }} />
                    ) : (
                      ""
                    )}
                  </Avatar>
                </Tooltip>

                {/* <AssignmentIcon /> */}

                <Tooltip title="কনে">
                  <Avatar
                    // sx={{ width: 100, height: 100 }}
                    onClick={handleBrideType}
                    style={{ cursor: "pointer" }}
                    sx={{
                      bgcolor: deepOrange[500],

                      width: 100,
                      height: 80,
                      "&:hover": {
                        backgroundColor: deepOrange[500],
                        opacity: [0.9, 0.8, 0.7],
                      },
                    }}
                    variant="rounded"
                    // src="/kone.png"
                    value="B"
                    // onClick={handleDataKone}
                  >
                    কনে
                    {brideCheck == "Y" ? (
                      <CheckCircleIcon sx={{ marginLeft: 1 }} />
                    ) : (
                      ""
                    )}
                  </Avatar>
                </Tooltip>

                {/* <AssignmentIcon /> */}

                <Tooltip title="কাজী">
                  <Avatar
                    // sx={{ width: 100, height: 100 }}

                    onClick={handleKaziType}
                    style={{ cursor: "pointer" }}
                    sx={{
                      bgcolor: blue[500],
                      width: 100,
                      height: 80,

                      "&:hover": {
                        backgroundColor: blue[500],
                        opacity: [0.9, 0.8, 0.7],
                      },
                    }}
                    variant="rounded"
                    // src="/kaji.png"
                    value="K"
                    // onClick={handleDataKazi}
                  >
                    কাজী
                    {kaziCheck == "Y" ? (
                      <CheckCircleIcon sx={{ marginLeft: 1 }} />
                    ) : (
                      ""
                    )}
                  </Avatar>
                </Tooltip>
                {/* <AssignmentIcon /> */}
              </Stack>
            </Box>

            <Grid container spacing={2.5} px={2} py={2}>
              {userType !== "" && (
                <>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    sm={12}
                    sx={{ textAlign: "center" }}
                  >
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="position"
                        name="dataType"
                        defaultValue="top"
                        onChange={handleDataType}
                      >
                        <FormControlLabel
                          value="nid"
                          control={<Radio color="primary" defaultChecked />}
                          label="জাতীয় পরিচয়পত্র"
                        />
                        <FormControlLabel
                          value="brn"
                          control={<Radio color="success" />}
                          label="জন্ম নিবন্ধন"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  {userType == "K" ? (
                    <>
                      <Grid item xs={12} md={12} sm={12}>
                        <TextField
                          required
                          name="regNo"
                          label="নিবন্ধন নাম্বার"
                          onChange={handleChange}
                          onKeyUp={handelNibondhon}
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
                        {formErrors.verify.length > 0 && (
                          <span style={{ color: "red" }}>
                            {formErrors.verify}
                          </span>
                        )}
                      </Grid>
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}
              {dataType !== "" && (
                <>
                  <Grid item xs={12} md={4} sm={12}>
                    <TextField
                      type="number"
                      required
                      name={dataType == "brn" ? "userBrn" : "userNid"}
                      label={
                        dataType == "brn"
                          ? "জন্ম নিবন্ধন নাম্বার"
                          : "জাতীয় পরিচয়পত্র নাম্বার"
                      }
                      fullWidth
                      size="small"
                      variant="outlined"
                      onChange={handleChange}
                      value={citizen.userNid}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CreditCardIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {formErrors.userNid.length > 0 && (
                      <span style={{ color: "red" }}>{formErrors.userNid}</span>
                    )}
                  </Grid>

                  <Grid item xs={12} md={4} sm={12}>
                    <Stack>
                      <TextField
                        id="date"
                        name="dateofBirth"
                        label="জন্ম তারিখ"
                        fullWidth
                        size="small"
                        type="date"
                        onChange={handleChange}
                        onSelect={onFetchNidServerData}
                        onKeyUp={onFetchNidServerData}
                        inputProps={{
                          min: "1920-01-01",
                          max: formatDateInString(new Date()),
                        }}
                        // defaultValue="2021-12-27"
                        value={citizen.dateofBirth}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {console.log("dobformError", formErrors.dob)}
                      {formErrors.dob !== "" && (
                        <span style={{ color: "red" }}>{formErrors.dob}</span>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={4} sm={12}>
                    <TextField
                      required
                      name="name"
                      label="নাম"
                      fullWidth
                      size="small"
                      variant="outlined"
                      onChange={handleChange}
                      value={citizen.name}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MaleIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {formErrors.userName.length > 0 && (
                      <span style={{ color: "red" }}>
                        {formErrors.userName}
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12} md={4} sm={12}>
                    <TextField
                      required
                      name="mobile"
                      label="মোবাইল নাম্বার"
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
                    {formErrors.mobile.length > 0 && (
                      <span style={{ color: "red" }}>{formErrors.mobile}</span>
                    )}
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
                    {formErrors.email.length > 0 && (
                      <span style={{ color: "red" }}>{formErrors.email}</span>
                    )}
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
                      onChange={handleChange}
                      value={citizen.religion}
                    >
                      <option>- নির্বাচন করুন -</option>
                      <option value={10}>ইসলাম</option>
                      <option value={20}>হিন্দু</option>
                      <option value={20}>বৌদ্ধ</option>
                      <option value={20}>খ্রিষ্টান</option>
                    </TextField>
                    {formErrors.religion.length > 0 && (
                      <span style={{ color: "red" }}>
                        {formErrors.religion}
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12} md={4} sm={12}>
                    {/* <FormControl component="fieldset">
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
                </FormControl> */}
                    {formErrors.userType.length > 0 && (
                      <span style={{ color: "red" }}>
                        {formErrors.userType}
                      </span>
                    )}
                  </Grid>
                </>
              )}
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
              <Tooltip title="সংরক্ষণ করুন">
                <Button
                  color="success"
                  variant="contained"
                  sx={{ mr: 1 }}
                  startIcon={<SaveIcon />}
                  onClick={onSubmitData}
                  disabled={checkFormError()}
                >
                  {" "}
                  &nbsp; সংরক্ষণ করুন
                </Button>
              </Tooltip>
            </Grid>
          </Paper>
          <Copyright />
        </Container>
      </Box>
    </>
  );
};

export default Registration;
