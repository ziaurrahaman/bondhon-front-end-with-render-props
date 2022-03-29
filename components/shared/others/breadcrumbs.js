import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Box, Container, Typography, Breadcrumbs } from "@mui/material";

const Crumbs = ({ children }) => {
  const [userType, setUserType] = useState("");
  useEffect(() => {
    console.log("User");
    const type = JSON.parse(localStorage.getItem("userData"));
    setUserType(type.citizen_type);
  }, [userType]);
  // const getDataFromLocalStorage = () => {
  //   console.log("UserTTTTTTTTTTTT");

  //   console.log("UserTTTTTTTTTTTT", type);

  // };

  const getLink = (type) => {
    console.log("UserTTTTTTTTTTTTInfunction", type);
    if (type === "B") {
      return "/BrideDashboard";
    } else if (type === "K") {
      return "/dashboard";
    } else if (type === "G") {
      return "/GroomDashboard";
    } else {
      return "";
    }
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2.5,
          backgroundColor: "#f26d3e",
        }}
      >
        <Container maxWidth="xl">
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ color: "#FFFFFF", fontSize: "20px" }}
          >
            <Link href={getLink(userType ? userType : "")} passHref>
              <Typography
                sx={{ display: "flex", alignItems: "center", fontSize: "20px" }}
                color="#FFFFFF"
              >
                <HomeIcon
                  sx={{ mr: 0.5 }}
                  fontSize="inherit"
                  style={{ cursor: "pointer" }}
                />
              </Typography>
            </Link>
            <Typography
              sx={{ display: "flex", alignItems: "center", fontSize: "20px" }}
              color="#FFFFFF"
            >
              <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {children}
            </Typography>
          </Breadcrumbs>
        </Container>
      </Box>
    </>
  );
};

export default Crumbs;
