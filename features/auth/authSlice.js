/**********************************************
* Redux slice for all about login and logout
*
*
*
***********************************************/

import { createSlice } from '@reduxjs/toolkit';
import { isLoginValid, isPasswordValid } from './validators.js'
import { sendsayConnector } from '../sendsayconnector/sendsayconnector.js'

sendsayConnector.setSession(localStorage.getItem("sendsay_session"));

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentLoginName: localStorage.getItem("loginName"),
    currentSubLoginName: localStorage.getItem("subLoginName"),
    process: 'none',
    errMessage: '',
    isLoginValid: true,
    isPasswordValid: true,
  },
  reducers: {
    correctLogin: (state, action) => {
      state.currentLoginName = action.payload.loginName;
      state.currentSubLoginName = action.payload.subLoginName;
      localStorage.setItem("loginName",state.currentLoginName);
      localStorage.setItem("subLoginName",state.currentSubLoginName);
    },
    logout: state => {
      localStorage.removeItem("loginName");
      localStorage.removeItem("subLoginName");
      localStorage.removeItem("sendsay_session");
      state.currentLoginName = state.currentSubLoginName = null;
    },
    setProcessState: (state, action) => {
      state.process = action.payload.process;
      state.errMessage = action.payload.errMessage;
    },
    setLoginPasswordValidState: (state, action) => {
      state.isLoginValid = action.payload.isLoginValid;
      state.isPasswordValid = action.payload.isPasswordValid;
    },
    resetFailState: state => {
      state.process = "none";
    }
  },
});

export const { correctLogin, logout, setProcessState, setLoginPasswordValidState, resetFailState } = authSlice.actions;

export const loginAttempt = loginParams => dispatch => {
  (async (loginParams) => {
    dispatch(setProcessState({process:'waiting'}));
    let isLoginValidResult = isLoginValid(loginParams.loginName);
    let isPasswordValidResult = isPasswordValid(loginParams.password);
    dispatch(setLoginPasswordValidState({isLoginValid:isLoginValidResult, isPasswordValid:isPasswordValidResult}));
    if(!(isLoginValidResult && isPasswordValidResult)){
      dispatch(setProcessState({process:'authinvalid'}));
      return;
    }
    try{
      let res = await sendsayConnector.login(loginParams);
      if(res.session) localStorage.setItem("sendsay_session",res.session);
      dispatch(setProcessState({process:'none'}));
      dispatch(correctLogin(loginParams));
    }catch(err) {
      let errMessage = {};
      errMessage.id = err.id;
      errMessage.explain = err.explain;
      dispatch(setProcessState({process:'loginfail', errMessage:JSON.stringify(errMessage)}));
    }
  })(loginParams);
};

export default authSlice.reducer;
