/**********************************************
* MainForm component consists of four permanent parts:
* Header, History, Viewer, Footer,
* and two default invisible dialogs: Popup menu for history item and
* Confirm dialog for delete operations
*
***********************************************/

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { closePopup } from '../history/historySlice';
import { closeConfirm } from '../confirm/confirmSlice';
import { resetFullscreenTrigger } from '../fullscreen/fullscreenSlice';
import './MainForm.css';
import Header from './Header';
import History from './History';
import Viewer from './Viewer';
import Footer from './Footer';
import Popup from './Popup';
import ConfirmDialog from './ConfirmDialog';

const MainForm = props => {

  useEffect(() => {
    if(props.fullscreenTrigger){
      if(document.fullscreen){
        closeFullscreen();
      }else{
        openFullScreen();
      }
      props.resetFullscreenTrigger();
    }
  });

  const onMainformClickHandler = () => {
    props.closePopup();
    props.closeConfirm();
  }

  const onMainformKeyDownHandler = (e) => {
    if(e.key === "Escape"){
      props.closePopup();
      props.closeConfirm();
    }
  }

  const onMainformWheelHandler = () => {
    props.closePopup();
  }

  const openFullScreen = () => {
    let elem = document.documentElement;
    if(elem.requestFullscreen) {
      elem.requestFullscreen();
    }else if(elem.webkitRequestFullscreen){ /* Safari */
      elem.webkitRequestFullscreen();
    }else if(elem.msRequestFullscreen){ /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  const closeFullscreen = () => {
    if (!document.fullscreen) return;
    if(document.exitFullscreen){
      document.exitFullscreen();
    }else if(document.webkitExitFullscreen){ /* Safari */
      document.webkitExitFullscreen();
    }else if(document.msExitFullscreen){ /* IE11 */
      document.msExitFullscreen();
    }
  }

  return(
    <div className="mainform" onClick={onMainformClickHandler} onKeyDown={onMainformKeyDownHandler} onWheel={onMainformWheelHandler}>
      <Header/>
      <History/>
      <Viewer/>
      <Footer ghLink={props.ghLink}/>
      <Popup/>
      <ConfirmDialog/>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { currentLoginName, currentSubLoginName } = state.auth;
  const fullscreenTrigger = state.fullscreen.fullscreenTrigger;
  return { currentLoginName, currentSubLoginName, fullscreenTrigger };
}

export default connect(mapStateToProps, { closePopup, closeConfirm, resetFullscreenTrigger })(MainForm);
