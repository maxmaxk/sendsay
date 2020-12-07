/**********************************************
* This module provides auto redirect
* to login (/login) or main (/) urls if current user not match them
*
*
***********************************************/

import React from 'react';
import { connect } from 'react-redux';
import { Redirect, BrowserRouter } from 'react-router-dom';


const AppRoute = (props) => {
    const {type, currentLoginName} = props;
    if((type === "user") && !currentLoginName){
      return(<Redirect to="/login"/>);
    }
    if((type === "guest") && currentLoginName){
      return(<Redirect to="/"/>);
    }
    return(<BrowserRouter {...props}/>)
}

const mapStateToProps = state => {
  const currentLoginName=state.auth.currentLoginName;
  return {currentLoginName};
}

export default connect(mapStateToProps)(AppRoute)
