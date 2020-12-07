/**********************************************
* Redux slice for request operations to sendsay API service
*
*
*
***********************************************/

import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../auth/authSlice';
import { addSuccessHistoryItem, addFailHistoryItem } from '../history/historySlice';
import { sendsayConnector } from '../sendsayconnector/sendsayconnector.js'

sendsayConnector.setSession(localStorage.getItem("sendsay_session"));

const formatJSON = (requestStr) => {
  let obj = JSON.parse(requestStr);
  return JSON.stringify(obj, null, " ");
}

export const requestsSlice = createSlice({
  name: 'requests',
  initialState: {
    requestStr: "",
    responseStr: "",
    process: 'none',
  },
  reducers: {
    setRequestStr: (state, action) => {
      state.process = "none";
      state.requestStr = action.payload.requestStr;
    },
    setResponseStr: (state, action) => {
      let value = JSON.stringify(action.payload.responseObj, null, " ");
      state.responseStr = (value === '""') ? "" : value;
    },
    clearRequests: state => {
      state.requestStr = "";
      state.responseStr = "";
    },
    setProcessState: (state, action) => {
      state.process = action.payload.process;
    },
    formatRequest: state => {
      try{
        state.requestStr = formatJSON(state.requestStr);
      }catch(err){
        state.process = "invalidrequest";
      }
    },
  },
});

export const { setRequestStr, setResponseStr, clearRequests, setProcessState, formatRequest } = requestsSlice.actions;

export const sendRequest = (requestStr) => dispatch => {
  (async (requestStr) => {
    dispatch(setProcessState({process:'waiting'}));
    let obj = {};
    try{
      obj = JSON.parse(requestStr);
      if(!obj.action) throw new Error("action missed");
    }catch(err){
      dispatch(setProcessState({process:'invalidrequest'}));
      return;
    }
    try{
      let res = await sendsayConnector.request(obj);
      dispatch(setResponseStr({responseObj:res}));
      dispatch(setProcessState({process:'none'}));
      dispatch(addSuccessHistoryItem({request:obj}));
    }catch(err){
      if(err.id === "error/auth/failed"){
        dispatch(setProcessState({process:'none'}));
        dispatch(clearRequests());
        dispatch(logout());  //session expired
      }else if(err.message){
        dispatch(setResponseStr({responseObj:{error:err.message}}));
        dispatch(setProcessState({process:'invalidresponse'}));
      }else{
        dispatch(setResponseStr({responseObj:err}));
        dispatch(setProcessState({process:'invalidresponse'}));
        dispatch(addFailHistoryItem({request:obj}));
      }
    }
  })(requestStr);
};

export default requestsSlice.reducer;
