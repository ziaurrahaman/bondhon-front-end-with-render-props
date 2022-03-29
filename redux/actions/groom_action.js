import { groomSlice } from "../slices/groom_slice";

const { actions: groomSlicee } = groomSlice;

export const SetGroomRegPayloadAction = (payload) => (dispatch) => {
  dispatch(groomSlicee.SetGroomRegPayloadAction(payload));
};
// export const RegisterGroom = (payload) => (dispatch) => {
//   dispatch(groomSlicee.RegisterGroom(payload));
//   s;
// };
