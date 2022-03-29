/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, TextField } from "@mui/material";
import { geoDataUrl } from "../../../url/ApiList";
import axios from "axios";
import React from "react";
const ZoneComponent = ({
  label,
  name,
  type,
  value,
  onChange,
  division_Id,
  district_Id,
  upa_city_Id,
}) => {
  const [zoneData, setZoneData] = React.useState([]);
  const [nameBangla, setNameBangla] = React.useState([]);

  React.useEffect(() => {
    console.log("vallllllllllllllllllll", value);
    console.log("div", division_Id);
    console.log("dis", district_Id);
    getZone();
  }, [division_Id, district_Id, upa_city_Id]);

  function generateUrl(type) {
    if (type === "division" && division_Id !== "নির্বাচন করুন") {
      const url = geoDataUrl + "&type=division";

      return url;
    }
    if (type === "division" && division_Id === "নির্বাচন করুন") {
      const url = geoDataUrl + "&type=division";

      return url;
    }

    if (
      type === "district" &&
      division_Id !== "" &&
      division_Id !== "নির্বাচন করুন"
    ) {
      const url = geoDataUrl + "&type=district" + "&divisionId=" + division_Id;

      return url;
    }
    if (type === "district" && division_Id === "নির্বাচন করুন") {
      const url = geoDataUrl + "&type=district" + "&divisionId=" + "";

      return url;
    }
    if (
      type === "cityCorp" &&
      division_Id !== "" &&
      district_Id !== "" &&
      division_Id !== "নির্বাচন করুন" &&
      district_Id !== "নির্বাচন করুন"
    ) {
      const url =
        geoDataUrl +
        "&type=cityCorp" +
        "&divisionId=" +
        division_Id +
        "&districtId=" +
        district_Id;

      return url;
    }
    if (
      type === "cityCorp" &&
      division_Id === "নির্বাচন করুন" &&
      district_Id === "নির্বাচন করুন"
    ) {
      const url =
        geoDataUrl +
        "&type=cityCorp" +
        "&divisionId=" +
        "" +
        "&districtId=" +
        "";

      return url;
    }
    if (
      type === "uni-thana-paurasabha" &&
      district_Id !== "নির্বাচন করুন" &&
      division_Id !== "নির্বাচন করুন" &&
      upa_city_Id !== "নির্বাচন করুন"
    ) {
      const url =
        geoDataUrl +
        "&type=uni-thana-paurasabha" +
        "&divisionId=" +
        division_Id +
        "&districtId=" +
        district_Id +
        (upa_city_Id ? "&upaCityId=" + upa_city_Id : "");

      return url;
    }
    if (
      type === "uni-thana-paurasabha" &&
      division_Id === "নির্বাচন করুন" &&
      district_Id === "নির্বাচন করুন" &&
      upa_city_Id === "নির্বাচন করুন"
    ) {
      const url =
        geoDataUrl +
        "&type=uni-thana-paurasabha" +
        "&divisionId=" +
        "" +
        "&districtId=" +
        "" +
        "&upaCityId=" +
        "";

      return url;
    }
  }

  let getZone = async () => {
    // if (value !== "নির্বাচন করুন") {
    try {
      let zone = await axios.get(generateUrl(type));

      setZoneData(zone.data.data);

      console.log("zoneData", zone);

      const zoneBanglaName = [];
    } catch (err) {}
    // }
  };
  function getZoneBanglaName(data, type) {
    if (type === "division") {
      return data.divisionNameBangla;
    } else if (type === "district") {
      return data.districtNameBangla;
    } else if (type === "cityCorp") {
      return data.cityCorpNameBangla;
    } else if (type === "uni-thana-paurasabha") {
      return data.uniThanaPawNameBangla;
    }
  }

  return (
    <Grid item xs={12} md={6} sm={12}>
      <TextField
        fullWidth
        label={label}
        name={name}
        required
        select
        SelectProps={{ native: true }}
        variant="outlined"
        size="small"
        value={value}
        onChange={(e) => {
          onChange(e), getZone();
        }}
      >
        <option>- নির্বাচন করুন -</option>
        {zoneData.map((data, i) => {
          console.log("name ", getZoneBanglaName(data, type));
          console.log("Id", data);
          return (
            <option
              key={i}
              value={
                type === "uni-thana-paurasabha" ? data.uniThanaPawId : data.id
              }
            >
              {getZoneBanglaName(data, type)}
            </option>
          );
        })}
      </TextField>
    </Grid>
  );
};
export default ZoneComponent;
