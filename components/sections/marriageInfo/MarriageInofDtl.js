import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MaleIcon from "@mui/icons-material/Male";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  Button,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import {
  getGroomInforamtionByDoc,
  getMarriageInfoReportByIdUrl,
  getDocumentUrlDummy,
} from "../../../url/ApiList";
// import { Typography } from '@mui/material';
// import { BrideDtl } from "../bride/BrideDtl";
// import { GroomDtl } from "../groom/GroomDtl";
import GroomDtl from "../groom/GroomDtl";
import BrideDtl from "../bride/BrideDtl";
import { BrideOrGroomAllInfoGetUrl } from "../../../url/ApiList";
import ReactToPrint from "react-to-print";
import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";
import SimCardDownloadTwoToneIcon from "@mui/icons-material/SimCardDownloadTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
const MarriageInfoDetails = (props) => {
  const [marriageInfoRows, setMarriageInfoRows] = React.useState({
    marriage_id: "",
    bride_id: "",
    groom_id: "",
    lawyer_father_id: "",
    witness_id: "",
    status: "",
    create_by: "",
    create_date: "2022-02-:00:00.000Z",
    payment_status: "",
    nikahnama_no: "",
    sonod_no: "",
    bride_name: "",
    bride_dob: "",
    groom_name: "",
    groom_dob: "",
    mrg_date: "",
    mrg_fixed_date: "",
    mrg_reg_date: "",
    mrg_denmohor: "",
    mrg_den_status: "",
    mr_muajjol: "",
    mrg_muajjil: "",
    mrg_den_paid: "",
    mrg_spc_info: "",
    spc_info_for: "",
    spc_info_type: "",
    dev_con: "",
    alm_con: "",
    perm_no: "",
    perm_date: "",
  });
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  };

  const [groomAllInfo, setGroomAllInfo] = React.useState(null);
  const [brideAllInfo, setBrideAllInfo] = React.useState(null);
  const [lawyerFatherAllInfo, setLawyerFatherAllInfo] = React.useState(null);
  const marriage_fixed_date =
    marriageInfoRows === null
      ? ""
      : formatDate(marriageInfoRows.mrg_fixed_date);
  const marriage_date =
    marriageInfoRows === null ? "" : formatDate(marriageInfoRows.mrg_date);
  const marriage_reg_date =
    marriageInfoRows === null ? "" : formatDate(marriageInfoRows.mrg_reg_date);
  let docNo = props.nikahnamaNo;
  let componentRef = React.useRef();
  // let result = {};
  // let result;
  //   const [groomDocNo, setGroomDocNo] = useState();

  React.useEffect(() => {
    console.log("NikahnamaNo", docNo);
    getMarriageInfoDetails(docNo);
  }, []);
  async function getMarriageInfoDetails(docNo) {
    const result = await axios.get(getMarriageInfoReportByIdUrl + docNo);
    console.log("MarriageInfoRowsMarriageInfoRows", result.data.data);
    setTimeout(() => {
      setMarriageInfoRows(result.data.data);
    }, 100);
    getBrideInfo(result.data.data.bride_id);
    getGroomInfo(result.data.data.groom_id);
    getLawyerFatherIfno(result.data.data.lawyer_father_id);
  }

  async function getBrideInfo(brideId) {
    const result = await axios.get(BrideOrGroomAllInfoGetUrl + brideId);
    setBrideAllInfo(result.data.data);
    getBridePic(brideId);
  }
  async function getGroomInfo(groomId) {
    const result = await axios.get(BrideOrGroomAllInfoGetUrl + groomId);
    setGroomAllInfo(result.data.data);
    getGroomPic(groomId);
  }
  async function getLawyerFatherIfno(lawyerId) {
    const result = await axios.get(BrideOrGroomAllInfoGetUrl + lawyerId);
    setLawyerFatherAllInfo(result.data.data);
  }

  //---------- IMAGE ----------------------->
  const [flagForImage, setFlagForImage] = useState("data:image/jpg;base64,");
  const [bridePicture, setBridePicture] = useState({
    image: "",
    mimetypeback: "",
  });
  const [groomPicture, setGroomPicture] = useState({
    image: "",
    mimetypeback: "",
  });

  async function getBridePic(id) {
    let payloadBase64 = {
      citizenDocId: id,
    };
    try {
      const base64Img = await axios.post(getDocumentUrlDummy, payloadBase64);
      const baseImage = base64Img.data.data.doc_img;
      console.log('payload',payloadBase64);
      setBridePicture({
        image: baseImage,
        mimetypeback: ".png",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getGroomPic(id) {
    let payloadBase64 = {
      citizenDocId: id,
    };
    console.log('payload',payloadBase64);
    try {
      const base64Img = await axios.post(getDocumentUrlDummy, payloadBase64);
      const baseImage = base64Img.data.data.doc_img;
      setGroomPicture({
        image: baseImage,
        mimetypeback: ".png",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div ref={(el) => (componentRef = el)}>
      <>
        {/* {console.log("lllllllllllllllll", marriageInfoRows.bride_id)}
      <p>{marriageInfoRows.bride_id}</p> */}
        {marriageInfoRows.groom_id === undefined ? (
          <p>Wait...</p>
        ) : (
          <>
            <Box sx={{ flexGrow: 1 }}>
              <Toolbar variant="dense">
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, mb: 1, fontWeight: "bold" }}
                >
                  বিবাহ সম্পন্নের তথ্য
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

                  <Button
                    variant="contained"
                    sx={{ ml: 1 }}
                    startIcon={<SimCardDownloadTwoToneIcon />}
                    color="success"
                  >
                    ডাউনলোড করুন
                  </Button>
                </div>
              </Toolbar>
            </Box>
            <Container>
              <Paper sx={{ my: { xs: 1, md: 2 }, p: { xs: 1, md: 2 } }}>
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Grid sm={9} md={9} xs={12} spacing={0}>
                    <Grid sm={12} md={12}>
                      <>
                        <Typography
                          variant="p"
                          component="div"
                          sx={{
                            flexGrow: 1,
                            mb: 1,
                            ml: 2,
                            fontWeight: "bold",
                            background: "#ddd",
                            p: 1,
                          }}
                        >
                          বরের মৌলিক তথ্য
                        </Typography>

                        <Grid container spacing={2.5} px={2} py={2}>
                          <Grid item xs={12} md={8} sm={12}>
                            <Typography>
                              জন্ম নিবন্ধন / জাতীয় পরিচয়পত্র নাম্বার :{" "}
                              {groomAllInfo === null
                                ? ""
                                : groomAllInfo.citizenInfo.citizen_doc_no}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={4} sm={12}>
                            <Typography>
                              জন্ম তারিখ :{" "}
                              {formatDate(
                                groomAllInfo === null
                                  ? ""
                                  : groomAllInfo.citizenInfo.citizen_dob
                              )}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={4} sm={12}>
                            <Typography>
                              নাম :{" "}
                              {groomAllInfo === null
                                ? ""
                                : groomAllInfo.citizenInfo.citizen_name}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={4} sm={12}>
                            <Typography>
                              মোবাইল নাম্বার :{" "}
                              {groomAllInfo === null
                                ? ""
                                : groomAllInfo.citizenInfo.citizen_mobile}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={4} sm={12}>
                            <Typography>
                              ইমেইল :{" "}
                              {groomAllInfo === null
                                ? ""
                                : groomAllInfo.citizenInfo.citizen_email}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={4} sm={12}>
                            <Typography>
                              ধর্ম :{" "}
                              {groomAllInfo === null
                                ? ""
                                : groomAllInfo.citizenInfo.citizen_religion ==
                                  "10"
                                ? "ইসলাম"
                                : groomAllInfo.citizenInfo.citizen_religion ==
                                  "20"
                                ? "হিন্দু"
                                : groomAllInfo.citizenInfo.citizen_religion ==
                                  "30"
                                ? "বৌদ্ধ"
                                : groomRows.citizen_religion == "40"
                                ? "খ্রিষ্টান"
                                : ""}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={4} sm={12}>
                            <Typography>
                              পিতার নাম :{" "}
                              {groomAllInfo === null
                                ? ""
                                : groomAllInfo.citizenInfo.citizen_father_name}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={4} sm={12}>
                            <Typography>
                              মাতার নাম :
                              {groomAllInfo === null
                                ? ""
                                : groomAllInfo.citizenInfo.citizen_mother_name}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={12} sm={12}>
                            <Typography>
                              ঠিকানা : ৩৭ রাজারবাগ বাসাবো ঢাকা
                            </Typography>
                          </Grid>
                        </Grid>
                      </>
                    </Grid>
                  </Grid>
                  <Grid sm={2} md={2.5} xs={12} sx={{ textAlign: "center" }}>
                    <Grid sm={12} md={12} xs={12}>
                      <Typography
                        variant="p"
                        component="div"
                        sx={{
                          flexGrow: 1,
                          mb: 1,
                          ml: 2,
                          fontWeight: "bold",
                          background: "#ddd",
                          p: 1,
                        }}
                      >
                        বরের ছবি
                      </Typography>
                      <Image
                        src={
                          groomPicture.image
                            ? flagForImage + groomPicture.image
                            : "/groom.png"
                        }
                        alt="Bride Picture"
                        width={160}
                        height={160}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </>
        )}
        <Container>
          <Paper sx={{ my: { xs: 1, md: 2 }, p: { xs: 1, md: 2 } }}>
            <Grid
              container
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Grid sm={9} md={9} xs={12} spacing={2}>
                <Grid sm={12} md={12}>
                  <>
                    <Typography
                      variant="p"
                      component="div"
                      sx={{
                        flexGrow: 1,
                        mb: 1,
                        ml: 2,
                        fontWeight: "bold",
                        background: "#ddd",
                        p: 1,
                      }}
                    >
                      কনের মৌলিক তথ্য
                    </Typography>

                    <Grid container spacing={2.5} px={2} py={2}>
                      <Grid item xs={12} md={8} sm={12}>
                        <Typography>
                          জন্ম নিবন্ধন / জাতীয় পরিচয়পত্র নাম্বার :{" "}
                          {brideAllInfo === null
                            ? ""
                            : brideAllInfo.citizenInfo.citizen_doc_no}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          জন্ম তারিখ :{" "}
                          {formatDate(
                            brideAllInfo === null
                              ? ""
                              : brideAllInfo.citizenInfo.citizen_dob
                          )}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          নাম :{" "}
                          {brideAllInfo === null
                            ? ""
                            : brideAllInfo.citizenInfo.citizen_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          মোবাইল নাম্বার :{" "}
                          {brideAllInfo === null
                            ? ""
                            : brideAllInfo.citizenInfo.citizen_mobile}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          ইমেইল :{" "}
                          {brideAllInfo === null
                            ? ""
                            : brideAllInfo.citizenInfo.citizen_email}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          ধর্ম :{" "}
                          {brideAllInfo === null
                            ? ""
                            : brideAllInfo.citizenInfo.citizen_religion == "10"
                            ? "ইসলাম"
                            : brideAllInfo.citizenInfo.citizen_religion == "20"
                            ? "হিন্দু"
                            : brideAllInfo.citizenInfo.citizen_religion == "30"
                            ? "বৌদ্ধ"
                            : briderows.citizen_religion == "40"
                            ? "খ্রিষ্টান"
                            : ""}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          পিতার নাম :{" "}
                          {brideAllInfo === null
                            ? ""
                            : brideAllInfo.citizenInfo.citizen_father_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          মাতার নাম :
                          {brideAllInfo === null
                            ? ""
                            : brideAllInfo.citizenInfo.citizen_mother_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={12} sm={12}>
                        <Typography>
                          ঠিকানা : ৩৭ রাজারবাগ বাসাবো ঢাকা
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                </Grid>
              </Grid>
              <Grid sm={2} md={2.5} xs={12} sx={{ textAlign: "center" }}>
                <Grid sm={12} md={12} xs={12}>
                  <Typography
                    variant="p"
                    component="div"
                    sx={{
                      flexGrow: 1,
                      mb: 1,
                      ml: 2,
                      fontWeight: "bold",
                      background: "#ddd",
                      p: 1,
                    }}
                  >
                    কনের ছবি
                  </Typography>
                  <Image
                    src={
                      bridePicture.image
                        ? flagForImage + bridePicture.image
                        : "/bride.png"
                    }
                    alt="Bride Picture"
                    width={160}
                    height={160}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Container>
        <Container>
          <Paper sx={{ my: { xs: 1, md: 2 }, p: { xs: 1, md: 2 } }}>
            <Grid
              container
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Grid sm={12} md={12} xs={12} spacing={2}>
                <Grid sm={12} md={12}>
                  <>
                    <Typography
                      variant="p"
                      component="div"
                      sx={{
                        flexGrow: 1,
                        mb: 1,
                        ml: 2,
                        fontWeight: "bold",
                        background: "#ddd",
                        p: 1,
                      }}
                    >
                      বিয়ের তথ্য
                    </Typography>

                    <Grid container spacing={2.5} px={2} py={2}>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          উকিল বাবার নাম :{" "}
                          {lawyerFatherAllInfo === null
                            ? ""
                            : lawyerFatherAllInfo.citizenInfo.citizen_name}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={8} sm={12}>
                        <Typography>
                          উকিল বাবার ঠিকানা :{" "}
                          {/* {lawyerFatherAllInfo === null
                            ? ""
                            : lawyerFatherAllInfo.citizenInfo.citizen_name} */}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          সাক্ষীর নাম :{" "}
                          {/* {lawyerFatherAllInfo === null
                            ? ""
                            : lawyerFatherAllInfo.citizenInfo.citizen_name} */}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={8} sm={12}>
                        <Typography>
                          সাক্ষীর ঠিকানা :{" "}
                          {/* {lawyerFatherAllInfo === null
                            ? ""
                            : lawyerFatherAllInfo.citizenInfo.citizen_name} */}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          নিকাহনামা নম্বর :{" "}
                          {marriageInfoRows === null
                            ? ""
                            : marriageInfoRows.nikahnama_no}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          সনদ নাম্বার :{" "}
                          {marriageInfoRows === null
                            ? ""
                            : marriageInfoRows.sonod_no}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          দেনমোহর :{" "}
                          {marriageInfoRows === null
                            ? ""
                            : marriageInfoRows.mrg_denmohor}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          দেনমোহর প্রদানের অবস্থা :{" "}
                          {marriageInfoRows === null
                            ? ""
                            : marriageInfoRows.mrg_den_status}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          আদায়কৃত দেনমোহর :{" "}
                          {marriageInfoRows === null
                            ? ""
                            : marriageInfoRows.mrg_den_paid}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          মুয়াজ্জল :{" "}
                          {marriageInfoRows === null
                            ? ""
                            : marriageInfoRows.mr_muajjol}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          মুয়াজ্জিল :{" "}
                          {marriageInfoRows === null
                            ? ""
                            : marriageInfoRows.mrg_muajjil}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          স্বামী স্ত্রীর বিশেষ অবস্থা :{" "}
                          {marriageInfoRows === null
                            ? ""
                            : marriageInfoRows.mrg_spc_info}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          বিবাহ ধার্যের তারিখ :{" "}
                          {groomAllInfo === null ? "" : marriage_fixed_date}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          বিবাহ সম্পন্নের তারিখ :{" "}
                          {groomAllInfo === null ? "" : marriage_date}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} sm={12}>
                        <Typography>
                          বিবাহ নিবন্ধনের তারিখ :{" "}
                          {groomAllInfo === null ? "" : marriage_reg_date}
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </>
    </div>
  );
};

export default MarriageInfoDetails;
