import Title from "../../shared/others/HeadTitle";
import React, { useState } from "react";
import Capture from "../camera/Capture";
import Image from "next/image";
import { Grid, Typography, TextField, Button, Box, Modal } from "@mui/material";

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

const CameraMaster = (props) => {
  console.log("moddal Props", props);

  const [openPic, setOpenPic] = useState();
  const [openCamera, setOpenCamera] = useState(false);
  const handleOpenPic = () => setOpenPic(true);
  const handleClosePic = () => setOpenPic(false);
  const handleCloseCamera = () => setOpenCamera(false);
  const handleOpenCamera = () => setOpenCamera(true);

  const [userPic, setUserPic] = useState({
    userImage: "",
    mimetypeback: "",
  });

  const [flagForImage, setFlagForImage] = useState("data:image/jpg;base64,");
  let userPicture = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsBinaryString(file);
      setUserPic(file);
      reader.onload = () => {
        let base64Image = btoa(reader.result);
        setUserPic((prevState) => ({
          ...prevState,
          userImage: base64Image,
          mimetypeback: file.type,
        }));
      };
    }
  };

  /*Image Capture Functions*/
  let onImageConfirm = (base64Image) => {
    console.log(base64Image);
    if (base64Image != "") {
      setOpenCamera(false);
    }
    setUserPic(() => ({
      userImage: base64Image,
      mimetypeback: ".png",
    }));
  };

  const handleOnSubmitPic = () => {
    console.log(userPic);
    props.handleChange(false, userPic);
  };

  /*Image Caprute Modal*/
  const ImageModalRegion = () => {
    return (
      <>
        <Grid sm={12} md={12} xs={12}>
          <Grid sm={12} md={12} xs={12}>
            <Title>
              <Typography variant="h6">ছবি সংগ্রহ</Typography>
            </Title>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={
                  userPic.userImage
                    ? flagForImage + userPic.userImage
                    : "/user.png"
                }
                alt="User Picture"
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
                onChange={userPicture}
                onClick={(event) => (event.target.value = null)}
              />
            </Grid>
            <Grid sm={12} md={5} xs={12}>
              <Button
                sx={{ marginTop: 3 }}
                variant="outlined"
                fullWidth
                onClick={handleOpenCamera}
              >
                ছবি তুলুন
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Modal
        open={props.modalVal}
        onClose={handleClosePic}
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
              // //   startIcon={<SendIcon />}
              onClick={handleOnSubmitPic}
            >
              &nbsp; সংরক্ষণ করুন
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openCamera}
        onClose={handleCloseCamera}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Title>
            <Typography variant="h6">আলোকচিত্র গ্রহণ</Typography>
          </Title>
          <Capture onConfirm={onImageConfirm} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          ></Box>
        </Box>
      </Modal>
    </>
  );
};

export default CameraMaster;
