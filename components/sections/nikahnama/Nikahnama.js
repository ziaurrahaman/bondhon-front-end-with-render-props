import { React, useState, useRef } from "react";
import AbcIcon from "@mui/icons-material/Abc";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Box,
  Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import Title from "../../shared/others/HeadTitle";
import Breadcrumb from "../../shared/others/breadcrumbs";
import axios from "axios";
import { getPaymentUrl, getCertificateDataUrl } from "../../../url/ApiList";
import { NotificationManager } from "react-notifications";
import ReactToPrint from "react-to-print";
import { styled } from "@mui/material/styles";
import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles({
  main: {
    width: "100%",
    height: "704px",
    backgroundImage: "url('/new_certificate.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  box: {
    height: "600px",
    padding: "25px 75px 10px 55px",
    alignContent: "center",
  },
  tableView: {
    bordeSpacing: 0,
    width: "100%",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
  },
  th: {
    align: "left",
    padding: "5px",
    fontWeight: "blod",
  },
});

const Nikahnama = () => {
  const [nikahnamaSearch, setNikahnamaSearch] = useState(false);
  const classes = useStyles();
  let componentRef = useRef();

  const handleSubmit = () => {
    setNikahnamaSearch(true);
  };

  function currentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  }

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  };

  //handle change ------------>
  const [nikah, setNikah] = useState({
    nid: "",
    dob: "",
    nikahNo: "",
  });

  const [formErrors, setFormErrors] = useState({
    nid: "",
    dob: "",
    nikahNo: "",
  });
  const [certificateData, setCertificateData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "nid":
        setNikah({
          ...nikah,
          [e.target.name]: e.target.value,
        });

        formErrors.nid =
          value.length == 13 ||
          value.length == 10 ||
          value.length == 17 ||
          value.length == 0
            ? ""
            : "আপনার সঠিক এনআইডি প্রদান করুন";
        break;
      case "dob":
        setNikah({
          ...nikah,
          [e.target.name]: e.target.value,
        });
        formErrors.dob = value === "" && "জন্ম তারিখ দিন";
        break;
      case "nikahNo":
        setNikah({
          ...nikah,
          [e.target.name]: e.target.value,
        });
        formErrors.nikahNo =
          value === "" && "আপনার সঠিক নিবন্ধন নাম্বার প্রদান করুন";
        break;
    }
  };

  //handle search------------->
  const handleSearch = async (e) => {
    try {
      const getPayInfo = await axios.get(getPaymentUrl + nikah.nikahNo);
      let count = getPayInfo.data.data[0].count;
      console.log(getPayInfo);
      if (count == 0) {
        NotificationManager.error("বিবাহ নিবন্ধন ফি প্রদান করুন");
      } else {
        setNikahnamaSearch(true);
        const getPayInfo = await axios.get(getPaymentUrl + nikah.nikahNo);
        let count = getPayInfo.data.data[0].count;
        console.log(getPayInfo);
        if (count == 0) {
          NotificationManager.error("বিবাহ নিবন্ধন ফি প্রদান করুন");
          setNikahnamaSearch(false);
        } else {
          try {
            const getCertificate = await axios.get(
              getCertificateDataUrl + nikah.nikahNo
            );
            const data = getCertificate.data.data[0];
            setCertificateData(data);
            setNikahnamaSearch(true);
          } catch (error) {
            console.log(error);
            NotificationManager.error("সংযোগ ত্রুটি পাওয়া গেছে.", "Failed");
          }
        }
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("সংযোগ ত্রুটি পাওয়া গেছে.", "Failed");
    }
  };

  return (
    <>
      <Breadcrumb>
        <Typography variant="h6">সনদপত্র সংগ্রহ</Typography>
      </Breadcrumb>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
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
          <Grid xs={12} sm={12} md={12}>
            <Paper
              sx={{ my: { xs: 2, md: 4 }, p: { xs: 1, md: 2 } }}
              elevation={3}
              rounded
              style={{ marginTop: "3%" }}
            >
              <Title>
                <Typography variant="h6">সনদ পত্রের তথ্য</Typography>
              </Title>

              <Grid container spacing={2} px={2} py={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <TextField
                    required
                    name="nid"
                    onChange={handleChange}
                    value={nikah.nid}
                    label="জাতীয় পরিচয়পত্র/জন্ম নিবন্ধন নাম্বার"
                    fullWidth
                    size="small"
                    autoComplete="family-name"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCardIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formErrors.nid.length > 0 && (
                    <span style={{ color: "red" }}>{formErrors.nid}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <TextField
                    label="জন্ম তারিখ"
                    fullWidth
                    size="small"
                    type="date"
                    name="dob"
                    onChange={handleChange}
                    value={nikah.dob}
                    defaultValue="yyyy-mm-dd"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {formErrors.dob.length > 0 && (
                    <span style={{ color: "red" }}>{formErrors.dob}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <TextField
                    required
                    name="nikahNo"
                    label="নিবন্ধন নাম্বার"
                    fullWidth
                    size="small"
                    autoComplete="given-name"
                    variant="outlined"
                    onChange={handleChange}
                    value={nikah.nikahNo}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AbcIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formErrors.nikahNo.length > 0 && (
                    <span style={{ color: "red" }}>{formErrors.nikahNo}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <Tooltip title="সনদ খুঁজুন">
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mr: 1 }}
                      //onClick={handleSubmit}
                      onClick={handleSearch}
                      startIcon={<SearchIcon />}
                    >
                      {" "}
                      সনদ খুঁজুন
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={12}
            sx={{ display: nikahnamaSearch ? "block" : "none" }}
          >
            <Paper
              sx={{ my: { xs: 2, md: 4 }, p: { xs: 1, md: 2 } }}
              elevation={3}
              rounded
            >
              {/* <Title>
                <Typography variant="h6">সনদ পত্র</Typography>
              </Title> */}
              <Box sx={{ flexGrow: 1 }}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, mb: 1, fontWeight: "bold" }}
                  >
                    সনদ পত্র
                  </Typography>
                  <div>
                    <ReactToPrint
                      trigger={() => (
                        <Button
                          variant="contained"
                          sx={{ ml: 1 }}
                          startIcon={<PrintTwoToneIcon />}
                        >
                          মুদ্রণ করুন
                        </Button>
                      )}
                      content={() => componentRef}
                    />
                  </div>
                </Toolbar>
              </Box>
              <Grid container>
                <div ref={(el) => (componentRef = el)}>
                  <Grid xs={12} sm={12} md={12}>
                    <div className={classes.main}>
                      <div className={classes.box}>
                        <table width="100%" style={{ alignContent: "center" }}>
                          <tr>
                            <td
                              style={{ alignContent: "center", width: "100%" }}
                            >
                              <p
                                style={{
                                  width: "100%",
                                  textAlign: "center",
                                  lineHeight: "30px",
                                  marginTop: "4%",
                                }}
                              >
                                <b style={{ fontSize: "20px" }}>
                                  Government of the People's Republic of
                                  Bangladesh{" "}
                                </b>{" "}
                                <br></br>
                                <b style={{ fontSize: "16px" }}>
                                  Office of The Muslim Marrage & Divorce
                                  Registrar & Kazi
                                </b>
                                <b style={{ fontSize: "14px" }}>
                                  Harirampur Union, Turag, Dhaka 1230
                                </b>
                                <br></br>
                                <br></br>
                                <b
                                  style={{ fontSize: "25px", color: "#004fb9" }}
                                >
                                  <i>
                                    <u>Marriage Certificate</u>
                                  </i>
                                </b>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="3">
                              <p
                                style={{
                                  textAlign: "justify",
                                  lineHeight: "45px",
                                  fontSize: "17px",
                                  paddingLeft: "40px",
                                  paddingRight: "30px",
                                }}
                              >
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <i>
                                  This is to certify that{" "}
                                  <b
                                    style={{ borderBottom: "2px dotted #000" }}
                                  >
                                    &nbsp; {certificateData.groom_name} &nbsp;
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                                  </b>{" "}
                                  <br></br>
                                  Son of{" "}
                                  <b
                                    style={{ borderBottom: "2px dotted #000" }}
                                  >
                                    {" "}
                                    &nbsp;&nbsp;{
                                      certificateData.groom_father
                                    } & {certificateData.groom_mother}{" "}
                                  </b>
                                  &nbsp; Date of Birth{" "}
                                  <b
                                    style={{ borderBottom: "2px dotted #000" }}
                                  >
                                    &nbsp;
                                    {formatDate(certificateData.groom_dob)}
                                  </b>
                                  &nbsp;Married with{" "}
                                  <b
                                    style={{ borderBottom: "2px dotted #000" }}
                                  >
                                    &nbsp;{certificateData.bride_name}{" "}
                                  </b>{" "}
                                  &nbsp;Daughter of{" "}
                                  <b
                                    style={{ borderBottom: "2px dotted #000" }}
                                  >
                                    &nbsp;{certificateData.bride_father} &{" "}
                                    {certificateData.bride_father}
                                  </b>
                                  &nbsp; Date of Birth{" "}
                                  <b
                                    style={{ borderBottom: "2px dotted #000" }}
                                  >
                                    &nbsp;
                                    {formatDate(certificateData.bride_dob)}
                                  </b>
                                  &nbsp;The marriage was solemnized on{" "}
                                  <b
                                    style={{ borderBottom: "2px dotted #000" }}
                                  >
                                    &nbsp;
                                    {formatDate(certificateData.marriage_date)}
                                  </b>
                                  &nbsp;and registered in my office on{" "}
                                  <b
                                    style={{ borderBottom: "2px dotted #000" }}
                                  >
                                    &nbsp;
                                    {formatDate(
                                      certificateData.marriage_reg_date
                                    )}
                                  </b>
                                  &nbsp; being registration no
                                  <b
                                    style={{ borderBottom: "2px dotted #000" }}
                                  >
                                    &nbsp; {certificateData.nikahnama_no}
                                  </b>
                                  .<br></br> I wish them every success in life.
                                  {/* <div style={{height:'80px', width:"80px", background:"#ddd", marginLeft:'auto'}}>
                            </div> */}
                                  <br></br>
                                  <br></br>
                                  Data of Issue &nbsp;
                                  <b
                                    style={{ borderBottom: "2px dotted #000" }}
                                  >
                                    &nbsp;{currentDate()}
                                  </b>
                                </i>
                              </p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </Grid>
                </div>
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Nikahnama;
