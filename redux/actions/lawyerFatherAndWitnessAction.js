import { LawyerWitnessSlice } from "../slices/lawyerAndWitnessSlice";

const { actions: lawAndWitSlice } = LawyerWitnessSlice;
export const SetLawyerFatherAndWitnessAction = (payload) => (dispatch) => {
  dispatch(lawAndWitSlice.SetLawyerFatehrAndWitnessAction(payload));
};
// import { marriageInfoSlice } from "../slices/marriage_info";

// const { actions: marriageInfoSlicee } = marriageInfoSlice;

// export const SetMarriageInfoPayloadAction = (payload) => (dispatch) => {
//   dispatch(marriageInfoSlicee.SetMarriageInfoPayloadAction(payload));
// };

// import { groomSlice } from "../slices/groom_slice";

// const { actions: groomSlicee } = groomSlice;

// export const SetGroomRegPayloadAction = (payload) => (dispatch) => {
//   dispatch(groomSlicee.SetGroomRegPayloadAction(payload));
// };
