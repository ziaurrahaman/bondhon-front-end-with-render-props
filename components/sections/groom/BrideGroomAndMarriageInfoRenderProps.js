import React, { useState, useEffect } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FemaleIcon from "@mui/icons-material/Female";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Paper,
  Tooltip,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  RegisterBrideAction,
  SetGroomRegPayloadAction,
} from "../../../redux/actions/groom_action";
import AddressDetails from "../../shared/others/addressDetails";
import Title from "../../shared/others/HeadTitle";
import Capture from "../camera/Capture";
import axios from "axios";
import { nidVerifyUrl } from "../../../url/ApiList";
import {
  bridesBasicInfo,
  checkCitizenAndAddressUrl,
  citizenUpdateUrl,
  citizenCreateUrl,
  addressUpdateUrl,
  addressCreateUrl,
  fingerSdkApi,
  livenessDetectionApi,
  faceMatchingApi,
  postDocumentUploadUrl,
  postDocumentUploadUrlDummy,
  getDocumentUrl,
  getDocumentUrlDummy,
} from "../../../url/ApiList";
import { BrideOrGroomAllInfoGetUrl } from "../../../url/ApiList";
import { NotificationManager } from "react-notifications";
import AllFormContext from "../../shared/others/zone_form_context.json";
import ZoneComponent from "../../shared/others/ZoneComponent";

