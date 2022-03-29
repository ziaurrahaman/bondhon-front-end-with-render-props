// import { React, useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   Link,
//   Paper,
//   TextField,
//   Typography,
//   Divider
// } from "@mui/material";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import InputAdornment from "@mui/material/InputAdornment";
// import PasswordIcon from "@mui/icons-material/Password";
// import { userLoginUrl } from "../../../url/ApiList";
// import axios from "axios";
// import { NotificationManager } from "react-notifications";
// import { useRouter } from "next/router";
// import Image from 'next/image'
// import avbc from "../../../pages/dashboard";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="error" href="https://erainfotechbd.com/">
//         ERA-InfoTech Ltd
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// export default function SignInSide() {
//   const [formErros, setFormErrors] = useState({
//     nidbrn: "",
//     dob: "",
//     password: "",
//   });
//   const router = useRouter();

//   const mobileRegex = RegExp(/(^(01){1}[3456789]{1}(\d){8})$/);

//   const [loginInfo, setLoginInfo] = useState({
//     nidbrn: "",
//     dob: "",
//     password: "",
//   });

//   let checkFormError = () => {
//     console.log(`formError:${formErrors}`);
//     let flag = false;
//     for (const key in formErrors) {
//       if (formErrors[key].length > 0) {
//         flag = true;
//       }
//     }
//     return flag;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(`valueLength: ${value.length}`);

//     switch (name) {
//       case "nidbrn":
//         setLoginInfo({ ...loginInfo, [name]: value });
//         break;
//       case "password":
//         setLoginInfo({ ...loginInfo, [name]: value });
//         break;
//     }
//   };
//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       loginInfo.nidbrn.length === 10 ||
//       loginInfo.nidbrn.length === 17
//     ) {
//       let payload = {
//         nid: loginInfo.nidbrn,
//         dob: loginInfo.dob,
//         password: loginInfo.password,
//       };
//       console.log("payload value after clicking", payload);
//       try {
//         const result = await axios.post(userLoginUrl, payload);
//         if (result.status === 200) {
//           if (result.data.data.user_type === "kazi") {
//             console.log(result.data.data.user_type);
//             router.push("./dashboard");
//           } else if (result.data.data.user_type === "groom") {
//             router.push("./groom");
//           } else if (result.data.data.user_type === "bride") {
//             console.log(result.data.data.user_type);
//             router.push("./bride");
//           }
//         }
//       } catch (error) {
//         if (error.response) {
//           let message = error.response.data.errors[0].message;
//           NotificationManager.error(message, "Error", 5000);
//         } else if (error.request) {
//           NotificationManager.error("Error Connecting...", "Error", 5000);
//         } else if (error) {
//           // NotificationManager.error(error.toString(), "Error", 5000);
//         }
//       }
//     } else if (mobileRegex.test(loginInfo.nidbrn)) {
//       let payload = {
//         mobile_no: loginInfo.nidbrn,
//         password: loginInfo.password,
//       };
//       console.log("payload value after clicking", payload);
//       try {

//         const result = await axios.post(userLoginUrl, payload);

//         if (result.status === 200) {
//           if (result.data.data.user_type === "kazi") {
//             console.log(result.data.data.user_type);
//             router.push("http://localhost:3001/dashboard");
//           } else if (result.data.data.user_type === "groom") {
//             router.push("http://localhost:3001/groom");
//           } else if (result.data.data.user_type === "bride") {
//             console.log(result.data.data.user_type);
//             router.push("http://localhost:3001/bride");
//           }
//         }

