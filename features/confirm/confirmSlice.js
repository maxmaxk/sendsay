/**********************************************
* Redux slice for comfirm dialog
* (history item delete and history clear operations) 
*
*
***********************************************/

import { createSlice } from '@reduxjs/toolkit';
import { removeHistoryItem, clearHistory } from '../history/historySlice';

export const confirmSlice = createSlice({
  name: 'confirm',
  initialState: {
    showConfirm: false,
    confirmCaption: "",
    confirmApplyAction: null,
    confirmParams: null,
    tst: null,
  },
  reducers: {
    openConfirm: (state, action) => {
      const {confirmCaption, confirmApplyAction, confirmParams} = action.payload;
      state.confirmCaption = confirmCaption;
      state.confirmApplyAction = confirmApplyAction;
      state.confirmParams = confirmParams;
      state.showConfirm = true;
    },
    closeConfirm: state => {
      state.showConfirm = false;
    },
  },
});

export const { openConfirm, closeConfirm } = confirmSlice.actions;

export const executeAction = (confirmApplyAction, confirmParams) => (dispatch) => {
  switch (confirmApplyAction) {
    case "removeHistoryItem":
      dispatch(removeHistoryItem({deleteItemIndex: confirmParams}));
      break;
    case "clearHistory":
      dispatch(clearHistory());
      break;
    default:
  }
}

export default confirmSlice.reducer;
