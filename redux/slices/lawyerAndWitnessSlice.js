import { AcUnitTwoTone } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

export const LawyerWitnessSlice = createSlice({
  name: "lawyerAndWitness",
  initialState: {
    lawyer_father_id: "",
    dob: "",
    name: "",
    division_id: "",
    district_id: "",
    upazila_id: "",
    post_code: "",
    union_id: "",
    detail_address: "",
  },
  reducers: {
    SetLawyerFatehrAndWitnessAction: (state, action) => {
      console.log("lawFatherId in Slice", action.payload.lawyer_father_id);
      (state.lawyer_father_id = action.payload.lawyer_father_id),
        (state.dob = action.payload.dob),
        (state.name = action.payload.name),
        (state.division_id = action.payload.division_id),
        (state.district_id = action.payload.district_id),
        (state.upazila_id = action.payload.upazila_id),
        (state.post_code = action.payload.post_code),
        (state.union_id = action.payload.union_id),
        (state.detail_address = action.payload.detail_address);
    },
  },
});
