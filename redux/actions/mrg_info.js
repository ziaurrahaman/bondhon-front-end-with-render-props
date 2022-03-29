import { marriageInfoSlice } from "../slices/marriage_info";

const { actions: marriageInfoSlicee } = marriageInfoSlice;

export const SetMarriageInfoPayloadAction = (payload) => (dispatch) => {
  dispatch(marriageInfoSlicee.SetMarriageInfoPayloadAction(payload));
};
// export const RegisterGroom = (payload) => (dispatch) => {
//   dispatch(groomSlicee.RegisterGroom(payload));
//   s;
// };
