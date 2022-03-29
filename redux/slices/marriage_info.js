import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { bridesBasicInfo } from "../../url/ApiList";
import { bridesAddressInfo } from "../../url/ApiList";

// const regGroomWithPost = createAsyncThunk("groom/postGroom", async () => {
//   const response = await userAPI.fetchById(userId);
//   return response.data;
// });

export const marriageInfoSlice = createSlice({
  name: "mrgInfo",
  initialState: {
    status: "",
    nikahnama_no: "",
    sonod_no: "",
    marriage_fixed_date: "",
    marriage_date: "",
    marriage_reg_date: "",
    denmohor: "",
    denmohor_status: "",
    muajjol: "",
    muajjil: "",
    paid_denmohor_amount: "",
    special_info: "",
    special_info_for: "",
    special_info_type: "",
    divorce_con: "",
    alimony_con: "",
    permission_no: "",
    permission_date: "",
    spc_status: "",
    division_id: "",
    district_id: "",
    upazila_id: "",
    union_id: "",
    detail_address: "",
  },
  reducers: {
    SetMarriageInfoPayloadAction: (state, action) => {
      let nikahnama_no = Math.floor(100000 + Math.random() * 900000);
      let sonod_no = Math.floor(100000 + Math.random() * 900000);
      (state.status = 123456),
        (state.nikahnama_no = nikahnama_no),
        (state.sonod_no = sonod_no),
        (state.marriage_fixed_date = action.payload.marriage_fixed_date),
        (state.marriage_date = action.payload.marriage_date),
        (state.marriage_reg_date = action.payload.marriage_reg_date),
        (state.denmohor = action.payload.denmohor),
        (state.denmohor_status = action.payload.denmohor_status),
        (state.muajjol = action.payload.muajjol),
        (state.muajjil = action.payload.muajjil),
        (state.paid_denmohor_amount = action.payload.paid_denmohor_amount),
        (state.special_info = action.payload.special_info),
        (state.special_info_for = action.payload.special_info_for),
        (state.special_info_type = action.payload.special_info_type),
        (state.divorce_con = action.payload.divorce_con),
        (state.alimony_con = action.payload.alimony_con),
        (state.permission_no = action.payload.permission_no),
        (state.permission_date = action.payload.permission_date),
        (state.spc_status = action.payload.spc_status),
        (state.division_id = action.payload.division_id),
        (state.district_id = action.payload.district_id),
        (state.upazila_id = action.payload.upazila_id),
        (state.union_id = action.payload.union_id),
        (state.detail_address = action.payload.detail_address);
    },
  },
});
