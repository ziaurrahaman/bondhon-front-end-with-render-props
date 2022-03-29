/* eslint-disable react-hooks/exhaustive-deps */
import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { geoData } from "../../url/ApiList";
const DistrictData = (props) => {
  let token =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("token"))
      : null;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { allreplica } = props;
  const { allDistrictData } = props;
  const { selectedDiv } = props;
  const { selectedWDiv } = props;
  const { childPass } = props;
  const { flag } = props;
  const [resultOfDistrict, setResultOfDistrict] = useState([]);
  const [resultOfWDistrict, setWResultOfDistrict] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [wdistrictId, setWDistrictId] = useState("");
  const { childDis } = props;
  const { childWDis } = props;

  allDistrictData({
    districtId,
    wdistrictId,
  });
  var district_Id = childDis ? childDis : "";

  let wdistrict_Id = childWDis ? childWDis : "";
  var district_id = childPass ? childPass.districtId : "";

  let changeDistrict = (e) => {
    setDistrictId(e.target.value);
  };
  let wchangeDistrict = (e) => {
    setWDistrictId(e.target.value);
  };
  useEffect(() => {
    getDistrict();
  }, [selectedDiv, selectedWDiv]);

  let getDistrict = async () => {
    try {
      if (flag) {
        if (selectedDiv) {
          let districtData = await axios.get(
            geoData + `district&divisionId=${selectedDiv}`,
            config
          );
          setResultOfDistrict(districtData.data.data);
        } else {
          let districtData = await axios.get(geoData + "district", config);
          setResultOfDistrict(districtData.data.data);
        }
      } else {
        if (selectedWDiv) {
          //  //console.log("Selected Working Div and Dis",selectedWDiv,wdistrictId);
          let districtData = await axios.get(
            geoData + `district&divisionId=${selectedWDiv}`,
            config
          );
          setWResultOfDistrict(districtData.data.data);
        } else {
          let districtData = await axios.get(geoData + "district", config);
          setWResultOfDistrict(districtData.data.data);
        }
      }
    } catch (error) {
      // //console.log("Error", error);
      // //console.log("Error", error.response);
    }
  };
  let getEditDistrict = async () => {
    try {
      if (flag) {
        if (division_id) {
          let districtData = await axios.get(
            geoData + `district&divisionId=${division_id}`,
            config
          );
          setResultOfDistrict(districtData.data.data);
        } else {
          let districtData = await axios.get(geoData + "district", config);
          setResultOfDistrict(districtData.data.data);
        }
      }
      // else if(flag==false)
      // {
      //     if(selectedWDiv){
      //         let districtData = await axios.get(District + `&divisionId=${selectedWDiv}`, config);
      //         setWResultOfDistrict(districtData.data.data);
      //         }
      //         else{
      //         let districtData = await axios.get(District, config);
      //         setWResultOfDistrict(districtData.data.data);

      // }
      // }
    } catch (error) {
      // //console.log("Error", error);
      // //console.log("Error", error.response);
    }
  };

  return (
    <>
      {/* <Grid item md={allreplica==6?2:2.4} xs={12}> */}
      {flag ? (
        <TextField
          fullWidth
          label="জেলা"
          name="district"
          onChange={changeDistrict}
          required
          select
          SelectProps={{ native: true }}
          value={district_Id ? district_Id : districtId || district_id}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "#FFF" }}
        >
          <option>- নির্বাচন করুন -</option>
          {resultOfDistrict.map((option) => (
            <option key={option.id} value={option.id}>
              {option.districtNameBangla}
            </option>
          ))}
        </TextField>
      ) : (
        <TextField
          fullWidth
          label="জেলা"
          name="wdistrict"
          onChange={wchangeDistrict}
          required
          select
          SelectProps={{ native: true }}
          value={wdistrict_Id ? wdistrict_Id : wdistrictId}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "#FFF" }}
        >
          <option>- নির্বাচন করুন -</option>
          {resultOfWDistrict.map((option) => (
            <option key={option.id} value={option.id}>
              {option.districtNameBangla}
            </option>
          ))}
        </TextField>
      )}

      {/* </Grid> */}
    </>
  );
};

export default DistrictData;
