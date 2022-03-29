import { brideGroomSlice } from "../slices/bride_slice";

const { actions: brideRegSlice } = brideGroomSlice;

export const SetBrideRegPayloadAction = (payload) => (dispatch) => {
  dispatch(brideRegSlice.SetBrideRegPayloadAction(payload));
};
export const RegisterBrideAction = (payload) => (dispatch) => {
  dispatch(brideRegSlice.RegisterBride(payload));
};