const BrideGroomAndMarriageInfoRenderProps = (props) => {
  //Set bride Marital StatusgroomInfo
  const [brideMaritalStatus, setBrideMaritalStatus] = useState();

  //Groom Picture State

  const [openPic, setOpenPic] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const handleOpenPic = () => setOpenPic(true);
  const handleOpenRight = () => setOpenRight(true);
  const handleOpenLeft = () => setOpenLeft(true);
  const handleClosePic = () => setOpenPic(false);
  const handleCloseRight = () => setOpenRight(false);
  const handleCloseLeft = () => setOpenLeft(false);
  const handleOpenCamera = () => setOpenCamera(true);
  const handleCloseCamera = () => setOpenCamera(false);
  const [groomPic, setGroomPic] = useState({
    groomImage: "",
    mimetypeback: "",
  });
  const [fingerVerify, setFingerVerify] = useState(false);

  const [goomPicSubmit, setGoomPicSubmit] = useState({});
  const [flagForImage, setFlagForImage] = useState("data:image/jpg;base64,");

  //   Submit Button Click on Modal
  const [payloadImg, setPayloadImg] = useState({
    image1: "",
    image2: "",
  });
  //Groom Pic Function
  const handleOpenFinger = async (e) => {
    const fingerobj = {
      MinQ: 30,
      Retry: 3,
      TokenId: "g86v5s4g5se84g5sfd4g5werx25sdf4f",
    };
    try {
      const getFingerData = await axios.post(fingerSdkApi, fingerobj);
      console.log(getFingerData);
      if (getFingerData.status === 200) {
        setFingerVerify(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let groomPicture = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsBinaryString(file);
      setGroomPic(file);
      reader.onload = () => {
        let base64Image = btoa(reader.result);
        setGroomPic((prevState) => ({
          ...prevState,
          groomImage: base64Image,
          mimetypeback: file.type,
        }));
      };
    }
  };

  const handleOnSubmitPic = async () => {
    setGoomPicSubmit(groomPic);

    handleClosePic(true);
    console.log(groomPic);

    /************* IMAGE API *************** */
    let capturedImage = groomPic.groomImage;

    if (brideInfo.nid === "") {
      NotificationManager.error(
        "ছবি ডামি ইসি ডাটাবেসে পাওয়া যায়নি",
        "Title here"
      );
    } else {
      let payloadBase64 = {
        citizenDocId: brideInfo.nid,
      };

      try {
        const base64Img = await axios.post(getDocumentUrlDummy, payloadBase64);
        const baseImage = base64Img.data.data.doc_img;

        setPayloadImg({
          image1: baseImage,
          image2: capturedImage,
        });
      } catch (error) {
        console.log(error);
      }

      if (payloadImg.image1 === "") {
        NotificationManager.error(
          "ছবি ডামি ইসি ডাটাবেসে পাওয়া যায়নি",
          "Error"
        );
      } else {
        let payloadImageLiveness = {
          image: capturedImage,
        };
        const config = {
          headers: {
            "x-api-key":
              "394875466fa2048c4e2009521d804225f83aaf45d1915ef2ad3fed4fca9b4980",
          },
        };

        try {
          const result = await axios.post(
            livenessDetectionApi,
            payloadImageLiveness
          );

          if (result.status === 200) {
            try {
              const imgMatch = await axios.post(faceMatchingApi, payloadImg);
              console.log(imgMatch);
              if (imgMatch.data.data.result === "True") {
                NotificationManager.success("ছবি সফলভাবে মিলেছে", "Success.");
              } else {
                NotificationManager.error("ছবি মেলেনি", "Failed.");
              }
            } catch (error) {
              NotificationManager.error("ছবি মেলেনি", "Failed.");
            }
          } else {
            NotificationManager.error(
              "ক্যামেরা সঠিক অবস্থানে রাখুন",
              "Failed."
            );
          }
        } catch (error) {
          NotificationManager.error("সংযোগ ত্রুটি পাওয়া গেছে..", "Failed");
          console.log(error);
        }
      }
    }
  };

  // Submit Right Finger
  const [RightFP, setRightFP] = useState(false);
  const handleOnSubmitRightFP = () => {
    setRightFP(true);
    handleCloseRight(true);
  };

  //Submit Left Finger
  const [LeftFP, setLeftFP] = useState(false);
  const handleOnSubmitLeftFP = () => {
    setLeftFP(true);
    handleCloseLeft(true);
  };

  //Capture Image
  let onImageConfirm = (base64Image) => {
    if (base64Image != "") {
      setOpenCamera(false);
    }
    setGroomPic(() => ({
      groomImage: base64Image,
      mimetypeback: ".png",
    }));
  };

  // State of Groom
  const [groomInfo, setGroomInfo] = useState({
    nid: "",
    name: "",
    dob: "",
    mobile_no: "",
    email: "",
    relegion: "",
    father_name: "",
    father_nid: "",
    mother_name: "",
    mother_nid: "",
    address_type: "",
    user_type: "",
    division_id: "",
    district_id: "",
    upazila_id: "",
    union_id: "",
    post_code: "",
    details_address: "",
    per_address_type: "",
    per_user_type: "",
    per_division_id: "",
    per_district_id: "",
    per_upazila_id: "",
    per_union_id: "",
    per_post_code: "",
    per_details_address: "",
  });
  const [data, setData] = useState(null);
  //Form error state of groom
  const [formErrors, setFormErrors] = useState({
    nid: "",
    name: "",
    dob: "",
    mobile_no: "",
    email: "",
    relegion: "",
    father_name: "",
    father_nid: "",
    mother_name: "",
    mother_nid: "",
    address_type: "",
    user_type: "",
    district_id: "",
    upazila_id: "",
    union_id: "",
    post_code: "",
    details_address: "",
  });

  ///Get Age function of Groom
  function getAge(birthDate) {
    var dob = new Date(birthDate);

    var today = new Date();
    var age = today.getFullYear() - dob.getFullYear();

    var m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    console.log("validAge", age);
    return age;
  }
  const emailRegex = RegExp(
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  );
  const mobileRegex = RegExp(/(^(01){1}[3456789]{1}(\d){8})$/);
  //Handle change of groom
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "nid":
        setGroomInfo({
          ...groomInfo,
          //For dynamic key we use []
          [e.target.name]: e.target.value,
        });
        console.log(`brideinfoTest: ${groomInfo}`);

        formErrors.nid =
          value.length == 13 ||
          value.length == 10 ||
          value.length == 17 ||
          value.length == 0
            ? ""
            : "আপনার সঠিক এনআইডি প্রদান করুন";

        break;
      case "name":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.name =
          value.length < 6 && value.length > 0
            ? "সর্বনিন্ম ৬টি অক্ষর প্রদান"
            : "";
        break;
      case "email":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.email =
          emailRegex.test(value) || value.length == 0
            ? ""
            : "আপনার সঠিক ইমেইল প্রদান করুন";
        break;
      case "mobile_no":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.mobile_no =
          mobileRegex.test(value) || value.length == 0
            ? ""
            : "আপনার সঠিক মোবাইল নং প্রদান করুন";
        break;

      case "dob":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        const age = getAge(e.target.value);

        formErrors.dob = age < 21 && "বরের বয়স ২১ বছর হতে হবে";
        break;

      case "relegion":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.relegion = value === "" && "ধর্ম নির্বাচন করুন";
        break;

      case "father_name":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.father_name =
          value.length < 6 && value.length > 0
            ? "সর্বনিন্ম ৬টি অক্ষর প্রদান"
            : "";
        break;
      case "father_nid":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.father_nid =
          value.length == 13 ||
          value.length == 10 ||
          value.length == 17 ||
          value.length == 0
            ? ""
            : "আপনার সঠিক এনআইডি প্রদান করুন";
        break;
      case "mother_name":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.mother_name =
          value.length < 6 && value.length > 0
            ? "সর্বনিন্ম ৬টি অক্ষর প্রদান"
            : "";
        break;
      case "mother_nid":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.mother_nid =
          value.length == 13 ||
          value.length == 10 ||
          value.length == 17 ||
          value.length == 0
            ? ""
            : "আপনার সঠিক এনআইডি প্রদান করুন";
        break;
      case "address_type":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.address_type = value === "" && "ঠিকানা এর ধরণ নির্বাচন করুন";
        break;

      case "user_type":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.user_type = value === "" && "ঠিকানা এর ধরণ নির্বাচন করুন";
        break;
      case "division_id":
        setGroomInfo({ ...groomInfo, [e.target.name]: e.target.value });
        break;
      case "per_division_id":
        setGroomInfo({ ...groomInfo, [e.target.name]: e.target.value });
        break;
      case "district_id":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.district_id = value === "" && "জেলা এর ধরণ নির্বাচন করুন";
        break;
      case "upazila_id":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });

        formErrors.upazila_id = value === "" && "উপজেলা নির্বাচন করুন";
        break;
      case "union_id":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.union_id = value === "" && "ইউনিয়ন নির্বাচন করুন";
        break;
      case "post_code":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.post_code = value === "" && "ইউনিয়ন নির্বাচন করুন";
        break;
      case "details_address":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.details_address = value === "" && "ইউনিয়ন নির্বাচন করুন";
        break;
      case "per_address_type":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.address_type = value === "" && "ঠিকানা এর ধরণ নির্বাচন করুন";
        break;

      case "per_user_type":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.user_type = value === "" && "ঠিকানা এর ধরণ নির্বাচন করুন";
        break;
      case "per_district_id":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.district_id = value === "" && "জেলা এর ধরণ নির্বাচন করুন";
        break;
      case "per_upazila_id":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });

        formErrors.upazila_id = value === "" && "উপজেলা নির্বাচন করুন";
        break;
      case "per_union_id":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.union_id = value === "" && "ইউনিয়ন নির্বাচন করুন";
        break;
      case "per_post_code":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.post_code = value === "" && "ইউনিয়ন নির্বাচন করুন";
        break;
      case "per_details_address":
        setGroomInfo({
          ...groomInfo,
          [e.target.name]: e.target.value,
        });
        formErrors.details_address = value === "" && "ইউনিয়ন নির্বাচন করুন";
        break;
    }
  };

  // getUserById function of Groom

  const getUserInfoById = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }
    const userId = userData.citizen_doc_no;
    console.log("userId", userId);

    if (userId && props.title !== "MarriageInfo") {
      try {
        const nidData = await axios.get(BrideOrGroomAllInfoGetUrl + userId);
        const dataa = nidData.data.data;
        console.log("niddata", dataa);

        console.log(date);

        if (dataa !== null) {
          const date = formatDate(dataa.citizenInfo.citizen_dob);
          setData(dataa);
          console.log("data not null", dataa);
          setGroomInfo({
            nid: dataa.citizenInfo.citizen_doc_no,
            name: dataa.citizenInfo.citizen_name,
            dob: date,
            mobile_no: dataa.citizenInfo.citizen_mobile,
            email: dataa.citizenInfo.citizen_email,
            relegion: dataa.citizenInfo.citizen_religion,
            father_name: dataa.citizenInfo.citizen_father_name,

            mother_name: dataa.citizenInfo.citizen_mother_name,

            ...(dataa.presentAdress && {
              address_type: dataa.presentAdress.address_type,
              // user_type: "B",
              division_id: dataa.presentAdress.division_id,
              district_id: dataa.presentAdress.district_id,
              upazila_id: dataa.presentAdress.upazila_city_id,
              union_id: dataa.presentAdress.union_thana_pur_id,
              post_code: dataa.presentAdress.postal_id,
              details_address: dataa.presentAdress.address_details,
              ...(dataa.permanentAdress && {
                per_address_type: "permanent",

                per_division_id: dataa.permanentAdress.division_id,
                per_district_id: dataa.permanentAdress.district_id,
                per_upazila_id: dataa.permanentAdress.upazila_city_id,
                per_union_id: dataa.permanentAdress.union_thana_pur_id,
                per_post_code: dataa.permanentAdress.postal_id,
                per_details_address: dataa.permanentAdress.address_details,
              }),
            }),
            ...(dataa.presentAdress === undefined && {
              address_type: "",
              user_type: "",
              division_id: "নির্বাচন করুন",
              district_id: "নির্বাচন করুন",
              upazila_id: "নির্বাচন করুন",
              union_id: "নির্বাচন করুন",
              post_code: "নির্বাচন করুন",
              details_address: "",
              ...(dataa.permanentAdress === undefined && {
                per_address_type: "",
                per_user_type: "",
                per_division_id: "নির্বাচন করুন",
                per_district_id: "নির্বাচন করুন",
                per_upazila_id: "নির্বাচন করুন",
                per_union_id: "নির্বাচন করুন",
                per_post_code: "নির্বাচন করুন",
                per_details_address: "",
              }),
            }),
          });

          if (
            dataa.presentAdress === undefined &&
            dataa.permanentAdress === undefined
          ) {
          } else {
          }
        } else {
          console.log("not nulkl");
          setData(null);
          console.log("typypee========", dataType);
          setGroomInfo({
            nid: "",
            name: "",
            dob: "",
            mobile_no: "",
            email: "",
            relegion: "নির্বাচন করুন",
            father_name: "",

            mother_name: "",

            address_type: "",
            user_type: "",
            division_id: "নির্বাচন করুন",
            district_id: "নির্বাচন করুন",
            upazila_id: "নির্বাচন করুন",
            union_id: "নির্বাচন করুন",
            post_code: "নির্বাচন করুন",
            details_address: "",
            per_address_type: "",
            per_user_type: "",
            per_division_id: "নির্বাচন করুন",
            per_district_id: "নির্বাচন করুন",
            per_upazila_id: "নির্বাচন করুন",
            per_union_id: "নির্বাচন করুন",
            per_post_code: "নির্বাচন করুন",
            per_details_address: "",
          });
        }
      } catch (error) {
        console.log("error", error.response);
        setGroomInfo({
          ...groomInfo,
          name: "",
          dob: "",
          father_name: "",
          mother_name: "",
        });
        setBrideMaritalStatus("");
      }
    }
  };

  // groom OnSubmit function

  let onSubmitData = async (e, userType, payloadFromMarriageInof) => {
    console.log("GroomINfoooooooooooooooooooo", payloadFromMarriageInof);
    console.log(`formErrro: ${formErrors}`);
    if (e) {
      e.preventDefault();
    }

    try {
      if (data !== null) {
        const checkExistanceResult = await axios.get(
          checkCitizenAndAddressUrl +
            (payloadFromMarriageInof
              ? payloadFromMarriageInof.nid
              : groomInfo.nid)
        );
        console.log("existanceResult", checkExistanceResult);

        const citizen_table_id =
          checkExistanceResult.data.data.citizen_table_id;

        if (checkExistanceResult.data.data.citizen_row_count === 1) {
          console.log("citUPPPUPPUPPUPPU");
          const result = await axios.put(citizenUpdateUrl, {
            citizen_id: citizen_table_id,
            citizen_doc_type: "NID",
            citizen_doc_no: payloadFromMarriageInof
              ? payloadFromMarriageInof.nid
              : groomInfo.nid,

            citizen_name: payloadFromMarriageInof
              ? payloadFromMarriageInof.name
              : groomInfo.name,
            citizen_dob: payloadFromMarriageInof
              ? payloadFromMarriageInof.dob
              : groomInfo.dob,
            citizen_mobile: payloadFromMarriageInof
              ? payloadFromMarriageInof.mobile_no
              : groomInfo.mobile_no,
            citizen_email: payloadFromMarriageInof
              ? payloadFromMarriageInof.email
              : groomInfo.email,
            citizen_religion: payloadFromMarriageInof
              ? payloadFromMarriageInof.relegion
              : groomInfo.relegion,
            citizen_father_name: payloadFromMarriageInof
              ? payloadFromMarriageInof.father_name
              : groomInfo.father_name,
            citizen_father_nid: 0,
            citizen_mother_name: payloadFromMarriageInof
              ? payloadFromMarriageInof.mother_name
              : groomInfo.mother_name,
            citizen_mother_nid: 0,
          });
          console.log("citUPPPUPPUPPUPPU", result);
        } else {
          const result = await axios.post(citizenCreateUrl, {
            citizen_doc_type: "NID",
            citizen_doc_no: payloadFromMarriageInof
              ? payloadFromMarriageInof.nid
              : groomInfo.nid,

            citizen_name: payloadFromMarriageInof
              ? payloadFromMarriageInof.name
              : groomInfo.name,
            citizen_dob: payloadFromMarriageInof
              ? payloadFromMarriageInof.dob
              : groomInfo.dob,
            citizen_mobile: payloadFromMarriageInof
              ? payloadFromMarriageInof.mobile_no
              : groomInfo.mobile_no,
            citizen_email: payloadFromMarriageInof
              ? payloadFromMarriageInof.email
              : groomInfo.email,
            citizen_religion: payloadFromMarriageInof
              ? payloadFromMarriageInof.relegion
              : groomInfo.relegion,
            citizen_father_name: payloadFromMarriageInof
              ? payloadFromMarriageInof.father_name
              : groomInfo.father_name,
            citizen_father_nid: 0,
            citizen_mother_name: payloadFromMarriageInof
              ? payloadFromMarriageInof.mother_name
              : groomInfo.mother_name,
            citizen_mother_nid: 0,
          });
          console.log("citPOPOPOPOPO", result);
        }
        console.log("citUPPPUPPUPPUPPU");
        if (checkExistanceResult.data.data.present_address_row_count === 0) {
          const payloadwwww = {
            ref_id: citizen_table_id,
            address_type: "present",
            address_for: userType === "G" ? "G" : "B",
            division_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.division_id
              : groomInfo.division_id,
            district_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.district_id
              : groomInfo.district_id,
            upazila_city_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.upazila_id
              : groomInfo.upazila_id,
            union_thana_pur_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.union_id
              : groomInfo.union_id,
            postal_id: 0,
            word: "W",
            status: "N",
            address_details: payloadFromMarriageInof
              ? payloadFromMarriageInof.details_address
              : groomInfo.details_address,
          };
          console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", payloadwwww);
          const result = await axios.post(addressCreateUrl, {
            ref_id: citizen_table_id,
            address_type: "present",
            address_for: userType === "G" ? "G" : "B",
            division_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.division_id
              : groomInfo.division_id,
            district_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.district_id
              : groomInfo.district_id,
            upazila_city_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.upazila_id
              : groomInfo.upazila_id,
            union_thana_pur_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.union_id
              : groomInfo.union_id,
            postal_id: 0,
            word: "W",
            status: "N",
            address_details: payloadFromMarriageInof
              ? payloadFromMarriageInof.details_address
              : groomInfo.details_address,
          });
          console.log("addresssssPOPOPOPO", result);
        } else {
          const result = await axios.put(addressUpdateUrl, {
            division_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.division_id
              : groomInfo.division_id,
            district_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.district_id
              : groomInfo.district_id,
            upazila_city_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.upazila_id
              : groomInfo.upazila_id,
            union_thana_pur_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.union_id
              : groomInfo.union_id,
            postal_id: 0,
            word: 10,
            address_details: payloadFromMarriageInof
              ? payloadFromMarriageInof.details_address
              : groomInfo.details_address,
            ref_id: citizen_table_id,
            address_type: "present",
          });
        }
        if (checkExistanceResult.data.data.permanent_address_row_count === 0) {
          console.log("adrresssspostttttttttttt");
          const result = await axios.post(addressCreateUrl, {
            ref_id: citizen_table_id,
            address_type: "permanent",
            address_for: userType === "G" ? "G" : "B",
            division_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_division_id
              : groomInfo.per_division_id,
            district_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_district_id
              : groomInfo.per_district_id,
            upazila_city_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_upazila_id
              : groomInfo.per_upazila_id,
            union_thana_pur_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_union_id
              : groomInfo.per_union_id,
            postal_id: 0,
            word: "W",
            status: "N",
            address_details: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_details_address
              : groomInfo.per_details_address,
          });
          console.log("addresssssPOPOPOPO", result);
        } else {
          const result = await axios.put(addressUpdateUrl, {
            division_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_division_id
              : groomInfo.per_division_id,
            district_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_district_id
              : groomInfo.per_district_id,
            upazila_city_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_upazila_id
              : groomInfo.per_upazila_id,
            union_thana_pur_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_union_id
              : groomInfo.per_union_id,
            postal_id: 0,
            word: 10,
            address_details: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_details_address
              : groomInfo.per_details_address,
            ref_id: citizen_table_id,
            address_type: "permanent",
          });
          console.log("addresssssUPUPUPPPPUPUPU", result);
        }
      } else {
        let brideGroomAllInfoPayload = {
          citizenInfo: {
            citizen_doc_type: "NID",
            citizen_doc_no: payloadFromMarriageInof
              ? payloadFromMarriageInof.nid
              : groomInfo.nid,

            citizen_name: payloadFromMarriageInof
              ? payloadFromMarriageInof.name
              : groomInfo.name,
            citizen_dob: payloadFromMarriageInof
              ? payloadFromMarriageInof.dob
              : groomInfo.dob,
            citizen_mobile: payloadFromMarriageInof
              ? payloadFromMarriageInof.mobile_no
              : groomInfo.mobile_no,
            citizen_email: payloadFromMarriageInof
              ? payloadFromMarriageInof.email
              : groomInfo.email,
            citizen_religion: payloadFromMarriageInof
              ? payloadFromMarriageInof.relegion
              : groomInfo.relegion,
            citizen_father_name: payloadFromMarriageInof
              ? payloadFromMarriageInof.father_name
              : groomInfo.father_name,
            citizen_father_nid: 0,
            citizen_mother_name: payloadFromMarriageInof
              ? payloadFromMarriageInof.mother_name
              : groomInfo.mother_name,
            citizen_mother_nid: 0,
          },
          presentAdress: {
            address_type: "present",
            address_for: userType === "G" ? "G" : "B",
            division_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.division_id
              : groomInfo.division_id,
            district_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.district_id
              : groomInfo.district_id,
            upazila_city_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.upazila_id
              : groomInfo.upazila_id,
            union_thana_pur_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.union_id
              : groomInfo.union_id,
            postal_id: 0,
            address_details: payloadFromMarriageInof
              ? payloadFromMarriageInof.details_address
              : groomInfo.details_address,
          },
          permanentAdress: {
            address_type: "permanent",
            address_for: userType === "G" ? "G" : "B",
            division_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_division_id
              : groomInfo.per_division_id,
            district_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_district_id
              : groomInfo.per_district_id,
            upazila_city_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_upazila_id
              : groomInfo.per_upazila_id,
            union_thana_pur_id: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_union_id
              : groomInfo.per_union_id,
            postal_id: 0,
            address_details: payloadFromMarriageInof
              ? payloadFromMarriageInof.per_details_address
              : groomInfo.per_details_address,
          },
        };
        console.log("সংরক্ষণ করুন");
        console.log("brideAllInfoData", brideGroomAllInfoPayload);
        const brideAllInfoData = await axios.post(
          bridesBasicInfo,
          brideGroomAllInfoPayload
        );

        setGroomInfo({
          ...groomInfo,
          nid: "",
          name: "",
          dob: "",
          mobile_no: "",
          email: "",
          relegion: "নির্বাচন করুন",
          father_name: "",

          mother_name: "",

          address_type: "",
          user_type: "",
          district_id: "নির্বাচন করুন",
          upazila_id: "নির্বাচন করুন",
          union_id: "নির্বাচন করুন",
          post_code: "নির্বাচন করুন",
          details_address: "",
          per_address_type: "",
          per_user_type: "",
          per_district_id: "নির্বাচন করুন",
          per_upazila_id: "নির্বাচন করুন",
          per_union_id: "নির্বাচন করুন",
          per_post_code: "নির্বাচন করুন",
          per_details_address: "",
        });
        setData(null);
      }

      NotificationManager.success("সফলভাবে ডেটা সংরক্ষণ করা হয়েছে");
    } catch (error) {
      if (error.response) {
        let message = error.response.data.errors[0].message;
        NotificationManager.error(message, "ত্রুটি পাওয়া গেছে", 5000);
      } else if (error.request) {
        NotificationManager.error("সংযোগ ত্রুটি পাওয়া গেছে..", "Error", 5000);
      } else if (error) {
      }
    }
  };
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  const [nidDataFatch, setNidDataFatch] = useState();
  const handlerOnFatchData = async (event) => {
    setNidDataFatch(event.target.value);

    if (event.key === "Enter") {
      let nidVal = nidDataFatch;
      console.log("nidVal", nidVal);
      try {
        const nidData = await axios.get(
          BrideOrGroomAllInfoGetUrl + event.target.value
        );
        const dataa = nidData.data.data;
        console.log("niddata", dataa);

        console.log(date);

        if (dataa !== null) {
          const date = formatDate(dataa.citizenInfo.citizen_dob);
          const age = getAge(date);

          formErrors.dob = age < 21 && "বরের বয়স ২১ বছর হতে হবে";
          setData(dataa);
          console.log("data not null", dataa);

          setGroomInfo({
            nid: dataa.citizenInfo.citizen_doc_no,
            name: dataa.citizenInfo.citizen_name,
            dob: date,
            mobile_no: dataa.citizenInfo.citizen_mobile,
            email: dataa.citizenInfo.citizen_email,
            relegion: dataa.citizenInfo.citizen_religion,
            father_name: dataa.citizenInfo.citizen_father_name,

            mother_name: dataa.citizenInfo.citizen_mother_name,

            ...(dataa.presentAdress && {
              address_type: dataa.presentAdress.address_type,

              division_id: dataa.presentAdress.division_id,
              district_id: dataa.presentAdress.district_id,
              upazila_id: dataa.presentAdress.upazila_city_id,
              union_id: dataa.presentAdress.union_thana_pur_id,
              post_code: dataa.presentAdress.postal_id,
              details_address: dataa.presentAdress.address_details,
              ...(dataa.permanentAdress && {
                per_address_type: "permanent",

                per_division_id: dataa.permanentAdress.division_id,
                per_district_id: dataa.permanentAdress.district_id,
                per_upazila_id: dataa.permanentAdress.upazila_city_id,
                per_union_id: dataa.permanentAdress.union_thana_pur_id,
                per_post_code: dataa.permanentAdress.postal_id,
                per_details_address: dataa.permanentAdress.address_details,
              }),
            }),
            ...(dataa.presentAdress === undefined && {
              address_type: "",
              user_type: "",
              division_id: "নির্বাচন করুন",
              district_id: "নির্বাচন করুন",
              upazila_id: "নির্বাচন করুন",
              union_id: "নির্বাচন করুন",
              post_code: "নির্বাচন করুন",
              details_address: "",
              ...(dataa.permanentAdress === undefined && {
                per_address_type: "",
                per_user_type: "",
                per_division_id: "নির্বাচন করুন",
                per_district_id: "নির্বাচন করুন",
                per_upazila_id: "নির্বাচন করুন",
                per_union_id: "নির্বাচন করুন",
                per_post_code: "নির্বাচন করুন",
                per_details_address: "",
              }),
            }),
          });

          if (
            dataa.presentAdress === undefined &&
            dataa.permanentAdress === undefined
          ) {
          } else {
          }
        } else {
          console.log("not nulkl");
          setData(null);

          setGroomInfo({
            nid: "",
            name: "",
            dob: "",
            mobile_no: "",
            email: "",
            relegion: "নির্বাচন করুন",
            father_name: "",

            mother_name: "",

            address_type: "",
            user_type: "",
            division_id: "নির্বাচন করুন",
            district_id: "নির্বাচন করুন",
            upazila_id: "নির্বাচন করুন",
            union_id: "নির্বাচন করুন",
            post_code: "নির্বাচন করুন",
            details_address: "",
            per_address_type: "",
            per_user_type: "",
            per_division_id: "নির্বাচন করুন",
            per_district_id: "নির্বাচন করুন",
            per_upazila_id: "নির্বাচন করুন",
            per_union_id: "নির্বাচন করুন",
            per_post_code: "নির্বাচন করুন",
            per_details_address: "",
          });
        }
      } catch (error) {
        console.log("error", error);
        setGroomInfo({
          ...groomInfo,
          name: "",
          dob: "",
          father_name: "",
          mother_name: "",
        });
        setBrideMaritalStatus("");
      }
    }
  };

  const children = props.children;
  const picOpenCloseLefRightFunction = {
    handleOpenPic,
    handleOpenRight,
    handleOpenLeft,
    handleClosePic,
    handleCloseRight,
    handleCloseLeft,
    handleOpenCamera,
    handleCloseCamera,
    handleOpenFinger,
    handleOnSubmitPic,
    handleOnSubmitLeftFP,
    onImageConfirm,
    goomPicSubmit,
  };

  return children(
    groomInfo,
    handleChange,
    onSubmitData,
    getUserInfoById,
    handlerOnFatchData,
    formErrors,
    data,
    groomPic,
    groomPicture,
    picOpenCloseLefRightFunction,
    goomPicSubmit,
    fingerVerify,
    LeftFP
  );
};

export default BrideGroomAndMarriageInfoRenderProps;
