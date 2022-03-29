import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { bridesBasicInfo } from "../../url/ApiList";
import { bridesAddressInfo } from "../../url/ApiList";

export const marriageInfoSlice = createSlice({
  name: "brideReg",
  initialState: {
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
  },
  reducers: {
    SetBrideRegPayloadAction: (state, action) => {
      (state.nid = action.payload.nid),
        (state.name = action.payload.name),
        (state.dob = action.payload.dob),
        (state.mobile_no = action.payload.mobile_no),
        (state.email = action.payload.email),
        (state.relegion = action.payload.relegion),
        (state.father_name = action.payload.father_name),
        (state.father_nid = action.payload.father_nid),
        (state.mother_name = action.payload.mother_name),
        (state.mother_nid = action.payload.mother_nid),
        (state.address_type = action.payload.address_type),
        (state.user_type = action.payload.user_type),
        (state.district_id = action.payload.district_id),
        (state.upazila_id = action.payload.upazila_id),
        (state.union_id = action.payload.union_id),
        (state.post_code = action.payload.post_code),
        (state.details_address = action.payload.details_address);
    },

    RegisterBride: async (state, action) => {
      try {
        console.log(` url1 ${bridesBasicInfo} `);
        // console.log("token", config);
        const brideBasicData = await axios.post(
          bridesBasicInfo,
          action.payload
        );
        const brideAddressData = await axios.post(bridesAddressInfo, {
          address_type: action.payload.address_type,
          user_type: "Bride",
          district_id: action.payload.district_id,
          upazila_id: action.payload.upazila_id,
          union_id: action.payload.union_id,
          post_code: action.payload.post_code,
          details_address: action.payload.details_address,
        });

        console.log("pay", brideBasicData.data.message);
        console.log("pay", brideAddressData.data.message);
        NotificationManager.success(
          brideBasicData.data.message,
          "Success",
          5000
        );

        //router.push({ pathname: "/coop/income-expense" });
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
    },
  },
});
