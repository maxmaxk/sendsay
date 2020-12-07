/**********************************************
* This module exports an instance of SendsayConnector class
* It contains all necessary methods to work with Sendsay library
*
*
***********************************************/

import Sendsay from 'sendsay-api';

class SendsayConnector{
  constructor(){
    this.sendsay = new Sendsay();
  }
  login(loginParams){
    return this.sendsay.login({
      login: loginParams.loginName,
      sublogin: loginParams.subLoginName,
      password: loginParams.password,
    });
  }
  request(obj){
    return this.sendsay.request(obj);
  }
  setSession(sessionName){
    this.sendsay.setSession(sessionName);
  }
  logout(){
    return this.sendsay.request({ action: 'logout'});
  }
}

export const sendsayConnector = new SendsayConnector();
