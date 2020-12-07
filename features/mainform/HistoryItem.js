/**********************************************
* HistoryItem is a subcomponent for History, which has three parts:
* status indicator (success or fail), action name and popup menu link.
* Copy-animate is a special tag which appear after copy function of popup menu had choosen
*
***********************************************/

import React from 'react';
import { connect } from 'react-redux';
import { setRequestStr } from '../requests/requestsSlice';
import { openPopup } from '../history/historySlice';
import './HistoryItem.css';

const HistoryItem = props => {

  const copyAnimateClass = props.copyAnimatedItem === props.itemIndex ? "_show" : "";

  const onHistoryItemClickHandle = () => {
    props.setRequestStr({requestStr: JSON.stringify(props.item.request, null, " ")});
  }

  const onPopupItemClickHandle = (e) => {
    props.openPopup({popupedItem: e.target.id});
    e.stopPropagation();
  }

  return(
    <button className="history-request" onClick={onHistoryItemClickHandle} id={`history-item${props.itemIndex}`}>
      <div className={`history-request__status history-request__status_${props.item.status}`}></div>
      <div className="history-request__title">{props.item.request.action}
        <div className={`history-request__copy-animate${copyAnimateClass}`}>Скопировано</div>
      </div>
      <div className="history-request__popup-link" onClick={onPopupItemClickHandle} id={`history-popup${props.itemIndex}`}></div>
    </button>
  )
}

const mapStateToProps = (state) => {
  const copyAnimatedItem = state.history.copyAnimatedItem;
  return {copyAnimatedItem}
}

export default connect(mapStateToProps, {setRequestStr, openPopup})(HistoryItem);
