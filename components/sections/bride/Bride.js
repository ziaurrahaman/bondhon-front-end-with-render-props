import React, { useState, useEffect } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FemaleIcon from "@mui/icons-material/Female";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Paper,
  Tooltip,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Image from "next/image";

import Title from "../../shared/others/HeadTitle";
import Capture from "../camera/Capture";
import axios from "axios";

import AllFormContext from "../../shared/others/zone_form_context.json";
import ZoneComponent from "../../shared/others/ZoneComponent";
import BasicInformationComponent from "../../shared/others/BasicInformationComponent";
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

function createAddressData(
  addType,
  division,
  district,
  upazila,
  union,
  postalCode,
  village
) {
  return { addType, division, district, upazila, union, postalCode, village };
}
const rows = [
  createAddressData(
    "বর্তমান ঠিকানা",
    "চট্টগ্রাম",
    "কুমিল্লা",
    "বরুড়া",
    "আড্ডা",
    "3500",
    "রাজাপাড়া"
  ),
];

const Groom = (props) => {
  const [dataType, setDataType] = useState("nid");

  const handleDataType = (e) => {
    setDataType(e.target.value);
  };

  console.log("dataType=================", props.groomInfo);

  const [allFormContext, setAllFormContext] = useState([]);
  const [allFormContext2, setAllFormContext2] = useState([]);

  function giveValueToTextField(index) {
    const ids = [
      props.groomInfo.division_id,
      props.groomInfo.district_id,
      props.groomInfo.upazila_id,
      props.groomInfo.union_id,
    ];
    console.log("idINdex", index);
    return ids[index];
  }
  function giveValueToTextFieldPer(index) {
    const ids = [
      props.groomInfo.per_division_id,
      props.groomInfo.per_district_id,
      props.groomInfo.per_upazila_id,
      props.groomInfo.per_union_id,
    ];
    console.log("idINdex", index);
    return ids[index];
  }

  const ImageModalRegion = () => {
    console.log("GroomImageeee", props.picState.groomImage);
    return (
      <>
        <Grid sm={12} md={12} xs={12}>
          <Grid sm={12} md={12} xs={12}>
            <Title>
              <Typography variant="h6">বরের ছবি সংগ্রহ</Typography>
            </Title>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={
                  props.picState.groomImage
                    ? props.picOpenRightLeftCameraFlagIForImage.flagForImage +
                      props.picState.groomImage
                    : "/bride.png"
                }
                alt="Bride Picture"
                width={160}
                height={160}
              />
            </Box>
          </Grid>
          <Grid
            sm={12}
            md={12}
            xs={12}
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Grid sm={12} md={6} xs={12}>
              <TextField
                sx={{ marginTop: 3 }}
                required
                id="bridePic"
                name="bridePic"
                label="ছবি নির্বাচন করুন"
                fullWidth
                size="small"
                variant="outlined"
                type="file"
                focused
                onChange={props.groomPicture}
                onClick={(event) => (event.target.value = null)}
              />
            </Grid>
            <Grid sm={12} md={5} xs={12}>
              <Button
                sx={{ marginTop: 3 }}
                variant="outlined"
                fullWidth
                onClick={props.picOpenCloseLefRightFunction.handleOpenCamera}
                startIcon={<CameraAltIcon />}
              >
                ছবি তুলুন
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  const FingerLeftRegion = () => {
    return (
      <>
        <Grid sm={12} md={12} xs={12}>
          <Grid sm={12} md={12} xs={12}>
            <Title>
              <Typography variant="h6">স্বাক্ষর</Typography>
            </Title>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src="/takesig.png"
                alt="Bride Picture"
                width={230}
                height={230}
              />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  let checkFormError = () => {
    let flag = false;
    for (const key in props.formError) {
      if (props.formError[key].length > 0) {
        flag = true;
      }
    }
    return flag;
  };

  useEffect(() => {
    console.log("propsGroomINfooo", typeof props.groomInfo);
    setAllFormContext(AllFormContext.fields);
    setAllFormContext2(AllFormContext.fields2);
    props.getUserById();
  }, []);

  function formatDateInString(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
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
            style={{ marginTop: "3%" }}
          >
            <Grid
              container
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Grid
                sm={props.title === "MarriageInfo" ? 9 : 12}
                md={props.title === "MarriageInfo" ? 9 : 12}
                xs={12}
                spacing={2}
              >
                <BasicInformationComponent
                  handleDataType={handleDataType}
                  onChange={props.onChange}
                  onFetchNidData={props.onFetchNidData}
                  formatDateInString={formatDateInString}
                  brideGroomInfo={props.groomInfo}
                  formError={props.formError}
                  dataType={dataType}
                ></BasicInformationComponent>
                <Grid sm={12} md={12}>
                  <Grid container spacing={3}>
                    <Grid item sm={12} md={6} xs={12}>
                      <Title>
                        <Typography variant="h6">বর্তমান ঠিকানা</Typography>
                      </Title>
                      <Grid container spacing={3}>
                        {allFormContext.map((form, i) => {
                          var obj = Object.assign(
                            {},
                            { ...form },
                            { value: giveValueToTextField(i) },
                            { onChange: props.onChange },
                            {
                              division_Id: props.groomInfo.division_id,
                            },
                            {
                              district_Id: props.groomInfo.district_id,
                            },
                            {
                              upa_city_Id: props.groomInfo.upazila_id,
                            }
                          );
                          console.log("obj-------------------------", obj);

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
                            name="details_address"
                            label="বিস্তারিত ঠিকানা"
                            fullWidth
                            size="small"
                            variant="outlined"
                            value={props.groomInfo.details_address}
                            onChange={props.onChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AddLocationIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                          {props.formError.details_address.length > 0 && (
                            <span style={{ color: "red" }}>
                              {props.formError.details_address}
                            </span>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12} md={6} xs={12}>
                      <Title>
                        <Typography variant="h6">স্থায়ী ঠিকানা</Typography>
                      </Title>
                      <Grid container spacing={3}>
                        {allFormContext2.map((form, i) => {
                          var obj = Object.assign(
                            {},
                            { ...form },
                            { value: giveValueToTextFieldPer(i) },
                            { onChange: props.onChange },
                            {
                              division_Id: props.groomInfo.per_division_id,
                            },
                            {
                              district_Id: props.groomInfo.per_district_id,
                            },
                            {
                              upa_city_Id: props.groomInfo.per_upazila_id,
                            }
                          );

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
                            name="per_details_address"
                            label="বিস্তারিত ঠিকানা"
                            fullWidth
                            size="small"
                            variant="outlined"
                            value={props.groomInfo.per_details_address}
                            onChange={props.onChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AddLocationIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                          {props.formError.details_address.length > 0 && (
                            <span style={{ color: "red" }}>
                              {props.formError.details_address}
                            </span>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {props.title === "MarriageInfo" && (
                <Grid sm={2} md={2.5} xs={12} sx={{ textAlign: "center" }}>
                  {props.title === "MarriageInfo" && (
                    <Grid sm={12} md={12} xs={12}>
                      <Title>
                        <Typography variant="h6">কনের ছবি</Typography>
                      </Title>
                      <Image
                        onClick={
                          props.picOpenCloseLefRightFunction.handleOpenPic
                        }
                        src={
                          props.goomPicSubmit.groomImage
                            ? props.picOpenRightLeftCameraFlagIForImage
                                .flagForImage + props.goomPicSubmit.groomImage
                            : "/bride.png"
                        }
                        alt="Bride Picture"
                        width={160}
                        height={160}
                      />
                    </Grid>
                  )}

                  <Modal
                    open={props.picOpenRightLeftCameraFlagIForImage.openPic}
                    onClose={props.picOpenCloseLefRightFunction.handleClosePic}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <ImageModalRegion />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          sx={{ marginTop: 3 }}
                          variant="outlined"
                          startIcon={<SendIcon />}
                          onClick={
                            props.picOpenCloseLefRightFunction.handleOnSubmitPic
                          }
                        >
                          &nbsp; সংরক্ষণ করুন
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                  {props.title === "MarriageInfo" && (
                    <Grid sm={12} md={12} xs={12} sx={{ marginTop: 3 }}>
                      <Title>
                        <Typography variant="h6">আঙুলের ছাপ</Typography>
                      </Title>
                      <Image
                        onClick={
                          props.picOpenCloseLefRightFunction.handleOpenFinger
                        }
                        src={props.fingerVerify ? "/Success2.png" : "/fng.png"}
                        alt="Bride Finger Right"
                        width={120}
                        height={120}
                      />
                    </Grid>
                  )}

                  {props.title === "MarriageInfo" && (
                    <Grid sm={12} md={12} xs={12} sx={{ marginTop: 3 }}>
                      <Title>
                        <Typography variant="h6">স্বাক্ষর</Typography>
                      </Title>
                      <Image
                        onClick={
                          props.picOpenCloseLefRightFunction.handleOpenLeft
                        }
                        src={
                          props.LeftFP ? "/sig.jpg" : "/digital-signature.png"
                        }
                        alt="Bride Finger Left"
                        width={120}
                        height={120}
                      />
                    </Grid>
                  )}
                  <Modal
                    open={props.picOpenRightLeftCameraFlagIForImage.openLeft}
                    onClose={props.picOpenCloseLefRightFunction.handleCloseLeft}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <FingerLeftRegion />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          sx={{ marginTop: 3 }}
                          variant="outlined"
                          startIcon={<SendIcon />}
                          onClick={
                            props.picOpenCloseLefRightFunction
                              .handleOnSubmitLeftFP
                          }
                        >
                          &nbsp; সংরক্ষণ করুন
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                  <Grid sm={12} md={12} xs={12}>
                    <Modal
                      open={
                        props.picOpenRightLeftCameraFlagIForImage.openCamera
                      }
                      onClose={
                        props.picOpenCloseLefRightFunction.handleCloseCamera
                      }
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Title>
                          <Typography variant="h6">আলোকচিত্র গ্রহণ</Typography>
                        </Title>
                        {/* <CameraModal/> */}
                        <Capture
                          onConfirm={
                            props.picOpenCloseLefRightFunction.onImageConfirm
                          }
                        />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        ></Box>
                      </Box>
                    </Modal>
                  </Grid>
                </Grid>
              )}

              {props.title !== "MarriageInfo" && (
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
                      variant="contained"
                      color="success"
                      sx={{ mr: 1 }}
                      startIcon={<SaveIcon />}
                      onClick={(e) => {
                        props.onSubmit(e, "B", props.groomInfo);
                      }}
                      disabled={checkFormError()}
                    >
                      {props.data !== null ? "হালনাগাদ করুন" : "সংরক্ষণ করুন"}
                    </Button>
                  </Tooltip>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Groom;