//         console.log(result.data.data.user_type);
//       } catch (error) {
//         if (error.response) {
//           let message = error.response.data.message;
//           NotificationManager.error(message, "Error", 5000);
//           console.log(`err: ${message}`);
//         } else if (error.request) {
//           NotificationManager.error("Error Connecting...", "Error", 5000);
//         } else if (error) {
//           console.log(`error:${error}`);
//           // NotificationManager.error(error.toString(), "Error", 5000);
//         }
//       }
//     } else if (mobileRegex.test(loginInfo.nidbrn)) {
//       let payload = {
//         email: loginInfo.nidbrn,
//         password: loginInfo.password,
//       };
//       console.log("payload value after clicking", payload);
//       try {
//         const result = await axios.post(userLoginUrl, payload);
//         if (result.status === 200) {
//           if (result.data.data.user_type === "kazi") {
//             console.log(result.data.data.user_type);
//             router.push("http://localhost:3001/dashboard");
//           } else if (result.data.data.user_type === "groom") {
//             router.push("http://localhost:3001/groom");
//           } else if (result.data.data.user_type === "bride") {
//             console.log(result.data.data.user_type);
//             router.push("http://localhost:3001/bride");
//           }
//         }
//       } catch (error) {
//         if (error.response) {
//           let message = error.response.data.message;
//           NotificationManager.error(message, "Error", 5000);
//         } else if (error.request) {
//           NotificationManager.error("Error Connecting...", "Error", 5000);
//         } else if (error) {
//           // NotificationManager.error(error.toString(), "Error", 5000);
//         }
//       }
//     }

//   };

