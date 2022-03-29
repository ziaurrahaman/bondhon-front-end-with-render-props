/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Paper, Avatar } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Bors from "./Bor";
import FullMarriages from "./FullMarriage";
import Kones from "./Kone";
import PendingMarriages from "./PendingMarriage";
import CoatFees from "./CoatFee";
import Nikahnamas from "./Nikahnama";
import Registrations from "./Registation";
import Profiles from "./Profile";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "../../shared/others/breadcrumbs";
import { red } from "@mui/material/colors";
import { display } from "@mui/system";
import axios from "axios";
import {
  getNumberOfGroomsUrl,
  getNumberOfBridesUrl,
  getNumberOfMarraigesUrl,
} from "../../../url/ApiList";

const user = {
  avatar: "/wedd.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

const Dashboard = () => {
  let [stepId, setStepId] = useState(0);
  useEffect(() => {
    dataStore();
  }, [stepId]);
  const dataStore = () => {
    let stepfoundId =
      localStorage && localStorage.stepId ? localStorage.stepId : null;
    console.log("step id found", stepfoundId);
    if (stepfoundId == null) {
      localStorage.setItem("stepId", JSON.stringify(stepId));
    }
  };

  const [numberOfGroom, setNumberOfGroom] = useState(0);
  const [numberOfBride, setNumberOfBride] = useState(0);
  const [numberOfMarriage, setNumberOfMarriage] = useState(0);

  useEffect(() => {
    getNumberOfGrooms();
  }, []);

  async function getNumberOfGrooms() {
    console.log("groomNumber", getNumberOfGroomsUrl);
    const result = await axios.get(getNumberOfGroomsUrl);
    setNumberOfGroom(result.data.data);
    const numberOfBrideResult = await axios.get(getNumberOfBridesUrl);
    setNumberOfBride(numberOfBrideResult.data.data);

    const numberOfMarriageResult = await axios.get(getNumberOfMarraigesUrl);
    setNumberOfMarriage(numberOfMarriageResult.data.data);
    console.log("groomNumber", numberOfGroom);
  }
  // let token= localStorage.getItem('x-auth-token');
  return (
    <>
      <Breadcrumb>
        <Typography variant="h6">ড্যাশবোর্ড</Typography>
      </Breadcrumb>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 10,
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
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Link href="/marriageInfo" passHref>
                <Paper
                  style={{ cursor: "pointer" }}
                  sx={{
                    p: { xs: 1, md: 2 },
                    "&:hover": {
                      backgroundColor: "primary.main",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                  elevation={3}
                  rounded
                >
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar
                      src={user.avatar}
                      sx={{
                        height: 150,
                        mb: 2,
                        width: 150,
                        border: "2px solid #ececec",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      p: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#0A1172",
                        fontSize: "20px",
                        fontWeight: "700",
                      }}
                    >
                      বিবাহের জন্য নিবন্ধন করুন
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      p: 4,
                    }}
                  >
                    <Image
                      src="/arrow.png"
                      alt="Picture of the author"
                      width={288}
                      height={85}
                    />
                  </Box>
                </Paper>
              </Link>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} xs={12}>
                  <Link href="/user/userProfile" passHref>
                    <Paper
                      style={{ cursor: "pointer" }}
                      sx={{
                        p: { xs: 1, md: 2 },
                        "&:hover": {
                          backgroundColor: "#ffeada",
                          opacity: [0.9, 0.8, 0.7],
                        },
                        height: 123,
                        textAlign: "center",
                      }}
                      elevation={3}
                      rounded
                    >
                      <Grid
                        container
                        spacing={2}
                        py={2}
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Grid item>
                          <Image
                            src="/kaji.png"
                            alt="Picture of the author"
                            width={60}
                            height={60}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            mt={2}
                            sx={{
                              color: "#008000",
                              fontSize: "20px",
                              fontWeight: "700",
                              p: "3px",
                            }}
                          >
                            প্রোফাইল দেখুন
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Avatar
                            sx={{
                              backgroundColor: "#008000",
                              height: 56,
                              width: 56,
                            }}
                          >
                            {" "}
                            <ArrowForwardIosIcon />
                          </Avatar>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Link>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <Link href="/groom/groomIndex" passHref>
                    <Paper
                      style={{ cursor: "pointer" }}
                      sx={{
                        p: { xs: 1, md: 2 },
                        "&:hover": {
                          backgroundColor: "#fae2ff",
                          opacity: [0.9, 0.8, 0.7],
                        },
                        height: 123,
                        textAlign: "center",
                      }}
                      elevation={3}
                      rounded
                    >
                      <Grid
                        container
                        spacing={2}
                        py={2}
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Grid item>
                          <Image
                            src="/bor.png"
                            alt="Picture of the author"
                            width={60}
                            height={60}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            mt={2}
                            sx={{
                              color: "#ffa500",
                              fontSize: "20px",
                              fontWeight: "700",
                            }}
                          >
                            বরের তালিকা
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Avatar
                            sx={{
                              backgroundColor: "#ffa500",
                              height: 56,
                              width: 56,
                            }}
                          >
                            {numberOfGroom}
                          </Avatar>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Link>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <Link href="/bride/brideIndex" passHref>
                    <Paper
                      style={{ cursor: "pointer" }}
                      sx={{
                        p: { xs: 1, md: 2 },
                        "&:hover": {
                          backgroundColor: "#ffe4e6",
                          opacity: [0.9, 0.8, 0.7],
                        },
                        height: 123,
                        textAlign: "center",
                      }}
                      elevation={3}
                      rounded
                    >
                      <Grid
                        container
                        spacing={2}
                        py={2}
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Grid item>
                          <Image
                            src="/kone.png"
                            alt="Picture of the author"
                            width={60}
                            height={60}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            mt={2}
                            sx={{
                              color: "#ff0000",
                              fontSize: "20px",
                              fontWeight: "700",
                            }}
                          >
                            কনের তালিকা
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Avatar
                            sx={{
                              backgroundColor: "#ff0000",
                              height: 56,
                              width: 56,
                            }}
                          >
                            {numberOfBride}
                          </Avatar>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} xs={12}>
                  <Link href="/marriageInfo/marriageIndex" passHref>
                    <Paper
                      style={{ cursor: "pointer" }}
                      sx={{
                        p: { xs: 1, md: 2 },
                        "&:hover": {
                          backgroundColor: "#fff4df",
                          opacity: [0.9, 0.8, 0.7],
                        },
                        height: 123,
                        textAlign: "center",
                      }}
                      elevation={3}
                      rounded
                    >
                      <Grid
                        container
                        spacing={2}
                        py={2}
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Grid item>
                          <Image
                            src="/couple.png"
                            alt="Picture of the author"
                            width={80}
                            height={60}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            mt={2}
                            sx={{
                              color: "#0000ff",
                              fontSize: "20px",
                              fontWeight: "700",
                            }}
                          >
                            বিবাহ সম্পন্ন
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Avatar
                            sx={{
                              backgroundColor: "#0000ff",
                              height: 56,
                              width: 56,
                            }}
                          >
                            {numberOfMarriage}
                          </Avatar>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Link>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <Link href="/coatFee" passHref>
                    <Paper
                      style={{ cursor: "pointer" }}
                      sx={{
                        p: { xs: 1, md: 2 },
                        "&:hover": {
                          backgroundColor: "#fff0de",
                          opacity: [0.9, 0.8, 0.7],
                        },
                        height: 123,
                        textAlign: "center",
                      }}
                      elevation={3}
                      rounded
                    >
                      <Grid
                        container
                        spacing={2}
                        py={2}
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Grid item>
                          <Image
                            src="/taka.png"
                            alt="Picture of the author"
                            width={60}
                            height={60}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            mt={2}
                            sx={{
                              color: "#4b0082",
                              fontSize: "20px",
                              fontWeight: "700",
                            }}
                          >
                            নিবন্ধন ফি
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Avatar
                            sx={{
                              backgroundColor: "#4b0082",
                              height: 56,
                              width: 56,
                            }}
                          >
                            {" "}
                            <ArrowForwardIosIcon />
                          </Avatar>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Link>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <Link href="/nikahnama" passHref>
                    <Paper
                      style={{ cursor: "pointer" }}
                      sx={{
                        p: { xs: 1, md: 2 },
                        "&:hover": {
                          backgroundColor: "#dffff4",
                          opacity: [0.9, 0.8, 0.7],
                        },
                        height: 123,
                        textAlign: "center",
                      }}
                      elevation={3}
                      rounded
                    >
                      <Grid
                        container
                        spacing={2}
                        py={2}
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Grid item>
                          <Image
                            src="/certificate.png"
                            alt="Picture of the author"
                            width={50}
                            height={60}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            mt={2}
                            sx={{
                              color: "#afaf00",
                              fontSize: "20px",
                              fontWeight: "700",
                            }}
                          >
                            সনদ সংগ্রহ
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Avatar
                            sx={{
                              backgroundColor: "#afaf00",
                              height: 56,
                              width: 56,
                            }}
                          >
                            {" "}
                            <ArrowForwardIosIcon />
                          </Avatar>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
