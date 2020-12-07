/**********************************************
* Popup menu for history item
* It has three items: exec, copy, delete  
*
*
***********************************************/

import React from 'react';
import { setRequestStr, sendRequest } from '../requests/requestsSlice';
import { setCopyAnimatedItem, resetCopyAnimated, removeHistoryItem, closePopup } from '../history/historySlice';
import { openConfirm } from '../confirm/confirmSlice';
import { connect } from 'react-redux';
import './Popup.css';

const Popup = props => {

  const popupWidth = 120;
  const popupClass = props.popupedItem === null ? "popup_hide" : "";

  const getRequestStr = () => {
    let item = props.historyItems[props.popupedItem];
    return item ? JSON.stringify(item.request, null, " ") : null;
  }
  const onExecClickHandle = () => {
    let requestStr = getRequestStr();
    props.setRequestStr({requestStr: requestStr});
    props.sendRequest(requestStr);
  }
  const onCopyClickHandle = async() => {
    await navigator.clipboard.writeText(getRequestStr());
    props.setCopyAnimatedItem({copyAnimatedItem:props.popupedItem});
    props.resetCopyAnimated();
  }
  const onDeleteClickHandle = (e) => {
    props.closePopup();
    props.openConfirm({confirmCaption: "Удалить запись?",
                       confirmApplyAction: "removeHistoryItem",
                       confirmParams: props.popupedItem});
    e.stopPropagation();
  }

  const getLeft = () => {
    let historyItem = document.getElementById("history-item" + props.popupedItem);
    if(historyItem){
      let viewportOffset = historyItem.getBoundingClientRect();
      let popupX = viewportOffset.right - popupWidth;
      return popupX>0 ? popupX + "px" : "8px";
    }else{
      return "0px";
    }

  }

  return(
    <div className={`popup ${popupClass}`} style={{left: getLeft(), width: popupWidth}}>
      <div className="popup__exec" onClick={onExecClickHandle}>Выполнить</div>
      <div className="popup__copy" onClick={onCopyClickHandle}>Скопировать</div>
      <hr/>
      <div className="popup__delete" onClick={onDeleteClickHandle}>Удалить</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { popupedItem, historyItems } = state.history;
  return { popupedItem, historyItems };
}

export default connect(mapStateToProps, { setRequestStr, sendRequest, setCopyAnimatedItem, closePopup,
                                          resetCopyAnimated, removeHistoryItem, openConfirm })(Popup);
