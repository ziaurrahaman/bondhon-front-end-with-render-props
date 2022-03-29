import { React, useState } from "react";
import {
  Grid,
  Typography,
  InputAdornment,
  TextField,
  Container,
  Paper,
  Tooltip,
  Button,
  Box,
  Divider,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Fade,
  Modal,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AbcIcon from "@mui/icons-material/Abc";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PercentIcon from "@mui/icons-material/Percent";
import EmojiSymbolsIcon from "@mui/icons-material/EmojiSymbols";
import TitleIcon from "@mui/icons-material/Title";
import SaveIcon from "@mui/icons-material/Save";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Backdrop from "@mui/material/Backdrop";
var numberToBengliWords = require("number-to-bengli-words");

import Title from "../../shared/others/HeadTitle";
import Breadcrumb from "../../shared/others/breadcrumbs";
import {
  getMarriageInfoReportByIdUrl,
  sslPaymentRequestUrl,
} from "../../../url/ApiList";
import axios from "axios";
import { Card, CardMedia, CardContent, CardHeader } from "@mui/material";
import PaymentModal from "./payment_modal";

const CoatFee = () => {
  const [transType, setTransType] = useState("");

  const handleTransType = (event) => {
    setTransType(event.target.value);
  };
  const [paymentInfo, setPaymentInfo] = useState({
    nikahnama_number: "",
    denmohor: "",
    coat_fee: "",
  });
  const fetchMarriagePaymentInfo = async (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      const marriageInfo = await axios.get(
        getMarriageInfoReportByIdUrl + paymentInfo.nikahnama_number
      );

      if (marriageInfo.data.data) {
        const feeInWords = numberToBengliWords.toBengaliWords(
          calculateDenmohor(marriageInfo.data.data.mrg_denmohor)
        );
        setPaymentInfo({
          ...paymentInfo,
          denmohor: marriageInfo.data.data.mrg_denmohor,
          coat_fee: feeInWords,
        });
      } else {
        setPaymentInfo({
          nikahnama_number: "",
          denmohor: "",
          coat_fee: "",
        });
      }
      console.log("mrgresult", marriageInfo);
    }
  };
  // const getPaymentSuccessfullData = async () => {
  //   console.log("paymentSuccess");
  //   const success = await axios.post(
  //     "http://localhost:8081/ssl-payment-success/success"
  //   );
  // };
  const handleSslPayment = async (e) => {
    if (paymentInfo.coat_fee !== "") {
      setPaymentInfo({
        nikahnama_number: "",
        denmohor: "",
        coat_fee: "",
      });
      try {
        console.log("sslUrl", sslPaymentRequestUrl);

        const paymentPayload = {
          coatFee: calculateDenmohor(paymentInfo.denmohor),
          nikahnama_number: paymentInfo.nikahnama_number,
        };
        const sslResponse = await axios.post(
          sslPaymentRequestUrl,
          paymentPayload
        );

        console.log("sslResponse", sslResponse);
        window.open(sslResponse.data);
        // console.log("opeeeen", openWindow);
        // openWindow.close("http://localhost:8081/ssl-payment-success/success");
      } catch (error) {
        console.log("sslErrror", error);
      }
    }
    if (paymentInfo.coat_fee === "") {
      handleOpen();
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "nikahnama_number":
        setPaymentInfo({ ...paymentInfo, [name]: value });
        break;
      case "denmohor":
        setPaymentInfo({ ...paymentInfo, [name]: value });
        break;
    }
  };

  const calculateDenmohor = (denmohor) => {
    if (denmohor === "") {
      return "";
    }
    if (denmohor <= 400000) {
      const finalDenmohor = (denmohor * 1.25) / 100;
      if (finalDenmohor < 200) {
        return 200;
      } else {
        return finalDenmohor;
      }
    }
    if (denmohor > 400000) {
      const denmohor1 = (400000 * 1.25) / 100;
      const above4lak = (denmohor - 400000) / 100000;
      const den4 = above4lak * 100;
      const totalDenmohor = den4 + denmohor1;
      return totalDenmohor;
    }
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    backgroundColor: "white",
  };

  return (
    <>
      <Breadcrumb>
        <Typography variant="h6">নিবন্ধন ফি</Typography>
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
          <Paper
            sx={{ my: { xs: 2, md: 4 }, p: { xs: 1, md: 2 } }}
            elevation={3}
            rounded
            style={{ marginTop: "3%" }}
          >
            <Title>
              <Typography variant="h6">নিবন্ধন ফি</Typography>
            </Title>

            <Grid container spacing={3} px={2} py={2}>
              {/* 
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  required
                  name="nid"
                  label="জাতীয় পরিচয়পত্র নাম্বার"
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
              </Grid> */}
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  required
                  name="nikahnama_number"
                  label="নিকাহানামা নাম্বার"
                  fullWidth
                  size="small"
                  autoComplete="given-name"
                  variant="outlined"
                  value={paymentInfo.nikahnama_number}
                  onChange={handleChange}
                  onKeyUp={fetchMarriagePaymentInfo}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AbcIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* <Grid item xs={12} sm={12} md={4}>
                <TextField
                  required
                  name="regNo"
                  label="সনদপত্র নাম্বার"
                  fullWidth
                  size="small"
                  autoComplete="given-name"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AbcIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid> */}
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  name="denmohor"
                  label="দেনমোহরের পরিমাণ"
                  fullWidth
                  size="small"
                  autoComplete="given-name"
                  variant="outlined"
                  value={paymentInfo.denmohor}
                  handleChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ConfirmationNumberIcon />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
              </Grid>
              {/* <Grid item xs={12} sm={12} md={4}>
                <TextField
                  name="denMohor"
                  label="শতকরায় দেনমোহর"
                  fullWidth
                  size="small"
                  autoComplete="given-name"
                  variant="outlined"
                  value={3}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PercentIcon />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
              </Grid> */}
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  required
                  name="denMohor"
                  label="মোট নিবন্ধন ফি"
                  fullWidth
                  size="small"
                  autoComplete="given-name"
                  variant="outlined"
                  value={calculateDenmohor(paymentInfo.denmohor)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmojiSymbolsIcon />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  required
                  name="nid"
                  label="কথায়"
                  fullWidth
                  size="small"
                  autoComplete="family-name"
                  variant="outlined"
                  value={paymentInfo.coat_fee + " টাকা মাত্র"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                container
                spacing={2}
                py={2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid item size="small">
                  <Typography variant="6" sx={{ color: "green" }}>
                    * সর্বনিন্ম নিবন্ধন ফি দুইশত টাকা
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="6" sx={{ color: "green" }}>
                    * দেনমোহর চার লাখ টাকা পর্যন্ত নিবন্ধন ফি প্রতি হাজারে বারো
                    টাকা পঞ্চাশ পয়সা
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="6" sx={{ color: "green" }}>
                    * দেনমোহর চার লক্ষ টাকার উপরে প্রতিলাখের জন্য নিবন্ধন ফি
                    একশত টাকা
                  </Typography>
                </Grid>
              </Grid>

              {/* <Grid item xs={12} sm={12} lg={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Card>
                      <CardMedia image="./credit_card3.png">Mobile</CardMedia>
                    </Card>
                  </Grid>
                </Grid> */}
              {/* <FormControl component="fieldset"> */}
              {/* <RadioGroup
                    row
                    aria-label="position"
                    name="transType"
                    defaultValue="top"
                  >
                    <FormControlLabel
                      value="bkash"
                      control={<Radio color="primary" />}
                      label="বিকাশ নাম্বার"
                    />
                    <FormControlLabel
                      value="nagad"
                      control={<Radio color="success" />}
                      label="নগদ নাম্বার"
                    />
                    <FormControlLabel
                      value="bank"
                      control={<Radio color="warning" />}
                      label="ব্যাংক হিসাব নাম্বার"
                    />
                  </RadioGroup>
                </FormControl> */}
              {/* </Grid> */}
              {/* {(() => {
                if (transType == "bkash") {
                  return (
                    <>
                      <Grid item xs={12} md={4} sm={12}>
                        <TextField
                          required
                          name="bkashNo"
                          label="বিকাশ নাম্বার"
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
                      </Grid>
                    </>
                  );
                } else if (transType == "nagad") {
                  return (
                    <>
                      <Grid item xs={12} md={4} sm={12}>
                        <TextField
                          required
                          name="nagadNo"
                          label="নগদ নাম্বার"
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
                      </Grid>
                    </>
                  );
                } else {
                  return <></>;
                }
              })()} */}

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    ফী প্রদান সম্পর্কিত ভুল
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    নিকাহনামা নম্বর এবং নিবন্ধন ফি প্রদান করুন
                  </Typography>
                </Box>
              </Modal>
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
                  variant="contained"
                  color="success"
                  sx={{ mr: 1 }}
                  startIcon={<SaveIcon />}
                  onClick={handleSslPayment}
                >
                  ফী প্রদান করুন
                </Button>
              </Tooltip>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CoatFee;
