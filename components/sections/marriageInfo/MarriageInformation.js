import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  // getGroomInforamtionByDoc,
  getMarriageInfoReportByIdUrl,
  bridesAddressInfo,
  bridesBasicInfo,
  marriageInfoBasicInfoUrl,
  checkCitizenAndAddressUrl,
  citizenUpdateUrl,
  citizenCreateUrl,
  addressUpdateUrl,
  addressCreateUrl,
  updateMarriageInfoUrl,
  marriageInofUniqueCheckUrl,
  marriageAndSpecialMarriageInfoUpdateUrl,
  updateLawyerAndWitnessUrl,
  getNikahnamaNmberUrl,
} from "../../../url/ApiList";
import Review from "../../shared/others/review";
import Bride from "../bride/Bride";
import Groom from "../groom/Groom";
import LawyerFatherAndWitness from "../lawyer-witness/Lawyer_Witness";
import BasicMarriageInformation from "./BasicMarriageInformation";
import Breadcrumb from "../../shared/others/breadcrumbs";
// import { bridesBasicInfo } from "../../../url/ApiList";
import BrideGroomAndMarriageInfoRenderProps from "../groom/BrideGroomAndMarriageInfoRenderProps";
import BasicMarriageInfoRenderProps from "./BasicMarriageInfoRenderProps";
import { PortraitSharp } from "@mui/icons-material";
import LawyerWitnessFatherContextProvider from "../lawyer-witness/lawyerWitnessContext";
import { LawyerWitnessFatherContext } from "../lawyer-witness/lawyerWitnessContext";
// ------------ Stepper Steps -------------
const steps = [
  "বরের তথ্যাদি",
  "কনের তথ্যাদি",
  "বিবাহের তথ্য",
  "উকিল ও সাক্ষীর তথ্যাদি",
];

const bearer = (data) => {};

