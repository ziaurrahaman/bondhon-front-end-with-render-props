import { Container, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { BrideOrGroomAllInfoGetUrl, getDocumentUrlDummy } from "../../../url/ApiList";

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

const BrideDtl = (props) => {
  //   const [groomDocNo, setGroomDocNo] = useState();
  const [groomRows, setGroomRows] = React.useState({});
  const [groomPrsAdd, setGroomPrsAdd] = React.useState({});
  const [groomParAdd, setGroomParAdd] = React.useState({});
  const [docType, setDocType] = React.useState({});
  const [flagForImage, setFlagForImage] = useState("data:image/jpg;base64,");
  const [picture, setPicture] = useState({
    image: "",
    mimetypeback: "",
  });
  let docNo = { docNo: props.docVal };

  React.useEffect(() => {
    createRowsForGroom(docNo);
  }, []);

  async function createRowsForGroom(docNo) {
    try {
      let docId = docNo.docNo;
      const result = await axios.get(BrideOrGroomAllInfoGetUrl + docId);
      const citizenDtl = result.data.data.citizenInfo;
      const citizenPar = result.data.data.permanentAdress;
      const citizenPrs = result.data.data.presentAdress;

      console.log(result);

      setGroomRows(citizenDtl);
      setGroomParAdd(citizenPar);
      setGroomPrsAdd(citizenPrs);
      setDocType(result.data.data.citizenInfo.citizen_doc_type);

      let payloadBase64 = {
        citizenDocId: docId,
      };

      try {
        const base64Img = await axios.post(getDocumentUrlDummy, payloadBase64);
        const baseImage = base64Img.data.data.doc_img;
        console.log(baseImage);

        setPicture({
          image: baseImage,
          mimetypeback: '.png',
        });

      } catch (error) {
        console.log(error);
      }

    } catch (error) {
      console.log(error);
    }
  }

  //---------------> Date Format -----------
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  };

  return (
    <>
      <Container>
        <Paper sx={{ my: { xs: 2, md: 4 }, p: { xs: 1, md: 2 } }}>
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

                  <Grid container spacing={1} px={2} py={2}>
                    <Grid item xs={12} lg={6} sm={12} md={6}>
                      {groomRows.citizen_doc_type == "nid"||"NID" ? (
                        <Typography>
                          জাতীয় পরিচয়পত্র নাম্বার : {groomRows.citizen_doc_no}
                        </Typography>
                      ) : (
                        <Typography>
                          জন্ম নিবন্ধন নাম্বার : {groomRows.citizen_doc_no}
                        </Typography>
                      )}
                    </Grid>

                    <Grid item xs={12} md={6} sm={12}>
                      <Typography>
                        জন্ম তারিখ : {formatDate(groomRows.citizen_dob)}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} sm={12}>
                      <Typography>নাম : {groomRows.citizen_name}</Typography>
                    </Grid>

                    <Grid item xs={12} md={6} sm={12}>
                      <Typography>
                        মোবাইল নাম্বার : {groomRows.citizen_mobile}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}>
                      <Typography>ইমেইল : {groomRows.citizen_email}</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sm={12}>
                      <Typography>
                        ধর্ম :{" "}
                        {groomRows.citizen_religion == "10"
                          ? "ইসলাম"
                          : groomRows.citizen_religion == "20"
                          ? "হিন্দু"
                          : groomRows.citizen_religion == "30"
                          ? "বৌদ্ধ"
                          : groomRows.citizen_religion == "40"
                          ? "খ্রিষ্টান"
                          : ""}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6} sm={12}>
                      <Typography>
                        পিতার নাম : {groomRows.citizen_father_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}>
                      <Typography>
                        মাতার নাম : {groomRows.citizen_mother_name}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              </Grid>
              <Grid sm={12} md={12} sx={{ mt: 2 }}>
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
                    কনের বর্তমান ঠিকানা
                  </Typography>
                  <Grid container spacing={1} px={2} py={2}>
                    <Grid item xs={12} md={6} sm={12}>
                      <Typography>জেলা : {}</Typography>
                    </Grid>

                    <Grid item xs={12} md={6} sm={12}>
                      <Typography>উপজেলা/সিটি কর্পোরেশন : {}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}>
                      <Typography>ইউনিয়ন/পৌরসভা/থানা : {}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}>
                      {/* <TextField
                        fullWidth
                        label="ওয়ার্ড"
                        name="post_code"
                        required
                        select
                        SelectProps={{ native: true }}
                        variant="outlined"
                        size="small"
                        InputProps={{
                          readOnly: true,
                        }}
                      >
                        {" "}
                        <option>- নির্বাচন করুন -</option>
                        <option value={10}>1216</option>
                        <option value={20}>1000</option>
                      </TextField> */}
                      <Typography>ওয়ার্ড : {}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}>
                      {/* <TextField
                        required
                        id="houseRoadVillage"
                        name="details_address"
                        label="বাড়ি নং, রাস্তা নং, গ্রাম/মহল্লা লিখুন"
                        fullWidth
                        size="small"
                        variant="outlined"
                        disabled
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AddLocationIcon />
                            </InputAdornment>
                          ),
                          readOnly: true,
                        }}
                      /> */}
                      <Typography>
                        বাড়ি নং, রাস্তা নং, গ্রাম/মহল্লা : {}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              </Grid>
              <Grid sm={12} md={12} sx={{ mt: 2 }}>
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
                    কনের স্থায়ী ঠিকানা
                  </Typography>
                  <Grid container spacing={1} px={2} py={2}>
                    <Grid item xs={12} md={6} sm={12}>
                      <Typography>জেলা : {}</Typography>
                    </Grid>

                    <Grid item xs={12} md={6} sm={12}>
                      <Typography>উপজেলা/সিটি কর্পোরেশন : {}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}>
                      <Typography>ইউনিয়ন/পৌরসভা/থানা : {}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}>
                      <Typography>ওয়ার্ড : {}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}>
                      <Typography>
                        বাড়ি নং, রাস্তা নং, গ্রাম/মহল্লা : {}
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
                    fontWeight: "bold",
                    background: "#ddd",
                    p: 1,
                  }}
                >
                  কনের ছবি
                </Typography>
                <Image
                  src={
                    picture.image
                      ? flagForImage + picture.image
                      : "/bride.png"
                  }
                  alt="Bride Picture"
                  width={160}
                  height={160}
                />
              </Grid>
              <Grid sm={12} md={12} xs={12} sx={{ marginTop: 0.5 }}>
                <Typography
                  variant="p"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    mb: 1,
                    fontWeight: "bold",
                    background: "#ddd",
                    p: 1,
                  }}
                >
                  আঙুলের ছাপ
                </Typography>
                <Image
                  src="/Success2.png"
                  alt="Groom Finger Right"
                  width={120}
                  height={120}
                />
              </Grid>
              <Grid sm={12} md={12} xs={12} sx={{ marginTop: 1.5 }}>
                <Typography
                  variant="p"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    mb: 1,
                    fontWeight: "bold",
                    background: "#ddd",
                    p: 1,
                  }}
                >
                  স্বাক্ষর
                </Typography>

                <Image
                  src="/sig.jpg"
                  alt="Groom Finger Right"
                  width={120}
                  height={120}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default BrideDtl;
