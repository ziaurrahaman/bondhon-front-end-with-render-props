import { Grid, Typography, TextField, Button, Box, Modal } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import Title from "../../shared/others/HeadTitle";
import SendIcon from "@mui/icons-material/Send";

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

const finger = (props) => {
  const [openSignature, setOpenSignature] = useState(false);
  const handleOpenSignature = () => setOpenSignature(true);
  const handleCloseSignature = () => setOpenSignature(false);

  const [signatureData, setSignatureData] = useState({
    data: "Y",
  });

  const [signature, setSignature] = useState(false);

  const handleOnSubmitSignature = () => {
    props.handleChange(false, signatureData);
  };

  const SignatureRegion = () => {
    return (
      <>
        <Grid sm={12} md={12} xs={12}>
          <Grid sm={12} md={12} xs={12}>
            <Title>
              <Typography variant="h6">আঙুলের ছাপ</Typography>
            </Title>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src="/righthand.png"
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

  return (
    <>
      <Modal
        open={props.modalVal}
        onClose={handleCloseFinger}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SignatureRegion />
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
              onClick={handleOnSubmitSignature}
            >
              &nbsp; সংরক্ষণ করুন
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default finger;