const FinalStep = (props) => {
  const [nika, setMrgId] = useState("");
  const id = localStorage.getItem("nikahnama_no_id");

  // const nikahnama = localStorage.getItem("nikahnama_no");

  // 127.0.0.1:8081/getMarriageNikahnama/getNikahnama/17

  useEffect(() => {
    getMarriageNikahNama(id);
  });

  async function getMarriageNikahNama(id) {
    try {
      console.log("IdIdIdId", id);
      const result = await axios.get(getNikahnamaNmberUrl + id);
      const nika1 = result.data.data.nikahnama_no;
      setMrgId(nika1);
      console.log("Nika nama : ", result);
    } catch (error) {
      console.log("errr", error);
    }
  }

  return (
    <>
      <Grid container>
        <Grid xs={12} sm={12} md={12} sx={{ mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Paper variant="outlined" sx={{ width: 800 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 2,
                }}
              >
                <Image
                  src="/certificate.png"
                  alt="Bride Picture"
                  width={100}
                  height={100}
                />
              </Box>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  textAlign: "center",
                  color: "#f06292",
                  fontWeight: "bold",
                }}
              >
                অভিনন্দন !!!
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  textAlign: "center",
                  color: "#1de9b6",
                  fontWeight: "bold",
                }}
              >
                বিবাহ নিবন্ধন সফলভাবে সম্পূর্ণ হয়েছে
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  textAlign: "center",
                  color: "#1de9b6",
                  fontWeight: "bold",
                  mb: 4,
                }}
              >
                বিবাহ নিবন্ধন নং : {nika}
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const MarriageInformation = (props) => {
  const lawyerFather = useContext(LawyerWitnessFatherContext);
  console.log("context", LawyerWitnessFatherContext);

  const {
    lawyerFatherInfo,
    formErrorsLawyer,
    handleOnChange,
    formatDate,
    nidDataFatch,
    giveValueToTextField,
    onFetchNidServerData,
    handlerOnFatchData,
    onSubmitLawyerInfoData,
  } = lawyerFather;
  console.log("groooooooooooooomInfooooo", props.groomInfo);
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Groom
            groomInfo={props.groomInfo}
            onChange={props.onChange}
            onSubmit={props.onSubmit}
            getUserById={() => {
              props.getUserById("MarriageInfo", "G");
            }}
            title="MarriageInfo"
            onFetchNidData={props.onFetchNidData}
            formError={props.formError}
            data={props.data}
            picState={props.picState}
            picOpenCloseLefRightFunction={props.picOpenCloseLefRightFunction}
            groomPicture={props.groomPicture}
            goomPicSubmit={props.goomPicSubmit}
            fingerVerify={props.fingerVerify}
            LeftFP={props.LeftFP}
            picOpenRightLeftCameraFlagIForImage={
              props.picOpenRightLeftCameraFlagIForImage
            }
          />
        );

      case 1:
        return (
          <Bride
            groomInfo={props.groomInfo}
            onChange={props.onChange}
            onSubmit={props.onSubmit}
            getUserById={() => {
              props.getUserById("MarriageInfo", "B");
            }}
            title="MarriageInfo"
            onFetchNidData={props.onFetchNidData}
            formError={props.formError}
            data={props.data}
            picState={props.picState}
            picOpenCloseLefRightFunction={props.picOpenCloseLefRightFunction}
            groomPicture={props.groomPicture}
            goomPicSubmit={props.goomPicSubmit}
            fingerVerify={props.fingerVerify}
            LeftFP={props.LeftFP}
            picOpenRightLeftCameraFlagIForImage={
              props.picOpenRightLeftCameraFlagIForImage
            }
          />
        );
      case 2:
        return (
          <BasicMarriageInformation
            marriageInfo={props.marriageInfo}
            formErrorsMrg={props.formErrorsMrg}
            hadnleChangeMrg={props.hadnleChangeMrg}
            onSubmitDataMrg={props.onSubmitDataMrg}
            performDevorcePermissionDevorcyFilesAlimonyStateObjMrg={
              props.performDevorcePermissionDevorcyFilesAlimonyStateObjMrg
            }
            marritalStatusDevorcePermissionRightRevokChangeHandlerObjMrg={
              props.marritalStatusDevorcePermissionRightRevokChangeHandlerObjMrg
            }
            checkFormErrorMrg={props.checkFormErrorMrg}
            handleAddDeleteObjMrg={props.handleAddDeleteObjMrg}
            devorceConOnChagneMrg={props.devorceConOnChagneMrg}
            khorposhOnchangeMrg={props.khorposhOnchangeMrg}
          />
        );

      case 3:
        return (
          <LawyerWitnessFatherContextProvider>
            <LawyerFatherAndWitness />
          </LawyerWitnessFatherContextProvider>
        );

      default:
        throw new Error("Unknown step");
    }
  }

  const groomDispatch = useDispatch();
  // const [law_father_info, setLawFatherInof] = React.useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const groomPayload = useSelector((state) => state.groomReg);
  const bridePayload = useSelector((state) => state.brideReg);
  const mrgInfoPayload = useSelector((state) => state.mrgInfo);
  const lawyerWitnessInfo = useSelector((state) => state.lawyerAndWitness);
  let mrg_Id;
  console.log("bridepayloadddddddd", lawyerWitnessInfo);
  // setLawFatherInof(lawyerWitnessInfo);

  // localStorage.setItem("law_father_info", JSON.stringify(lawyerWitnessInfo));

  // localStorage.setItem("law_father_info");

  const handleNext = async () => {
    // console.log("methodddddddofffffkaaaaziiii", bridePayload.method_of_kazi);
    console.log("groooooooooooooomInfooooo", props.groomInfo);
    // groomDispatch(RegisterGroom(groomPayload));
    // console.log("bridePayloadddddddd", bridePayload);
    setActiveStep(activeStep + 1);
    if (activeStep === 0) {
      console.log("step0", props.groomInfo);

      props.onSubmit(undefined, "G", props.groomInfo);
    }
    if (activeStep === 1) {
      props.onSubmit(undefined, "B", props.groomInfo);
    }
    if (activeStep === 2) {
      props.onSubmitDataMrg();
    }
    if (activeStep === 3) {
      onSubmitLawyerInfoData();
    }
    // if (activeStep === 2) {
    //   const marriageBasicData = await axios.post(
    //     marriageInfoBasicInfoUrl,
    //     mrgInfoPayload
    //   );
    // }
    // 5351254316;
    // 2010201020;
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <>
      <Breadcrumb>
        <Typography variant="h6">বিবাহ নিবন্ধন</Typography>
      </Breadcrumb>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 6,
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
          <Stepper activeStep={activeStep} sx={{ pb: 2 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{ color: "#FFF" }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <FinalStep id={mrg_Id} />
            ) : (
              <>
                {getStepContent(activeStep)}
                <Container>
                  <Paper
                    sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}
                    elevation={3}
                    rounded
                    style={{ background: "rgba(241, 241, 241, 0.3)" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {activeStep !== 0 && (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<ArrowBackIosNewIcon />}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          আগের পাতায়
                        </Button>
                      )}

                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        endIcon={<SendIcon />}
                        onClick={handleNext}
                        color="success"
                      >
                        {activeStep === steps.length - 1
                          ? "সংরক্ষণ করুন"
                          : "সংরক্ষণ করুন ও পরবর্তী পাতায়"}
                      </Button>
                    </Box>
                  </Paper>
                </Container>
              </>
            )}
          </>
        </Container>
      </Box>
    </>
  );
};

export default MarriageInformation;
