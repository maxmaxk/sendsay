/**********************************************
* Subcomponent for Header component.
* Shown current username and sublogin name
*
*
***********************************************/

import React from 'react';
import { connect } from 'react-redux';
import './CurrentAccount.css'
const CurrentAccount = props => {

  const subloginSeparatorHide = (props.currentSubLoginName === "") ? "current-account__separator_hide" : "";

  return(
    <div className="current-account">
      <div className="current-account__border">
        <span className="current-account__login">{props.currentLoginName}</span>
        <span className={`current-account__separator ${subloginSeparatorHide}`}> : </span>
        <span className="current-account__sublogin">{props.currentSubLoginName}</span>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { currentLoginName, currentSubLoginName } = state.auth;
  return { currentLoginName, currentSubLoginName };
}

export default connect(mapStateToProps)(CurrentAccount);
