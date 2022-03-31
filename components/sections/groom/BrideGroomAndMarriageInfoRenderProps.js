import React, { useState, useEffect } from "react";

import axios from "axios";

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
  getDocumentUrlDummy,
  marriageInofUniqueCheckUrl,
  marriageInfoBasicInfoUrl,
  marriageAndSpecialMarriageInfoUpdateUrl,
} from "../../../url/ApiList";
import { BrideOrGroomAllInfoGetUrl } from "../../../url/ApiList";
import { NotificationManager } from "react-notifications";

const BrideGroomAndMarriageInfoRenderProps = (props) => {
  //Set bride Marital StatusgroomInfo
  const [brideMaritalStatus, setBrideMaritalStatus] = useState();

  /*********Groom Picture Finger Signatue State *********/

  const [openPic, setOpenPic] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);

  const [groomPic, setGroomPic] = useState({
    groomImage: "",
    mimetypeback: "",
  });
  const [fingerVerify, setFingerVerify] = useState(false);
  const [LeftFP, setLeftFP] = useState(false);
  const [goomPicSubmit, setGoomPicSubmit] = useState({});
  const [flagForImage, setFlagForImage] = useState("data:image/jpg;base64,");
  const [RightFP, setRightFP] = useState(false);
  //   Submit Button Click on Modal
  const [payloadImg, setPayloadImg] = useState({
    image1: "",
    image2: "",
  });

  /*********Groom Picture Finger Signatue State End*********/

  /*********Groom Picture Finger Signatue Function *********/
  const handleOpenPic = () => setOpenPic(true);
  const handleOpenRight = () => setOpenRight(true);
  const handleOpenLeft = () => setOpenLeft(true);
  const handleClosePic = () => setOpenPic(false);
  const handleCloseRight = () => setOpenRight(false);
  const handleCloseLeft = () => setOpenLeft(false);
  const handleOpenCamera = () => setOpenCamera(true);
  const handleCloseCamera = () => setOpenCamera(false);
  const handleOpenFinger = async (e) => {
    console.log("Hi I am hereeeeeeeeeee");
    const fingerobj = {
      MinQ: 30,
      Retry: 3,
      TokenId: "g86v5s4g5se84g5sfd4g5werx25sdf4f",
    };
    try {
      const getFingerData = await axios.post(fingerSdkApi, fingerobj);
      console.log("FingerDataaaaa", getFingerData);
      if (getFingerData.status === 200) {
        setFingerVerify(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const groomPicture = (e) => {
    console.log("In groom picture");
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

    if (groomInfo.nid === "") {
      NotificationManager.error(
        "ছবি ডামি ইসি ডাটাবেসে পাওয়া যায়নি",
        "Title here"
      );
    } else {
      let payloadBase64 = {
        citizenDocId: groomInfo.nid,
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

  const handleOnSubmitRightFP = () => {
    setRightFP(true);
    handleCloseRight(true);
  };

  //Submit Left Finger

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
  /*********Groom Picture Finger Signatue Function End*********/

  /*********BridreGroom State Start*********/
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

  /*********BridreGroom State End*********/

  /**Data Fetch From Api State */
  const [data, setData] = useState(null);

  /*********BrideGroom Form Error State Start*********/
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

  /*********BrideGroom Form Error State Start*********/

  /***Get Age function of BrideGroom Start*******/
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

  /***Get Age function of BrideGroom End*******/

  /***Email And Mbile Regex For Checking Valid BrideGrommMObile And Email Start*******/

  const emailRegex = RegExp(
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  );
  const mobileRegex = RegExp(/(^(01){1}[3456789]{1}(\d){8})$/);

  /***Email And Mbile Regex For Checking Valid BrideGrommMObile And Email End*******/

  /***BrideGroom Handle Change Start*******/
  const hadnleChange = (e, userType) => {
    const { name, value } = e.target;
    switch (name) {
      case "nid":
        setGroomInfo({
          ...groomInfo,
          //For dynamic key we use []
          [e.target.name]: e.target.value,
        });
        if (userType) {
          if (userType === "G") {
            localStorage.setItem("groomNid", groomInfo.nid);
          }
          if (userType === "B") {
            localStorage.setItem("brideNid", groomInfo.nid);
          }
        }

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

        if (userType === "G") {
          formErrors.dob = age < 21 && "বরের বয়স ২১ বছর হতে হবে";
        }
        if (userType === "B") {
          formErrors.dob = age < 18 && "বরের বয়স ১৮ বছর হতে হবে";
        }
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

  /***BrideGroom Handle Change End*******/

  /***Clear Bride Groom State When Necessary start*******/
  const clearBrideGroomState = () => {
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
  };

  /***Clear Bride Groom State When Necessary End*******/

  /***Set Bride Groom State When Necessary Start*******/
  const setGroomBrideStateAccordingToApiData = (date, dataa) => {
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
  };

  /***Set Bride Groom State When Necessary End*******/

  /***Fetch User Data Acording To BridGroom Self Page And Bride Groom From Kazi Dashboard Start*******/

  const fetchUserDataAccordingToPage = async (nid) => {
    try {
      const nidData = await axios.get(BrideOrGroomAllInfoGetUrl + nid);
      const dataa = nidData.data.data;
      console.log("niddata", dataa);
      if (dataa !== null) {
        setData(dataa);
        const date = formatDate(dataa.citizenInfo.citizen_dob);

        console.log("data not null", dataa);
        setGroomBrideStateAccordingToApiData(date, dataa);
      } else {
        console.log("not nulkl");
        setData(null);
        console.log("typypee========", dataType);
        clearBrideGroomState();
      }
      console.log(date);
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
  };

  /***Fetch User Data Acording To BridGroom Self Page And Bride Groom From Kazi Dashboard End*******/

  //***Get USer INfo By Id Start */

  const getUserInfoById = async (title, pageType) => {
    if (title === "MarriageInfo" && pageType === "G") {
      console.log("I am here in g");
      const groomIdFromLocal = localStorage.getItem("groomNid");
      fetchUserDataAccordingToPage(groomIdFromLocal);
    } else if (title === "MarriageInfo" && pageType === "B") {
      console.log("I am here in b");
      setLeftFP(false);
      setGoomPicSubmit("");
      setGroomPic({
        groomImage: "",
        mimetypeback: "",
      });
      const brideIdFromLocal = localStorage.getItem("brideNid");
      if (!brideIdFromLocal) {
        clearBrideGroomState();
        return;
      }
      fetchUserDataAccordingToPage(brideIdFromLocal);
    } else {
      console.log("I am here in else");
      const userData = JSON.parse(localStorage.getItem("userData"));
      console.log("I am in else userData", userData);
      if (!userData) {
        return;
      }

      const userId = userData.citizen_doc_no;
      console.log("I am in else userData", userId);
      fetchUserDataAccordingToPage(userId);
    }
  };

  //***Get USer INfo By Id End */

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

        clearBrideGroomState();
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
  const handlerOnFatchData = async (event, userType) => {
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
          if (userType === "G") {
            localStorage.setItem("groomNid", groomInfo.nid);
          }
          if (userType === "B") {
            localStorage.setItem("brideNid", groomInfo.nid);
          }
          if (userType === "G") {
            formErrors.dob = age < 21 && "বরের বয়স ২১ বছর হতে হবে";
          }
          if (userType === "B") {
            formErrors.dob = age < 18 && "বরের বয়স ১৮ বছর হতে হবে";
          }

          setData(dataa);
          console.log("data not null", dataa);

          setGroomBrideStateAccordingToApiData(date, dataa);

          if (
            dataa.presentAdress === undefined &&
            dataa.permanentAdress === undefined
          ) {
          } else {
          }
        } else {
          console.log("not nulkl");
          setData(null);

          clearBrideGroomState();
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

  const picOpenRightLeftCameraFlagIForImage = {
    openPic,
    openRight,
    openLeft,
    openCamera,
    flagForImage,
  };

  //*********************MarriageInfo********************** */
  let mrg_Id;
  const [isHusbandPerfomDevorce, setIsHunbandPerformDevorec] =
    React.useState(false);
  const [
    isHusbandTakenPrmissionFromCurrentWife,
    setHusbandTakenPermissionFromCurrentWife,
  ] = React.useState(false);

  const [isDevorcy, setIsDevorcy] = React.useState(false);
  const [marriageInfo, setMarriageInfo] = React.useState({
    status: "",
    nikahnama_no: "",
    sonod_no: "",
    marriage_fixed_date: "",
    marriage_date: "",
    marriage_reg_date: "",
    denmohor_status: "",
    muajjol: "",
    muajjil: "",
    denmohor: "",
    paid_denmohor_amount: "",
    special_info: "",
    special_info_for: "",
    special_info_type: "",
    divorce_con: "",
    alimony_con: "",
    permission_no: "",
    permission_date: "",
    spc_status: "",
    brideDoc: "",
    groomDoc: "",
    division_id: "",
    district_id: "",
    upazila_id: "",
    union_id: "",
    detail_address: "",
  });

  const [formErrorsMrg, setFormErrorsMrg] = React.useState({
    gb_id: "",
    district_id: "",
    upazila_id: "",
    union_id: "",
    post_code: "",
    detail_address: "",
    fixed_on: "",
    marriage_date: "",
    reg_date: "",
    denmohor: "",
    paid_denmohor: "",
    muazzol: "",
    muazzil: "",
    mrg_id: "",
    whom: "",
    mrg_status: "",
    devorce_con: "",
    revoke_per: "",
    alimony_pr: "",
    per_no: "",
    per_date: "",
    brideDoc: "",
    groomDoc: "",
  });
  const [files, setFiles] = useState([]);

  const [isAlimonyGiven, setIsAlimonyGiven] = React.useState(false);
  function maritalStatusChangeHandler(event) {
    if (event.target.value === "devorcy") {
      setIsDevorcy(true);
    } else {
      setIsDevorcy(false);
      setIsAlimonyGiven(false);
    }
  }
  function isHusbandPerfomDevorceChangeHandler(event) {
    console.log(event.target.value);
    if (event.target.value === "married") {
      setIsHunbandPerformDevorec(true);
    }
    if (event.target.value === "unmarried") {
      setIsHunbandPerformDevorec(false);
    }
    if (isHusbandTakenPrmissionFromCurrentWife === true) {
      setHusbandTakenPermissionFromCurrentWife(false);
    }
  }
  function isHusbandTakenPermissonFromWifeHandler(event) {
    if (event.target.value === "takenPermission") {
      setHusbandTakenPermissionFromCurrentWife(true);
    }
  }

  function husbandsRightRevokedChangeHandler(event) {
    if (event.target.value === "khorposhEvidence") {
      setIsAlimonyGiven(true);
    }
  }
  let checkFormErrorMrg = () => {
    console.log(`formErrornid:${formErrors.nid}`);
    console.log(`formErrorname:${formErrors.name}`);
    let flag = false;
    for (const key in formErrors) {
      if (formErrors[key].length > 0) {
        flag = true;
      }
    }
    return flag;
  };
  const hadnleChangeMrg = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setMarriageInfo({
      ...marriageInfo,
      [name]: e.target.value,
    });
    switch (e.target.name) {
      case "marriage_fixed_date":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        formErrors.fixed_on = value === "" && "তারিখ দিন";
        break;
      case "marriage_date":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        formErrors.marriage_date = value === "" && "তারিখ দিন";
        break;
      case "marriage_reg_date":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        formErrors.reg_date = value === "" && "তারিখ দিন";
        break;
      case "denmohor":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        formErrors.denmohor = value === "" && "দেনমোহরের পরিমাণ দিন";
        break;
      case "muajjol":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        formErrors.denmohor = value === "" && "মুয়াজ্জল পরিমাণ দিন";
        break;
      case "muajjil":
        setMarriageInfo({ ...marriageInfo, [name]: value });

        formErrors.denmohor = value === "" && "মুয়াজ্জিল পরিমাণ দিন";
        break;
      case "paid_denmohor_amount":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        formErrors.denmohor = value === "" && "আদায়কৃতদেনমোহরের পরিমাণ দিন";
        break;
      case "whom":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        break;
      case "mrg_status":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        console.log("mrg_vlu", value);
        break;
      case "devorce_con":
        marriageInfo.devorce_con = value;
        // setMarriageInfo({ ...marriageInfo.devorce_con, [name]: value });
        console.log("omg", e.target.name);
        console.log("omg", e.target.value);
        break;
      case "alimony_con":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        break;

      case "permission_no":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        break;
      case "permission_date":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        break;
      case "brideDoc":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        break;
      case "groomDoc":
        setMarriageInfo({ ...marriageInfo, [name]: value });
        break;
      case "division_id":
        console.log("I am in divvvvvvvvvvvvvvvvvvvvvvvvvv");
        setMarriageInfo({ ...marriageInfo, [e.target.name]: e.target.value });
        break;
      case "district_id":
        setMarriageInfo({ ...marriageInfo, [e.target.name]: e.target.value });
        break;
      case "upazila_id":
        setMarriageInfo({ ...marriageInfo, [e.target.name]: e.target.value });
        break;
      case "union_id":
        setMarriageInfo({ ...marriageInfo, [e.target.name]: e.target.valuee });
        break;
      case "detail_address":
        setMarriageInfo({ ...marriageInfo, [e.target.name]: e.target.valuee });
        break;
        break;
    }
  };
  let onSubmitDataMrg = async (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log("mrg_payloaddddd", marriageInfo);
    const groomNid = localStorage.getItem("groomNid");
    const brideNid = localStorage.getItem("brideNid");
    const uniqueCheck = await axios.get(
      marriageInofUniqueCheckUrl + groomNid + "/" + brideNid
    );
    console.log("mrginfoUniquerdReslut", uniqueCheck);

    if (uniqueCheck.data.data.mrg_info_count === 0) {
      let payload = {
        marriage_info: {
          bride_id: brideNid,
          groom_id: groomNid,
          status: "M",
          nikahnama_no: Math.floor(100000 + Math.random() * 900000),
          sonod_no: Math.floor(100000 + Math.random() * 900000),
        },
        marriage_special_info: {
          marriage_fixed_date: marriageInfo.marriage_fixed_date,
          marriage_date: marriageInfo.marriage_date,
          marriage_reg_date: marriageInfo.marriage_reg_date,
          denmohor: Number(marriageInfo.denmohor),
          denmohor_status: "P",
          muajjol: Number(marriageInfo.muajjol),
          muajjil: Number(marriageInfo.muajjil),
          paid_denmohor_amount: Number(marriageInfo.paid_denmohor_amount),
          special_info: "D",
          special_info_for: "B",
          special_info_type: "D",
          divorce_con: marriageInfo.divorce_con,
          alimony_con: marriageInfo.alimony_con,
          permission_no: Number(marriageInfo.permission_no),
          permission_date:
            marriageInfo.permission_date === ""
              ? "2022-5-5"
              : marriageInfo.permission_date,
          status: "D",
        },
      };

      try {
        const marriageBasicDataResult = await axios.post(
          marriageInfoBasicInfoUrl,
          payload
        );
        mrg_Id = marriageBasicDataResult.data.data.mrg_info_id;
        localStorage.setItem(
          "nikahnama_no_id",
          marriageBasicDataResult.data.data.mrg_info_id
        );

        const marriageInfoTablePrimaryKey =
          marriageBasicDataResult.data.data.mrg_info_id;
        const specialMarriageInfoId =
          marriageBasicDataResult.data.data.mrg_special_id;
        localStorage.setItem("mrg_info_id", marriageInfoTablePrimaryKey);
        localStorage.setItem("mrg_special_id", specialMarriageInfoId);
        console.log("marriageBasicDataResult", marriageBasicDataResult);

        NotificationManager.success("সফলভাবে ডেটা সংরক্ষণ করা হয়েছে");

        //router.push({ pathname: "/coop/income-expense" });
      } catch (error) {
        if (error.response) {
          let message = error.response.data.errors[0].message;
          NotificationManager.error(message, "ত্রুটি পাওয়া গেছে", 5000);
        } else if (error.request) {
          NotificationManager.error(
            "সংযোগ ত্রুটি পাওয়া গেছে..",
            "Error",
            5000
          );
        } else if (error) {
          // NotificationManager.error(error.toString(), "Error", 5000);
        }
      }
    } else {
      let payload = {
        marriage_info: {
          marriage_id: uniqueCheck.data.data.mrg_info_id,
          bride_id: brideNid,
          groom_id: groomNid,
          status: "M",
        },
        marriage_special_info: {
          id: uniqueCheck.data.data.mrg_special_id,
          marriage_fixed_date: marriageInfo.marriage_fixed_date,
          marriage_date: marriageInfo.marriage_date,
          marriage_reg_date: marriageInfo.marriage_reg_date,
          denmohor: Number(marriageInfo.denmohor),
          denmohor_status: "P",
          muajjol: Number(marriageInfo.muajjol),
          muajjil: Number(marriageInfo.muajjil),
          paid_denmohor_amount: Number(marriageInfo.paid_denmohor_amount),
          special_info: "D",
          special_info_for: "B",
          special_info_type: "D",
          divorce_con: marriageInfo.divorce_con,
          alimony_con: marriageInfo.alimony_con,
          permission_no: Number(marriageInfo.permission_no),
          permission_date:
            marriageInfo.permission_date === ""
              ? "2022-5-5"
              : marriageInfo.permission_date,
          status: "D",
        },
      };
      // console.log("marriagePayloaduppppppp", payload);
      try {
        const marriageBasicDataResult = await axios.put(
          marriageAndSpecialMarriageInfoUpdateUrl,
          payload
        );

        const marriageInfoTablePrimaryKey =
          marriageBasicDataResult.data.data.mrg_info_id;
        const specialMarriageInfoId =
          marriageBasicDataResult.data.data.mrg_special_id;

        // console.log(
        //   "marriageBasicDataResultupppppp",
        //   marriageBasicDataResult
        // );

        NotificationManager.success("সফলভাবে ডেটা সংরক্ষণ করা হয়েছে");

        //router.push({ pathname: "/coop/income-expense" });
      } catch (error) {
        if (error.response) {
          let message = error.response.data.errors[0].message;
          NotificationManager.error(message, "ত্রুটি পাওয়া গেছে", 5000);
        } else if (error.request) {
          NotificationManager.error(
            "সংযোগ ত্রুটি পাওয়া গেছে..",
            "Error",
            5000
          );
        } else if (error) {
          // NotificationManager.error(error.toString(), "Error", 5000);
        }
      }
    }
  };
  const handleAdd = (newFiles) => {
    newFiles = newFiles.filter(
      (file) => !files.find((f) => f.data === file.data)
    );
    setFiles([...files, ...newFiles]);
  };

  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };

  const devorceConOnChagneMrg = (e) => {
    hadnleChange(e);
    husbandsRightRevokedChangeHandler(e);
  };
  const khorposhOnchangeMrg = (e) => {
    hadnleChange(e);
    husbandsRightRevokedChangeHandler(e);
  };

  const handleAddDeleteObjMrg = {
    handleAdd,
    handleDelete,
  };

  const performDevorcePermissionDevorcyFilesAlimonyStateObjMrg = {
    isHusbandPerfomDevorce,
    isHusbandTakenPrmissionFromCurrentWife,
    isDevorcy,
    files,
    isAlimonyGiven,
  };
  const marritalStatusDevorcePermissionRightRevokChangeHandlerObjMrg = {
    maritalStatusChangeHandler,
    isHusbandPerfomDevorceChangeHandler,
    isHusbandTakenPermissonFromWifeHandler,
    husbandsRightRevokedChangeHandler,
  };

  return children(
    groomInfo,
    hadnleChange,
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
    LeftFP,
    picOpenRightLeftCameraFlagIForImage,
    marriageInfo,
    formErrorsMrg,
    hadnleChangeMrg,
    onSubmitDataMrg,
    performDevorcePermissionDevorcyFilesAlimonyStateObjMrg,
    marritalStatusDevorcePermissionRightRevokChangeHandlerObjMrg,
    checkFormErrorMrg,
    handleAddDeleteObjMrg,
    devorceConOnChagneMrg,
    khorposhOnchangeMrg
  );
};

export default BrideGroomAndMarriageInfoRenderProps;
