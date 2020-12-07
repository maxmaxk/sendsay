/**********************************************
* Header component which consists of application logo, caption,
* current user component, logout button and fullscreen button 
*
*
***********************************************/

import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../auth/authSlice';
import { clearRequests } from '../requests/requestsSlice';
import { setFullscreenTrigger, setFullscreen } from '../fullscreen/fullscreenSlice';

import CurrentAccount from './CurrentAccount'
import './Header.css';

const Header = props => {

  const fullscreenClass = props.fullscreen ? "fullscreen-button_off" : "";

  const onLogoutHandle = () => {
    props.clearRequests();
    props.logout();
  }

  const fullscreenButtonHandle = () => {
    props.setFullscreenTrigger();
  }

  document.onfullscreenchange = function ( event ) {
    props.setFullscreen({fullscreen: document.fullscreen});
  };

  return(
    <div className="header">
      <div className="app-logo"></div>
      <div className="container">
        <div className="app-caption">API-консолька</div>
        <div className="dummy"></div>
        <CurrentAccount/>
        <input className="logout-button"
          type="button"
          onClick={onLogoutHandle}
          value="Выйти">
        </input>
        <button className={`fullscreen-button ${fullscreenClass}`} onClick={fullscreenButtonHandle}/>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const fullscreen = state.fullscreen.fullscreen;
  return { fullscreen };
}

export default connect(mapStateToProps, {logout, clearRequests, setFullscreenTrigger, setFullscreen })(Header);
