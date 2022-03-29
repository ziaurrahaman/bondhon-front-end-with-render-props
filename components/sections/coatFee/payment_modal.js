import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PaymentModal() {
  useEffect(() => {
    getPaymentSuccessfullData();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getPaymentSuccessfullData = async () => {
    const success = await axios.post(
      "http://localhost:8081/ssl-payment-success/success"
    );
    console.log("paymentSuccess", success.data);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
}

// import * as React from "react";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import { Avatar, Button, Fade, Grid, Modal } from "@mui/material";
// import Backdrop from "@mui/material/Backdrop";
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// export default function PaymentModal() {
//   const [value, setValue] = React.useState(0);
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     p: 4,
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box>
//       <Box>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           aria-label="basic tabs example"
//         >
//           <Tab label="Mobile Banking" {...a11yProps(0)} />
//           <Tab label="Cards" {...a11yProps(1)} />
//           <Tab label="Internet Banking" {...a11yProps(2)} />
//         </Tabs>
//       </Box>
//       <TabPanel value={value} index={0}>
//         <Grid container spacing={1}>
//           <Grid item xs={12} md={4} sm={12}>
//             <div onClick={handleOpen}>
//               <Avatar
//                 sx={{ height: "100px", width: "100px" }}
//                 variant="rounded"
//                 alt="Remy Sharp"
//                 src="/bkash_logo_simple.png"
//                 className="paymentLogo"
//                 style={{
//                   border: "0.1px solid lightgray",
//                   cursor: "pointer",
//                 }}
//               />
//             </div>
//           </Grid>
//           <Grid item xs={12} md={4} sm={12}>
//             <div onClick={handleOpen}>
//               <Avatar
//                 sx={{ height: "100px", width: "100px", objectFit: "contain" }}
//                 variant="rounded"
//                 alt="Remy Sharp"
//                 src="/nogod_logo.png"
//                 className="paymentLogo"
//                 style={{
//                   border: "0.1px solid lightgray",
//                   cursor: "pointer",
//                 }}
//               />
//             </div>
//           </Grid>
//           <Grid item xs={12} md={4} sm={12}>
//             <div onClick={handleOpen}>
//               <Avatar
//                 sx={{ height: "100px", width: "100px" }}
//                 variant="rounded"
//                 alt="Remy Sharp"
//                 src="/rocket.png"
//                 className="paymentLogo"
//                 style={{
//                   border: "0.1px solid lightgray",
//                   cursor: "pointer",
//                 }}
//               />
//             </div>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             md={12}
//             sm={12}
//             style={{ display: "flex", justifyContent: "center" }}
//           >
//             {/* <Button variant="contained" color="success">
//               Pay Now
//             </Button> */}
//           </Grid>
//         </Grid>
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         <Grid container spacing={1}>
//           <Grid item xs={12} md={4} sm={12}>
//             <div onClick={handleOpen}>
//               <Avatar
//                 sx={{ height: "100px", width: "100px" }}
//                 variant="rounded"
//                 alt="Remy Sharp"
//                 src="/master_card.png"
//                 className="paymentLogo"
//                 style={{
//                   border: "0.1px solid lightgray",
//                   cursor: "pointer",
//                 }}
//               />
//             </div>
//           </Grid>
//           <Grid item xs={12} md={4} sm={12}>
//             <div onClick={handleOpen}>
//               <Avatar
//                 sx={{ height: "100px", width: "100px" }}
//                 variant="rounded"
//                 alt="Remy Sharp"
//                 src="/visa_card.png"
//                 className="paymentLogo"
//                 style={{
//                   border: "0.1px solid lightgray",
//                   cursor: "pointer",
//                 }}
//               />
//             </div>
//           </Grid>
//           <Grid item xs={12} md={4} sm={12}>
//             <div onClick={handleOpen}>
//               <Avatar
//                 sx={{ height: "100px", width: "100px" }}
//                 variant="rounded"
//                 alt="Remy Sharp"
//                 src="/american_express_logo.png"
//                 className="paymentLogo"
//                 style={{
//                   border: "0.1px solid lightgray",
//                   cursor: "pointer",
//                 }}
//               />
//             </div>
//           </Grid>
//         </Grid>
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         <Grid container spacing={1}>
//           <Grid item xs={12} md={4} sm={12}>
//             <div onClick={handleOpen}>
//               <Avatar
//                 sx={{
//                   height: "100px",
//                   width: "100px",
//                   border: "0.1px solid lightgray",
//                 }}
//                 variant="rounded"
//                 alt="Remy Sharp"
//                 src="/bank_asia.png"
//                 className="paymentLogo"
//                 style={{
//                   border: "0.1px solid lightgray",
//                   cursor: "pointer",
//                 }}
//               />
//             </div>
//           </Grid>
//         </Grid>
//       </TabPanel>
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//         // sx={modalStyle}
//       >
//         <Fade in={open}>
//           <div>
//             <Box sx={style}>
//               <Typography>Coming Soon.....</Typography>
//             </Box>
//           </div>
//         </Fade>
//       </Modal>
//     </Box>
//   );
// }