//   return (
//     <>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 4,
//           backgroundColor: '#fedcac',
//           backgroundImage: "url('/artBride.png')",
//           backgroundPosition: "right",
//           backgroundRepeat: "no-repeat",
//           height: '100%',
//           width: '100%',
//           minHeight: '100%'
//         }}
//       >
//         <Container maxWidth="sm">
//           <Paper
//             sx={{ my: { xs: 2, md: 4 }, p: { xs: 1, md: 2 } }}
//             elevation={3}
//             square
//             style={{ marginTop: "3%" }}
//           >
//             <Box
//               sx={{
//                 my: .3,
//                 mx: 2,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//               }}
//             >
//               <Typography component="h1" variant="h6" color="primary" sx={{ fontSize: '30px', textAlign: 'center' }}>
//                 <Image
//                   src="/logo.png"
//                   alt="Logo"
//                   width={100}
//                   height={60}
//                 />
//                 <br />
//                 বন্ধন
//               </Typography>
//             </Box>
//             <Divider />
//             <Box
//               sx={{
//                 my: 2,
//                 mx: 2,
//                 display: 'flex',
//                 flexDirection: 'column',
//               }}
//             >
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="nidbrn"
//                 label="জাতীয় পরিচয়পত্র বা জন্ম সনদ নাম্বার"
//                 name="nidbrn"
//                 value={loginInfo.nidbrn}
//                 onChange={handleChange}
//                 size="small"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <AccountCircle />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 label="জন্ম তারিখ"
//                 fullWidth
//                 size="small"
//                 type="date"
//                 name="dob"
//                 value={loginInfo.dob}
//                 onChange={handleChange}
//                 defaultValue="2021-12-27"
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 value={loginInfo.password}
//                 onChange={handleChange}
//                 label="একটিবারের পাসওয়ার্ড"
//                 type="password"
//                 id="password"
//                 size="small"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PasswordIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <Link href="/dashboard" passHerf>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   sx={{ mt: 3, mb: 2 }}
//                   onClick={onSubmit}
//                 >
//                   সাইন ইন
//                 </Button>
//               </Link>
//               <Grid container>
//                 <Grid item xs>
//                   <Link color="secondary" href="#" variant="body2">
//                     পাসওয়ার্ড ভুলে গেছেন?
//                   </Link>
//                 </Grid>
//                 <Grid item>
//                   <Link color="secondary" href="/user/" variant="body2">
//                     {"অ্যাকাউন্ট নেই? নিবন্ধন করুন"}
//                   </Link>
//                 </Grid>
//               </Grid>
//               <Copyright sx={{ mt: 5 }} />
//             </Box>
//           </Paper>
//         </Container>
//       </Box>
//     </>
//   );
// }
import { React, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import PasswordIcon from "@mui/icons-material/Password";
import { userLoginUrl } from "../../../url/ApiList";
import { otpUrlLogin } from "../../../url/ApiList";
import { sendOtpUrl } from "../../../url/ApiList";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { useRouter } from "next/router";
import Image from "next/image";
import avbc from "../../../pages/dashboard";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import Stack from "@mui/material/Stack";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="error" href="https://erainfotechbd.com/">
        ERA-InfoTech Ltd
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  const [formErros, setFormErrors] = useState({
    nidbrn: "",
    dob: "",
    password: "",
  });
  const router = useRouter();
  let resultOtp;
  let userType;
  const mobileRegex = RegExp(/(^(01){1}[3456789]{1}(\d){8})$/);

  const [showOtp, setShowOtp] = useState(false);
  const [user_type, setUserType] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    citizen_doc_no: "",

    otp: "",
    citizen_dob: "",
  });

  let checkFormError = () => {
    console.log(`formError:${formErrors}`);
    let flag = false;
    for (const key in formErrors) {
      if (formErrors[key].length > 0) {
        flag = true;
      }
    }
    return flag;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`valueLength: ${value.length}`);

    switch (name) {
      case "citizen_doc_no":
        setLoginInfo({ ...loginInfo, [name]: value });
        break;
      // case "password":
      //   setLoginInfo({ ...loginInfo, [name]: value });
      //   break;
      case "citizen_dob":
        setLoginInfo({ ...loginInfo, [name]: value });
        break;
      case "otp":
        setLoginInfo({ ...loginInfo, [name]: value });
    }

    // switch (name) {
    //   case name === textFieldName:
    //     setLoginInfo({ ...loginInfo, textFieldName: e.target.value });
    //     break;
    //   case name === "password":
    //     setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    // }
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    // console.log(`formErrro: ${formErrors}`);
    if (showOtp === false) {
      if (
        loginInfo.citizen_doc_no.length === 10 ||
        loginInfo.citizen_doc_no.length === 17
      ) {
        let payload = {
          citizen_doc_no: loginInfo.citizen_doc_no,
          citizen_dob: loginInfo.citizen_dob,
        };
        console.log("payload value after clicking", payload);
        try {
          //router.push({ pathname: "/coop/income-expense" });
          //router.push({ pathname: "/coop/income-expense" });
          // console.log(userLoginUrl);
          resultOtp = await axios.post(sendOtpUrl, payload);
          // console.log(`type: ${result.data}`);
          console.log("otpStatus: ", resultOtp);

          if (resultOtp.data.data !== undefined) {
            setShowOtp(true);
            userType = resultOtp.data.data.user_role;
            setUserType(userType);
            console.log("rotp", resultOtp);
          }
        } catch (error) {
          if (error.response) {
            let message = error.response.data.errors[0].message;
            NotificationManager.error(message, "Error", 5000);
          } else if (error.request) {
            NotificationManager.error("Error Connecting...", "Error", 5000);
          } else if (error) {
            // NotificationManager.error(error.toString(), "Error", 5000);
          }
        }
      }
      // else if (mobileRegex.test(loginInfo.emailPasswordOrMobile)) {
      //   let payload = {
      //     mobile_no: loginInfo.emailPasswordOrMobile,
      //     password: loginInfo.password,
      //   };
      //   console.log("payload value after clicking", payload);
      //   try {
      //     //router.push({ pathname: "/coop/income-expense" });
      //     // console.log(userLoginUrl);
      //     const result = await axios.post(userLoginUrl, payload);
      //     // console.log(`type: ${result.data}`);
      //     // console.log(result.status);
      //     if (result.status === 200) {
      //       if (result.data.data.user_type === "kazi") {
      //         console.log(result.data.data.user_type);
      //         router.push("./dashboard");
      //       } else if (result.data.data.user_type === "groom") {
      //         router.push("./groom");
      //       } else if (result.data.data.user_type === "bride") {
      //         console.log(result.data.data.user_type);
      //         router.push("./bride");
      //       }
      //     }

      //     console.log(result.data.data.user_type);
      //   } catch (error) {
      //     if (error.response) {
      //       let message = error.response.data.message;
      //       NotificationManager.error(message, "Error", 5000);
      //       console.log(`err: ${message}`);
      //     } else if (error.request) {
      //       NotificationManager.error("Error Connecting...", "Error", 5000);
      //     } else if (error) {
      //       console.log(`error:${error}`);
      //       // NotificationManager.error(error.toString(), "Error", 5000);
      //     }
      //   }
      // } else if (emailRegex.test(loginInfo.emailPasswordOrMobile)) {
      //   let payload = {
      //     email: loginInfo.emailPasswordOrMobile,
      //     password: loginInfo.password,
      //   };
      //   console.log("payload value after clicking", payload);
      //   try {
      //     //router.push({ pathname: "/coop/income-expense" });
      //     // console.log(userLoginUrl);
      //     const result = await axios.post(userLoginUrl, payload);
      //     // console.log(`type: ${result.data}`);
      //     // console.log(result.status);
      //     if (result.status === 200) {
      //       if (result.data.data.user_type === "kazi") {
      //         console.log(result.data.data.user_type);
      //         router.push("./dashboard");
      //       } else if (result.data.data.user_type === "groom") {
      //         router.push("./groom");
      //       } else if (result.data.data.user_type === "bride") {
      //         console.log(result.data.data.user_type);
      //         router.push("./bride");
      //       }
      //     }
      //   } catch (error) {
      //     if (error.response) {
      //       let message = error.response.data.message;
      //       NotificationManager.error(message, "Error", 5000);
      //     } else if (error.request) {
      //       NotificationManager.error("Error Connecting...", "Error", 5000);
      //     } else if (error) {
      //       // NotificationManager.error(error.toString(), "Error", 5000);
      //     }
      //   }
      // }
    }
    if (showOtp === true) {
      try {
        const result = await axios.get(otpUrlLogin + loginInfo.otp);
        console.log("final Url", otpUrlLogin + loginInfo.otp);
        console.log("resultresult", user_type);

        //-------- Data Set On Localstorage Start
        let userData = {
          citizen_doc_no: loginInfo.citizen_doc_no,
          citizen_dob: loginInfo.citizen_dob,
          citizen_type: user_type,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        //-------- Data Set On Localstorage End

        if (user_type === "K") {
          console.log(user_type);
          router.push("./dashboard");
        } else if (user_type === "G") {
          router.push("./GroomDashboard");
        } else if (user_type === "B") {
          console.log(user_type);
          router.push("./BrideDashboard");
        }
      } catch (error) {
        if (error.response) {
          let message = error.response.data.errors[0].message;
          NotificationManager.error(message, "Error", 5000);
        } else if (error.request) {
          NotificationManager.error("Error Connecting...", "Error", 5000);
        } else if (error) {
          // NotificationManager.error(error.toString(), "Error", 5000);
        }
      }
    }

    // const data = new FormData(event.currentTarget);
    // // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          backgroundColor: "#fedcac",
          backgroundImage: "url('/artBride.png')",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
          minHeight: "100%",
        }}
      >
        <Container maxWidth="xs">
          <Paper
            sx={{ my: { xs: 2, md: 4 }, p: { xs: 1, md: 2 } }}
            elevation={3}
            square
            style={{ marginTop: "3%" }}
          >
            <Box
              sx={{
                my: 0.3,
                mx: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="primary"
                sx={{ fontSize: "30px", textAlign: "center" }}
              >
                <Image src="/logo.png" alt="Logo" width={100} height={60} />
                <br />
                বন্ধন
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                my: 2,
                mx: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                value={loginInfo.emailPasswordOrMobile}
                name="citizen_doc_no"
                margin="normal"
                required
                fullWidth
                id="email"
                label="জাতীয় পরিচয়পত্র নাম্বার/জন্ম নিবন্ধন নাম্বার"
                onChange={handleChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />

              <Stack>
                <TextField
                  margin="normal"
                  name="citizen_dob"
                  id="date"
                  // label="জন্ম তারিখ"
                  label="জন্ম তারিখ"
                  fullWidth
                  size="small"
                  type="date"
                  onChange={handleChange}
                  // defaultValue="2021-12-27"
                  value={loginInfo.dob}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>

              {showOtp && (
                <TextField
                  value={loginInfo.otp}
                  margin="normal"
                  required
                  name="otp"
                  label="
                আপনার ওয়ান টাইম পাসওয়ার্ড দিন"
                  fullWidth
                  size="small"
                  variant="outlined"
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              <Link href="/dashboard" passHerf>
                <Button
                  color="success"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={onSubmit}
                >
                  {showOtp ? "যাচাই করুন" : "ওয়ান টাইম পাসওয়ার্ড পাঠান"}
                </Button>
              </Link>
              <Grid
                container
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Grid item>
                  <Link color="secondary" href="/user/" variant="body2">
                    {"অ্যাকাউন্ট নেই? নিবন্ধন করুন"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
