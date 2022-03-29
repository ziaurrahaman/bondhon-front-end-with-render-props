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
import {
  getNumberOfGroomsUrl,
  getNumberOfBridesUrl,
  getNumberOfMarraigesUrl,
} from "../../../url/ApiList";
import axios from "axios";

const user = {
  avatar: "/wedd.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

const BrideDashboard = (props) => {
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
              <Link href="/bride" passHref>
                <Paper
                  style={{ cursor: "pointer" }}
                  sx={{
                    p: { xs: 1, md: 2 },
                    "&:hover": {
                      backgroundColor: "#ffeada",
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
                </Paper>
              </Link>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <Link href="/user/userProfile" passHref>
                <Paper
                  style={{ cursor: "pointer" }}
                  sx={{
                    p: { xs: 1, md: 2 },
                    "&:hover": {
                      backgroundColor: "#ffeada",
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
                      src="/female_profile.png"
                      sx={{
                        height: 150,
                        mb: 2,
                        width: 150,
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
                      প্রোফাইল দেখুন
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <Link href="/nikahnama" passHref>
                <Paper
                  style={{ cursor: "pointer" }}
                  sx={{
                    p: { xs: 1, md: 2 },
                    "&:hover": {
                      backgroundColor: "#ffeada",
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
                      src="/certificate_imge2.jpg"
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
                      সনদ সংগ্রহ
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default BrideDashboard;
