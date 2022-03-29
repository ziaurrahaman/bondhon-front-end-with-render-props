import React, { useState } from "react";
import {
  Grid,
  Avatar,
  Container,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Tooltip,
  Button,
  Card,
  CardContent,
  Box,
  Stack,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AbcIcon from "@mui/icons-material/Abc";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import EditIcon from "@mui/icons-material/Edit";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import Title from "../../shared/others/HeadTitle";
import Breadcrumb from "../../shared/others/breadcrumbs";
import CameraMaster from "../camera/cameraMaster";
import Finger from "../finger-signature/finger";
import { NotificationManager } from "react-notifications";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  border: `2px solid #F1F1F1`,
}));

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

const Profile = () => {
  const [openPic, setOpenPic] = useState(false);
  const [openFinger, setOpenFinger] = useState(false);
  const [finalImage, setFinalImage] = useState({});
  const [flagForImage, setFlagForImage] = useState("data:image/jpg;base64,");
  const [fingerData, setFingerData] = useState({});

  const handleOpenPic = () => {
    setOpenPic(true);
  };

  const handleChange = (flag, img) => {
    setOpenPic(flag);
    setFinalImage(img);
  };

  const handleOpenFinger = () => {
    setOpenFinger(true);
  };

  const handleChangeFinger = (flag, data) => {
    setOpenFinger(flag);
    setFingerData(data);
  };

  return (
    <>
      <Breadcrumb>
        <Typography variant="h6">প্রোফাইল তথ্য</Typography>
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={5} sm={12}>
              <Card sx={{ maxWidth: 450 }}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <SmallAvatar alt="Remy Sharp" src="/camera.png" />
                      }
                      onClick={handleOpenPic}
                    >
                      <Avatar
                        src={
                          finalImage.userImage
                            ? flagForImage + finalImage.userImage
                            : "/user.png"
                        }
                        // src="/user.png"
                        sx={{
                          height: 120,
                          m: 1,
                          width: 120,
                          border: "2px solid #eb068c",
                        }}
                      />
                    </Badge>
                  </Stack>
                </Box>
                <CardContent sx={{ textAlign: "center", p: "10px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    মোঃ জিয়াউর রহমান
                  </Typography>

                  <CameraMaster
                    modalVal={openPic}
                    handleChange={handleChange}
                  />

                  <Divider />
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: "30px", pt: "10px" }}
                  >
                    <b>জাতীয় পরিচয়পত্র নাম্বার-</b> ৭৮৪৯৮৫৭৪
                    <br />
                    <b>নিবন্ধন নাম্বার-</b> ৩৪৫৬৭৮
                    <br />
                    <b>মোবাইল নাম্বার-</b> ০১৮২৯-০৪২৬৯৯
                    <br />
                    <b>ইমেইল-</b> ‍saifur1985bd@gmail.com
                    <br />
                    <b>বিকাশ/নগদ হিসাব নাম্বার-</b> ০১৯৭৯-০৪২৬৯৯
                    <br />
                    <b>ব্যাংক হিসাব নাম্বার-</b> ০১৮২৯-০৪২৬৯৯
                    <br />
                    <b>এরিয়া-</b> ‍ইউনিয়ন/ওয়ার্ড: ১-৫, উপজেলা/থানা: দারুল সালাম
                    থানা, জেলা: ঢাকা
                  </Typography>
                </CardContent>
                <Grid
                  item
                  xs={12}
                  md={12}
                  sm={12}
                  mx={3}
                  my={2}
                  sx={{ textAlign: "center" }}
                >
                  <Finger
                    modalVal={openFinger}
                    handleChange={handleChangeFinger}
                  />

                  {fingerData.data ? (
                    <Tooltip title="আঙুলের ছাপ প্রদান হয়েছে">
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ mr: 1 }}
                        startIcon={<CheckCircleOutlineIcon />}
                        disabled
                        // onClick={handleOpenFinger}
                      >
                        {" "}
                        আঙুলের ছাপ প্রদান হয়েছে
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip title="আঙুলের ছাপ দিন">
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ mr: 1 }}
                        startIcon={<FingerprintIcon />}
                        onClick={handleOpenFinger}
                      >
                        {" "}
                        আঙুলের ছাপ দিন
                      </Button>
                    </Tooltip>
                  )}

                  <Tooltip title="এডিট করুন">
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mr: 1 }}
                      startIcon={<EditIcon />}
                    >
                      {" "}
                      এডিট করুন
                    </Button>
                  </Tooltip>
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={12} md={7} sm={12}>
              <Paper
                sx={{ my: { xs: 2, md: 4 }, p: { xs: 1, md: 2 } }}
                elevation={3}
                rounded
                style={{ marginTop: "1.5%" }}
              >
                <Title>
                  <Typography variant="h6">এডিট তথ্য</Typography>
                </Title>
                <Grid container spacing={2} px={2} py={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      required
                      name="nid"
                      label="জাতীয় পরিচয়পত্র নাম্বার"
                      fullWidth
                      size="small"
                      autoComplete="family-name"
                      variant="outlined"
                      disabled
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CreditCardIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="জন্ম তারিখ"
                      fullWidth
                      size="small"
                      type="date"
                      defaultValue="2021-12-27"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      required
                      name="name"
                      label="নাম"
                      fullWidth
                      size="small"
                      autoComplete="given-name"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      required
                      name="regNo"
                      label="নিবন্ধন নাম্বার"
                      fullWidth
                      size="small"
                      autoComplete="given-name"
                      variant="outlined"
                      disabled
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AbcIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      required
                      name="mobNo"
                      label="মোবাইল নাম্বার"
                      fullWidth
                      size="small"
                      autoComplete="given-name"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SettingsCellIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      name="email"
                      label="ইমেইল"
                      fullWidth
                      size="small"
                      autoComplete="given-name"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AlternateEmailIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      required
                      name="bkashnagad"
                      label="বিকাশ/নগদ হিসাব নাম্বার"
                      fullWidth
                      size="small"
                      autoComplete="given-name"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SendToMobileIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      required
                      name="bank"
                      label="ব্যাংক হিসাব নাম্বার"
                      fullWidth
                      size="small"
                      autoComplete="given-name"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBalanceIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      required
                      name="area"
                      label="এরিয়া"
                      fullWidth
                      size="small"
                      autoComplete="given-name"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AddLocationIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
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
                  <Tooltip title="আপডেট করুন">
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mr: 1 }}
                      startIcon={<UpgradeIcon />}
                    >
                      {" "}
                      &nbsp;আপডেট করুন
                    </Button>
                  </Tooltip>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
