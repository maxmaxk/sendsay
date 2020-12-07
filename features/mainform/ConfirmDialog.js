/**********************************************
* Module for confirm dialog render.
* Consists of caption and buttons yes|no.
* Execute 'executeAction' middleware function then Yes button click
*
***********************************************/

import React, { useEffect } from 'react';
import { removeHistoryItem } from '../history/historySlice';
import { executeAction } from '../confirm/confirmSlice';
import { connect } from 'react-redux';
import './ConfirmDialog.css';

const ConfirmDialog = props => {

  useEffect(() => {
    let buttonYes = document.getElementById("button-yes");
    if(buttonYes) buttonYes.focus();
  });

  const buttonYesClickHandle = () => {
    props.executeAction(props.confirmApplyAction, props.confirmParams);
  }

  const confirmDialogClass = props.showConfirm ? "" : "confirm-dialog_hide";
  return(
    <div className={`confirm-dialog ${confirmDialogClass}`}>
      <div className="confirm-dialog__header">{props.confirmCaption}</div>
      <div className="confirm-dialog__buttons">
        <button className="confirm-dialog__button-yes" id="button-yes" onClick={buttonYesClickHandle}>Да</button>
        <button className="confirm-dialog__button-no">Нет</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {showConfirm, confirmCaption, confirmApplyAction, confirmParams} = state.confirm;
  return {showConfirm, confirmCaption, confirmApplyAction, confirmParams}
}


export default connect(mapStateToProps, { removeHistoryItem, executeAction })(ConfirmDialog);
