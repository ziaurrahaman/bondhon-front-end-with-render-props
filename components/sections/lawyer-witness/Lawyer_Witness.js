import { React, useState } from "react";
import {
  Grid,
  Typography,
  Stack,
  InputAdornment,
  TextField,
  Container,
  Paper,
} from "@mui/material";
import Title from "../../shared/others/HeadTitle";
import Address from "../../shared/others/addressNew";
import WitnessForm from "./WitnessForm";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MaleIcon from "@mui/icons-material/Male";
import axios from "axios";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import {
  nidVerifyUrl,
  updateMarriageInfoUrl,
  nidServerGetDataUrl,
} from "../../../url/ApiList";
import { useDispatch, useSelector } from "react-redux";
import { SetLawyerFatherAndWitnessAction } from "../../../redux/actions/lawyerFatherAndWitnessAction";
import AllFormContext from "../../shared/others/zone_form_context.json";
import ZoneComponent from "../../shared/others/ZoneComponent";
import { useEffect } from "react";
const LawyerWitness = (props) => {
  const lawyerWitnessInfo = useSelector((state) => state.lawyerAndWitness);
  const dispatch = useDispatch();
  const [allFormContext, setAllFormContext] = useState([]);
  const [lawyerFatherInfo, setLawyerFatherInfo] = useState({
    lawyer_father_id: lawyerWitnessInfo.lawyer_father_id
      ? lawyerWitnessInfo.lawyer_father_id
      : "",
    dob: lawyerWitnessInfo.dob ? lawyerWitnessInfo.dob : "",
    name: lawyerWitnessInfo.name ? lawyerWitnessInfo.name : "",
    division_id: "",
    district_id: lawyerWitnessInfo.district_id
      ? lawyerWitnessInfo.district_id
      : "",
    upazila_id: lawyerWitnessInfo.upazila_id
      ? lawyerWitnessInfo.upazila_id
      : "",
    post_code: lawyerWitnessInfo.post_code ? lawyerWitnessInfo.post_code : "",
    union_id: lawyerWitnessInfo.union_id ? lawyerWitnessInfo.union_id : "",
    detail_address: lawyerWitnessInfo.detail_address
      ? lawyerWitnessInfo.detail_address
      : "",
  });

  const [formErrorsLawyer, setFormErrorsLawyer] = useState({
    nid: "",
    dob: "",
    name: "",
    district_id: "",
    upazila_id: "",
    post_code: "",
    union_id: "",
    detail_address: "",
  });
  function formatDateInString(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  useEffect(() => {
    setAllFormContext(AllFormContext.fields);
  }, []);
  const onFetchNidServerData = async (e) => {
    // if (e.key === "Enter") {
    if (lawyerFatherInfo.lawyer_father_id !== "" && lawyerFatherInfo.dob) {
      try {
        const nidServerData = await axios.get(
          nidServerGetDataUrl +
            "/" +
            lawyerFatherInfo.lawyer_father_id +
            "/" +
            lawyerFatherInfo.dob
        );
        if (nidServerData) {
          setLawyerFatherInfo({
            ...lawyerFatherInfo,
            lawyer_father_id: nidServerData.data.data.nid
              ? nidServerData.data.data.nid
              : nidServerData.data.data.citizen_doc_no,

            dob: formatDateInString(
              nidServerData.data.data.dob
                ? nidServerData.data.data.dob
                : nidServerData.data.data.citizen_dob
            ),
            religion: "নির্বাচন করুন",
            name: nidServerData.data.data.nameEn
              ? nidServerData.data.data.nameEn
              : nidServerData.data.data.citizen_name,
          });
        }
        console.log("nidserverdata", nidServerData.data.data);
      } catch (error) {
        console.log("nidServerError", error);
      }
    }
    // }
  };

  function giveValueToTextField(index) {
    const ids = [
      lawyerFatherInfo.division_id,
      lawyerFatherInfo.district_id,
      lawyerFatherInfo.upazila_id,
      lawyerFatherInfo.union_id,
    ];
    console.log("idINdex", index);
    return ids[index];
  }

  /********************************* Validation ******************************************************/
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch(SetLawyerFatherAndWitnessAction(lawyerFatherInfo));
    switch (e.target.name) {
      case "lawyer_father_id":
        setLawyerFatherInfo({
          ...lawyerFatherInfo,
          [e.target.name]: e.target.value,
        });
        formErrorsLawyer.nid =
          value.length == 10 ||
          value.length == 13 ||
          value.length == 17 ||
          value.length == 0
            ? ""
            : "আপনার সঠিক এনআইডি প্রদান করুন";

        localStorage.setItem("lawyer_father_id", value);
        dispatch(
          SetLawyerFatherAndWitnessAction({
            lawyer_father_id: value,
          })
        );

        console.log("lawyer_father_id", value);

        break;
      case "dob":
        setLawyerFatherInfo({
          ...lawyerFatherInfo,
          [e.target.name]: value,
        });
        // onFetchNidServerData(e);
        formErrorsLawyer.dob = value === "" && "জন্ম তারিখ দিন";
        break;
      case "name":
        setLawyerFatherInfo({
          ...lawyerFatherInfo,
          [e.target.name]: e.target.value,
        });
        formErrorsLawyer.name =
          value.length < 6 && value.length > 0
            ? "সর্বনিন্ম ৬টি অক্ষর প্রদান"
            : "";
        break;
      case "division_id":
        setLawyerFatherInfo({
          ...lawyerFatherInfo,
          [e.target.name]: e.target.value,
        });
        formErrorsLawyer.district_id =
          value === "" && "জেলা এর ধরণ নির্বাচন করুন";
        break;
      case "district_id":
        setLawyerFatherInfo({
          ...lawyerFatherInfo,
          [e.target.name]: e.target.value,
        });
        formErrorsLawyer.district_id =
          value === "" && "জেলা এর ধরণ নির্বাচন করুন";
        break;
      case "upazila_id":
        setLawyerFatherInfo({
          ...lawyerFatherInfo,
          [e.target.name]: e.target.value,
        });
        formErrorsLawyer.upazila_id =
          value === "" && "উপজেলা/সিটি কর্পোরেশন নির্বাচন করুন";
        break;
      case "union_id":
        setLawyerFatherInfo({
          ...lawyerFatherInfo,
          [e.target.name]: e.target.value,
        });
        formErrorsLawyer.union_id =
          value === "" && "ইউনিয়ন/পৌরসভা/থানা নির্বাচন করুন";
        break;

      case "post_code":
        setLawyerFatherInfo({
          ...lawyerFatherInfo,
          [e.target.name]: e.target.value,
        });
        formErrorsLawyer.post_code = value === "" && "ওয়ার্ড নির্বাচন করুন";
        break;
      case "detail_address":
        console.log("In detail address");
        setLawyerFatherInfo({
          ...lawyerFatherInfo,
          [e.target.name]: e.target.value,
        });
        formErrorsLawyer.detail_address =
          value === "" && "বিস্তারিত ঠিকানা দিন";
        break;
    }
  };

  /******************************** Data Fatch Form NID API ******************************************/

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  const [nidDataFatch, setNidDataFatch] = useState();

  const handlerOnFatchData = async (event) => {
    setNidDataFatch(event.target.value);

    // event.key === "Enter"
    if (event.key === "Enter") {
      let nidVal = nidDataFatch;
      console.log(nidVal);
      try {
        const nidData = await axios.get(nidVerifyUrl + nidVal);
        console.log(nidData);
        const data = nidData.data.data;
        const date = formatDate(data.dob);
        console.log(date);

        if (data !== null) {
          setLawyerFatherInfo({
            name: data.name,
            dob: date,
          });
        } else {
          setLawyerFatherInfo({
            name: "",
            dob: "",
          });
        }
      } catch (error) {
        console.log("error", error.response);
        setLawyerFatherInfo({
          name: "",
          dob: "",
        });
      }
    }
  };

  /**************************************************************************/

  return (
    <>
      <Container maxWidth="xl">
        <Paper
          sx={{ my: { xs: 2, md: 4 }, p: { xs: 1, md: 2 } }}
          elevation={3}
          rounded
        >
          <Title>
            <Typography variant="h6">উকিল বাবার তথ্য</Typography>
          </Title>

          <Grid container spacing={2} px={2} py={2}>
            <Grid item xs={12} sm={4} md={4}>
              <TextField
                required
                id="nid"
                name="lawyer_father_id"
                label="জাতীয় পরিচয়পত্র নাম্বার"
                fullWidth
                size="small"
                autoComplete="family-name"
                variant="outlined"
                onChange={handleOnChange}
                value={lawyerFatherInfo.lawyer_father_id}
                onKeyUp={handlerOnFatchData}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {formErrorsLawyer.nid.length > 0 && (
                <span style={{ color: "red" }}>{formErrorsLawyer.nid}</span>
              )}
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Stack>
                <TextField
                  name="dob"
                  id="dob"
                  label="জন্ম তারিখ"
                  fullWidth
                  size="small"
                  type="date"
                  // defaultValue="2021-12-27"
                  onChange={handleOnChange}
                  value={lawyerFatherInfo.dob}
                  onKeyUp={onFetchNidServerData}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <TextField
                required
                id="name"
                name="name"
                label="নাম"
                fullWidth
                size="small"
                autoComplete="given-name"
                onChange={handleOnChange}
                variant="outlined"
                value={lawyerFatherInfo.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MaleIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {formErrorsLawyer.name.length > 0 && (
                <span style={{ color: "red" }}>{formErrorsLawyer.name}</span>
              )}
            </Grid>
          </Grid>
          <Title>
            <Typography variant="h6">ঠিকানা</Typography>
          </Title>
          <Grid container spacing={2} px={2} py={2}>
            {allFormContext.map((form, i) => {
              var obj = Object.assign(
                {},
                { ...form },
                { value: giveValueToTextField(i) },
                { onChange: handleOnChange },
                {
                  division_Id: lawyerFatherInfo.division_id,
                },
                {
                  district_Id: lawyerFatherInfo.district_id,
                },
                {
                  upa_city_Id: lawyerFatherInfo.upazila_id,
                }
              );

              return (
                <>
                  <ZoneComponent {...obj} />
                </>
              );
            })}
            <Grid item xs={12} md={12} sm={12}>
              <TextField
                required
                id="village"
                name="detail_address"
                type="text"
                label="বিস্তারিত ঠিকানা"
                fullWidth
                onChange={handleOnChange}
                size="small"
                variant="outlined"
                value={lawyerFatherInfo.detail_address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddLocationIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {formErrorsLawyer.detail_address.length > 0 && (
                <span style={{ color: "red" }}>
                  {formErrorsLawyer.detail_address}
                </span>
              )}
            </Grid>
          </Grid>
          <Title>
            <Typography variant="h6">সাক্ষীর তথ্য</Typography>
          </Title>
          <Grid container spacing={2} px={2} py={2}>
            <Grid sm={12} md={12} xs={12} spacing={2}>
              <WitnessForm></WitnessForm>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
export default LawyerWitness;
