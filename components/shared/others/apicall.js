/* eslint-disable react-hooks/exhaustive-deps */
// ********************Developed by Md. Hasibuzzaman ******************************************
import React, { useEffect, useState } from "react";
import { Grid, Tooltip, Table, TableBody, TableCell, TableHead, TableRow, Divider, CardMedia, TableContainer, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "react-confirm-alert/src/react-confirm-alert.css";
import { useRouter, Redirect } from "next/router";
import axios from "axios";
import { SamityRegistrationReport, samityStepReg } from "../../../../url/ApiList";
import Title from "../../../shared/others/Title";
import AppTitle from "../../../shared/others/AppTitle";
import jwt from "jsonwebtoken";

function SamityRegReport() {
  const router = useRouter();
  const token = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("token")) : null;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getId = typeof window !== "undefined" ? JSON.parse(localStorage.storeId) : null;
  const getName = typeof window !== "undefined" ? JSON.parse(localStorage.storeName) : null;
  const [samityInfo, setSamityInfo] = useState([]);
  const [committee, setCommittee] = useState([]);
  const [committeePerson, setCommitteePerson] = useState([]);
  const [incomeExpenses, setIncomeExpenses] = useState([]);
  const [totalExpAmt, setTotalExpAmt] = useState("");
  const [totalIncAmt, setTotalIncAmt] = useState("");
  const [membersData, setMembersData] = useState([]);
  const [membersFin, setMembersFin] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [workingArea, setWorkingArea] = useState([]);
  const [memberArea, setMemberArea] = useState([]);
  // console.log("workingArea", workingArea);
  // console.log("memberArea", memberArea);

  const budgetkey = Object.keys(budgets);
  // console.log('samityInfo', samityInfo);

  useEffect(() => {
    const decoded = jwt.decode(token);
    // if(decoded===null){
    //   router.push("http://rdcd.gov.bd/");
    // }
    // console.log('getId', getId);
    // if (getId===null || getName===null) {
    //   router.push("http://rdcd.gov.bd/");
    // }
    samityReport();
  }, []);

  const samityReport = async () => {
    const samityData = await axios.get(SamityRegistrationReport + getId, config);
    const data = samityData.data.data;
    console.log('data=============', data)
    setSamityInfo(data.samityInfo);
    setCommittee(data.committee.committeeMembers);
    setCommitteePerson(data.committee);
    setMembersData(data.members);
    setBudgets(data.budgets);
    setIncomeExpenses(data.incomeExpenses);
    setMembersFin(data.membersFinancial);
    setWorkingArea(data.workingArea);
    setMemberArea(data.memberArea);
    // console.log("data", data);
    let expAmount = 0;
    for (let i = 0; data.incomeExpenses && i < data.incomeExpenses.length; i++) {
      expAmount += data.incomeExpenses[i].expAmt;
    }
    setTotalExpAmt(expAmount);
    let incAmount = 0;
    for (let i = 0; data.incomeExpenses && i < data.incomeExpenses.length; i++) {
      incAmount += data.incomeExpenses[i].incAmt;
    }
    setTotalIncAmt(incAmount);
  };

  const totalIncAmount = (inc) => {
    let incAmount = 0;
    for (let i = 0; inc && i < inc.length; i++) {
      incAmount += inc[i].incAmt;
    }
    return incAmount
  }
  const totalExpAmtmount = (inc) => {
    let expAmount = 0;
    for (let i = 0; inc && i < inc.length; i++) {
      expAmount += inc[i].expAmt;
    }
    return expAmount
  }

  const previousPage = () => {
    router.push({ pathname: "/coop/add-bye-laws" });
  }
  const element = samityInfo.byLaw;
  const nextPage = async () => {
    //////////////////////////////////////////////    steper code insert sention added Hasib//////////////////
    const getRedirectUrl = await axios.get(samityStepReg + '?samityId=' + getId, config);
    const redirectmainData = getRedirectUrl.data.data[0];
    if (redirectmainData.lastStep == 8) {
      let payLoadOfStep =
      {
        id: redirectmainData.id,
        samityId: redirectmainData.samityId,
        citizenId: redirectmainData.citizenId,
        status: "c",
        lastStep: 9,
        url: "/reports",
        samityName: redirectmainData.samityName
      }
      try {
        const dataStoreId = await axios.put(samityStepReg, payLoadOfStep, config);
        localStorage.setItem("stepId", JSON.stringify(0));
        localStorage.removeItem("storeId");
        localStorage.removeItem("storeName");
        localStorage.removeItem("selectArea");
        localStorage.setItem("reportsId", JSON.stringify(redirectmainData.samityId));
        router.push({ pathname: "/reports" });
      } catch (err) {

      }

    }
    //////////////////////////////////////////////    steper code insert sention added Hasib//////////////////

  };
  return (
    <>
      <Grid item md={12} xs={12} mx={2} my={2} px={2} py={2} sx={{ backgroundColor: '#2b285c', borderRadius: '10px' }} >
        <Grid container spacing={1.5} sx={{ color: '#FFF' }}>
          <Grid item md={4} xs={12}>
            <span>প্রকল্পের নাম : </span>
            <span> {samityInfo.projectName}</span>
          </Grid>
          <Grid item md={4} xs={12}>
            <span>সমিতির নাম : </span>
            <span> {samityInfo.samityName}</span>
          </Grid>
          <Grid item md={4} xs={12}>
            <span>সমিতির শ্রেনী : </span>
            <span> {samityInfo.samityTypeName} </span>
          </Grid>
          <Grid item md={12} xs={12}>
            <span>সমিতির ঠিকানা : </span>
            <span>
              &nbsp;
              {samityInfo.officeDetailsAddress}, {samityInfo.officeUnionName},&nbsp;
              {samityInfo.officeCityCorpName}, {samityInfo.officeDistrictName},&nbsp;
              {samityInfo.officeDivisionName}
            </span>
          </Grid>
        </Grid>
      </Grid>

      <Grid container style={{ display: "flex", justifyContent: "space-between" }} my={2} px={2}>
        <Grid item lg={12} md={12} xs={12}>
          <Title>
            <Typography variant="h5" sx={{
              color: "#301934"
            }}>সমিতির কার্যালয়ের ঠিকানা</Typography>
          </Title>
          <Grid container px={2}>
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead sx={{ backgroundColor: "#FAFAFA" }}>
                  <TableRow>
                    <TableCell sx={{ width: "10%", align: "left" }}>ঠিকানা</TableCell>
                    <TableCell sx={{ width: "15%", align: "left" }}>বিভাগ</TableCell>
                    <TableCell sx={{ width: "15%", align: "left" }}>জেলা</TableCell>
                    <TableCell sx={{ width: "15%", align: "left" }}>উপজেলা/থানা</TableCell>
                    <TableCell sx={{ width: "15%", align: "left" }}>সিটি কর্পোরেশন</TableCell>
                    <TableCell sx={{ width: "15%", align: "left" }}>ইউানয়ন/ওয়াড</TableCell>
                    <TableCell sx={{ width: "15%", align: "left" }}>গ্রাম/মহল্লা</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ "td, th": { border: 1 } }}>
                    <TableCell component="th" scope="row" sx={{ width: "10%" }}> {" "} কার্যালয় {" "} </TableCell>
                    <TableCell component="td" sx={{ width: "14%", p: '5px' }}>{samityInfo.officeDivisionName}</TableCell>
                    <TableCell component="td" sx={{ width: "14%", p: '5px' }}>{samityInfo.officeDistrictName}</TableCell>
                    <TableCell component="td" sx={{ width: "14%", p: '5px' }}>{samityInfo.officeDivisionName}</TableCell>
                    <TableCell component="td" sx={{ width: "14%", p: '5px' }}>{samityInfo.officeCityCorpName}</TableCell>
                    <TableCell component="td" sx={{ width: "14%", p: '5px' }}>{samityInfo.officeUnionName}</TableCell>
                    <TableCell component="td" sx={{ width: "14%", p: '5px' }}>{samityInfo.officeDetailsAddress}</TableCell>
                  </TableRow>
                  {/* member select area  */}
                  {memberArea.map((member) => (
                    <TableRow key={member.divisionName} sx={{ "td, th": { border: 1 } }}>
                      <TableCell component="th" scope="row" sx={{ p: "5px" }}>
                        {" "}সদস্য নির্বাচনী এলাকা{" "}
                      </TableCell>
                      <TableCell sx={{ p: "5px" }}>{member.divisionName}</TableCell>
                      <TableCell sx={{ p: "5px" }}>{member.districtName}</TableCell>
                      <TableCell sx={{ p: "5px" }}>{member.upazilaName}</TableCell>
                      <TableCell sx={{ p: "5px" }}>{member.cityCorpName}</TableCell>
                      <TableCell sx={{ p: "5px" }}>{member.unionName}</TableCell>
                      <TableCell sx={{ p: "5px" }}>{member.detailsAddress}</TableCell>
                    </TableRow>
                  ))}
                  {/* member select area  */}
                  {workingArea.map((working) => (
                    <TableRow key={working.divisionName} sx={{ "td, th": { border: 1 } }}>
                      <TableCell component="th" scope="row" sx={{ p: "5px" }}>
                        {" "}কর্ম এলাকা{" "}
                      </TableCell>
                      <TableCell sx={{ p: "5px" }}>{working.divisionName}</TableCell>
                      <TableCell sx={{ p: "5px" }}>{working.districtName}</TableCell>
                      <TableCell sx={{ p: "5px" }}>{working.upazilaName}</TableCell>
                      <TableCell sx={{ p: "5px" }}>{working.cityCorpName}</TableCell>
                      <TableCell sx={{ p: "5px" }}>{working.unionName}</TableCell>
                      <TableCell sx={{ p: "5px" }}>{working.detailsAddress}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>

      <Grid container style={{ display: "flex", justifyContent: "space-between" }} my={2} px={2}>
        <Grid item lg={12} md={12} xs={12}>
          <Title>
            <Typography variant="h5" sx={{
              color: "#301934"
            }}>শেয়ারের তথ্যাদি</Typography>
          </Title>
          <Grid container spacing={1.8} px={2}>
            <Grid item md={4} xs={12}>
              <span>শেয়ার সংখ্যা - {samityInfo.noOfShare} </span>
            </Grid>
            <Grid item md={4} xs={12}>
              <span>বিক্রিত শেয়ার সংখ্যা - {samityInfo.soldShare} </span>
            </Grid>
            <Grid item md={4} xs={12}>
              <span>প্রতিটি শেয়ার মূল্য - {samityInfo.sharePrice}</span>
            </Grid>
            <Grid item md={4} xs={12}>
              <span>
                বিক্রিত শেয়ার মূলধন - {samityInfo.noOfShare * samityInfo.soldShare}
              </span>
            </Grid>
            <Grid item md={4} xs={12}>
              <span>
                প্রস্তাবিত শেয়ার মূল্ধন -{" "}
                {samityInfo.noOfShare * samityInfo.sharePrice}
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container style={{ display: "flex", justifyContent: "space-between" }} my={2} px={2}>
        <Grid item lg={12} md={12} xs={12}>
          <Title>
            <Typography variant="h5" sx={{
              color: "#301934"
            }}>সমিতির অন্যান্য তথ্যাদি</Typography>
          </Title>
          <Grid container spacing={1.8} px={2}>
            <Grid item md={4} xs={12}>
              <span>ফোন নং - {samityInfo.phoneNo} </span>
            </Grid>
            <Grid item md={4} xs={12}>
              <span>ওয়েব সাইট - {samityInfo.website}</span>
            </Grid>
            <Grid item md={4} xs={12}>
              <span>মোবাইল নং - {samityInfo.mobileNo}</span>
            </Grid>
            <Grid item md={4} xs={12}>
              <span>উদ্যোগী সংস্থার নাম - {samityInfo.enterprisingOrg}</span>
            </Grid>
            <Grid item md={4} xs={12}>
              <span>ই - মেইল - ‍{samityInfo.emailId}</span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container style={{ display: "flex", justifyContent: "space-between" }} my={2} px={2}>
                <Grid item lg={12} md={12} xs={12}>
                    <Title>
                        <Typography variant="h5" sx={{
                            color: "#301934"
                        }}>সদস্যের তালিকা</Typography>
                    </Title>
                    <Grid container px={2}>
                        <TableContainer>
                            <Table size="small" aria-label="a dense table">
                                <TableHead sx={{ backgroundColor: "#FAFAFA" }}>
                                    <TableRow>
                                        <TableCell sx={{ width: "5%", align: "left" }}>ক্রমিক</TableCell>
                                        <TableCell sx={{ width: "8%", align: "left" }}>এনআইডি</TableCell>
                                        <TableCell sx={{ width: "5%", align: "left" }}>জন্মতারিখ</TableCell>
                                        <TableCell sx={{ width: "15%", align: "left" }}>নাম</TableCell>
                                        <TableCell sx={{ width: "10%", align: "left" }}>পেশা</TableCell>
                                        <TableCell sx={{ width: "7%", align: "left" }}>মোবাইল</TableCell>
                                        <TableCell sx={{ width: "5%", align: "left" }}>পদবী</TableCell>
                                        <TableCell sx={{ width: "5%", align: "left" }}>শেয়ার</TableCell>
                                        <TableCell sx={{ width: "5%", align: "left" }}>সঞ্চয়</TableCell>
                                        <TableCell sx={{ width: "5%", align: "left" }}>ঋণ</TableCell>
                                        <TableCell sx={{ width: "20%", align: "left" }}>ঠিকানা</TableCell>
                                        <TableCell sx={{ width: "5%", align: "left" }}>ছবি</TableCell>
                                        <TableCell sx={{ width: "5%", align: "left" }}>স্বাক্ষর</TableCell>
                                        <TableCell sx={{ width: "5%", align: "left" }}>প্রত্যয়ন</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                {membersData.map((memb, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ p: "5px" }}>
                      {" "}
                      {i + 1}{" "}
                    </TableCell>
                    <TableCell sx={{ p: "5px" }}>{memb.nid}</TableCell>
                    <TableCell sx={{ p: "5px" }}>{memb.dob}</TableCell>
                    <TableCell sx={{ p: "5px" }}>{memb.memberName}</TableCell>
                    <TableCell sx={{ p: "5px" }}>{memb.occupationNameBangla}</TableCell>
                    <TableCell sx={{ p: "5px" }}>{memb.mobileNo}</TableCell>
                    <TableCell sx={{ p: "5px" }}>deg</TableCell>
                    <TableCell sx={{ p: "5px" }}>share</TableCell>
                    <TableCell sx={{ p: "5px" }}>savings</TableCell>
                    <TableCell sx={{ p: "5px" }}>loan</TableCell>
                    <TableCell sx={{ p: "5px" }}>{memb.presentAddress}</TableCell>
                    <TableCell sx={{ p: "5px" }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 50 }}
                        image={memb.memberPhotoUrl}
                      />
                    </TableCell>
                    <TableCell sx={{ p: "5px" }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 50 }}
                        image={memb.memberSignUrl}
                      />
                    </TableCell>
                    <TableCell sx={{ p: "5px" }}>
                      {
                        <CardMedia
                          component="img"
                          sx={{ width: 50 }}
                          image={memb.memberTestimonialUrl}
                        />
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container style={{ display: "flex", justifyContent: "space-between" }} my={2} px={2}>
                <Grid item lg={12} md={12} xs={12}>
                    <Title>
                        <Typography variant="h5" sx={{
                            color: "#301934"
                        }}>কমিটির পদ বরাদ্ধকরন</Typography>
                    </Title>
                    <Grid container spacing={1.5} px={2}>
                        <Grid item lg={4} md={6} xs={12}>
                            <span>সংগঠক - {''} </span>
                        </Grid>
                        <Grid item lg={4} md={6} xs={12}>
                            <span>যোগাযোগের ব্যক্তি - {''} </span>
                        </Grid>
                        <Grid item lg={4} md={6} xs={12}>
                            <span>স্বাক্ষরিত ব্যক্তি - {''}</span>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1.5} px={2} py={2}>
                        <TableContainer>
                            <Table size="small" aria-label="a dense table">
                                <TableHead sx={{ backgroundColor: "#FAFAFA" }}>
                                    <TableRow>
                                        <TableCell sx={{ width: "5%", align: "left" }}>ক্রমিক</TableCell>
                                        <TableCell sx={{ width: "50%", align: "left" }}>সদস্যের নাম</TableCell>
                                        <TableCell sx={{ width: "40%", align: "left" }}>পদবী</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                {committee.map((degs, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ p: "5px" }}>
                      {" "}
                      {i + 1}{" "}
                    </TableCell>
                    <TableCell sx={{ p: "5px" }}>{degs.memberName}</TableCell>
                    <TableCell sx={{ p: "5px" }}>{degs.roleName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>

      <Grid item md={12} xs={12} mx={2} mt={1} mb={1} px={2} sx={{ backgroundColor: '#F9F9F9', borderRadius: '10px' }} >
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          style={{ color: "#1976d2", textAlign: 'center', padding: '10px', textShadow: '1px 1px #FF0000' }}
        >
          পদবী বরাদ্ধকরন
        </Typography>
        <Grid container spacing={1.8}>
          <Grid item md={4} xs={12}>
            <span>সংগঠক - {committeePerson.committeeOrganizer}</span>
          </Grid>
          <Grid item md={4} xs={12}>
            <span>
              যোগাযোগের ব্যক্তি - {committeePerson.committeeContactPerson}
            </span>
          </Grid>
          <Grid item md={4} xs={12}>
            <span>
              স্বাক্ষরিত ব্যক্তি - {committeePerson.committeeSignatoryPerson}
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={2} p={3}>
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead sx={{ backgroundColor: "#d29119" }}>
                <TableRow>
                  <TableCell sx={{ width: "5%", align: "left" }}>ক্রমিক</TableCell>
                  <TableCell sx={{ width: "50%", align: "left" }}>সদস্যের নাম</TableCell>
                  <TableCell sx={{ width: "40%", align: "left" }}>পদবী</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {committee.map((degs, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ p: "5px" }}>
                      {" "}
                      {i + 1}{" "}
                    </TableCell>
                    <TableCell sx={{ p: "5px" }}>{degs.memberName}</TableCell>
                    <TableCell sx={{ p: "5px" }}>{degs.roleName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Grid item md={12} xs={12} mx={2} mt={1} mb={1} px={2} sx={{ backgroundColor: '#F9F9F9', borderRadius: '10px' }} >
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          style={{ color: "#1976d2", textAlign: 'center', padding: '10px', textShadow: '1px 1px #FF0000' }}
        >
          জমা খরচের হিসাব
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={6} xs={6}>
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead sx={{ backgroundColor: "#d29119" }}>
                  <TableRow>
                    <TableCell colSpan={3} sx={{ textAlign: "center", backgroundColor: "#2b285c9e", color: "white" }}
                    >
                      জমা{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: "20%", align: "left" }}>জিএল আইডি</TableCell>
                    <TableCell sx={{ width: "40%", align: "left" }}>জিএল নাম</TableCell>
                    <TableCell sx={{ width: "40%", textAlign: "right" }}>
                      টাকা
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomeExpenses.map(
                    (incexps, i) =>
                      incexps.incAmt != 0 && (
                        <TableRow key={i}>
                          <TableCell sx={{ p: "5px" }}>
                            {" "}
                            {incexps.incAmt != 0 && incexps.glacCode}{" "}
                          </TableCell>
                          <TableCell sx={{ p: "5px" }}>
                            {" "}
                            {incexps.incAmt != 0 && incexps.glacName}{" "}
                          </TableCell>
                          <TableCell sx={{ p: "5px", textAlign: "right" }}>
                            {incexps.incAmt != 0 && incexps.incAmt}
                          </TableCell>
                        </TableRow>
                      )
                  )}
                  {/* total amount  */}
                  <TableRow>
                    <TableCell colSpan={2} sx={{ textAlign: "right" }}>
                      সর্বমোট
                    </TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      {totalIncAmt}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={6} xs={6}>
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead sx={{ backgroundColor: "#d29119" }}>
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      sx={{
                        textAlign: "center",
                        backgroundColor: "#2b285c9e",
                        color: "white",
                      }}
                    >
                      খরচ{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: "20%" }}>জিএল আইডি</TableCell>
                    <TableCell sx={{ width: "40%" }}>জিএল নাম</TableCell>
                    <TableCell sx={{ width: "40%", textAlign: "right" }}>টাকা</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomeExpenses.map(
                    (incexps, i) =>
                      incexps.expAmt != 0 && (
                        <TableRow key={i}>
                          <TableCell sx={{ p: "5px" }}>
                            {" "}
                            {incexps.expAmt != 0 && incexps.glacCode}{" "}
                          </TableCell>
                          <TableCell sx={{ p: "5px" }}>
                            {" "}
                            {incexps.expAmt != 0 && incexps.glacName}{" "}
                          </TableCell>
                          <TableCell sx={{ textAlign: "right", p: "5px" }}>
                            {incexps.expAmt != 0 && incexps.expAmt}
                          </TableCell>
                        </TableRow>
                      )
                  )}
                  {/* total amount  */}
                  <TableRow>
                    <TableCell colSpan={2} sx={{ textAlign: "right" }}>
                      সর্বমোট
                    </TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      {totalExpAmt}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>
        </Grid>
      </Grid>

      {/* budget table start  */}

      {budgetkey.map((key) => (
        <Grid key={key} item md={12} xs={12} mx={2} mt={1} mb={1} px={2} sx={{ backgroundColor: '#F9F9F9', borderRadius: '10px' }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            style={{ color: "#1976d2", textAlign: 'center', padding: '10px', textShadow: '1px 1px #FF0000' }}
          >
            সমিতির বাজেট&nbsp;&nbsp;
            {key.toString() ? key.substring(0, 4) + "-" + key.substring(4, 8) : ""}
          </Typography>
          <Grid container xs={12} md={12} sm={12}>
            <Grid item md={6} xs={6}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#d29119" }}>
                  <TableRow>
                    <TableCell colSpan={3} sx={{ textAlign: "center", backgroundColor: "#2b285c9e", color: "white" }} >
                      জমা{" "}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>জিএল আইডি</TableCell>
                    <TableCell>জিএল নাম</TableCell>
                    <TableCell sx={{ borderRight: 1, textAlign: 'right' }}>টাকা</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {budgets[key].map((incexps, i) => (
                    (incexps.incAmt != 0) && (
                      <TableRow key={i}>
                        <TableCell> {(incexps.incAmt != 0) && (incexps.glacCode)} </TableCell>
                        <TableCell> {(incexps.incAmt != 0) && (incexps.glacName)} </TableCell>
                        <TableCell sx={{ borderRight: 1, textAlign: 'right' }}>{(incexps.incAmt != 0) && (incexps.incAmt)}</TableCell>
                      </TableRow>
                    )
                  ))}
                  {/* total amount  */}

                  <TableRow >
                    <TableCell colSpan={2} sx={{ textAlign: 'right' }}>সর্বমোট</TableCell>
                    <TableCell sx={{ borderRight: 1, textAlign: 'right' }}>{totalIncAmount(budgets[key])}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <Grid item md={6} xs={6}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#d29119" }}>
                  <TableRow>
                    <TableCell colSpan={3} sx={{ textAlign: "center", backgroundColor: "#2b285c9e", color: "white" }} >
                      খরচ{" "}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>জিএল আইডি</TableCell>
                    <TableCell>জিএল নাম</TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>টাকা</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {budgets[key].map((incexps, i) => (
                    (incexps.expAmt != 0) && (
                      <TableRow key={i}>
                        <TableCell> {(incexps.expAmt != 0) && (incexps.glacCode)} </TableCell>
                        <TableCell> {(incexps.expAmt != 0) && (incexps.glacName)} </TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>{(incexps.expAmt != 0) && (incexps.expAmt)}</TableCell>
                      </TableRow>
                    )
                  ))}
                  {/* total amount  */}
                  <TableRow >
                    <TableCell colSpan={2} sx={{ textAlign: 'right' }}>সর্বমোট</TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>{totalExpAmtmount(budgets[key])}</TableCell>

                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      ))}

      <Grid item md={12} xs={12} mx={2} mt={1} mb={1} px={2} sx={{ backgroundColor: '#F9F9F9', borderRadius: '10px' }} >
        <Typography variant="h5" gutterBottom component="div" style={{ color: "#1976d2", textAlign: 'center', padding: '10px', textShadow: '1px 1px #FF0000' }}> উপ আইন </Typography>
        <div dangerouslySetInnerHTML={{ __html: element }}></div>
      </Grid>
      <Divider />
      <Grid container>
        <Grid item xs={12} md={12} sm={12} mx={3} my={2} sx={{ textAlign: "center" }}>

          <Tooltip title="আগের পাতায়">
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 1 }}
              startIcon={<ArrowBackIosIcon />}
              onClick={previousPage}
            > আগের পাতায়
            </Button>
          </Tooltip>
          <Tooltip title="চূড়ান্ত জমা">
            <Button
              variant="contained"
              color="success"
              sx={{ mr: 1 }}
              endIcon={<SendIcon />}
              onClick={nextPage}
            >
              <SaveIcon sx={{ display: "block" }} />
              &nbsp; চূড়ান্ত জমা ও পরবর্তী পাতায়
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}

export default SamityRegReport;
