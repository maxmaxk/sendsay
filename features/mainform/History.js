/**********************************************
* History component has a space for several (up to 20) history items
* and a clear history button. UseEffect execute once on first render
* and call restoreHistory middleware to update history items from browser's IndexedDb
*
***********************************************/

import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { restoreHistory } from '../history/historySlice';
import { openConfirm } from '../confirm/confirmSlice';
import HistoryItem from './HistoryItem';
import './History.css';

const History = props => {

  useEffect(() =>{
    props.restoreHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollHorizontally = (e) => {
    e = window.event || e;
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    document.getElementById('historyItemsContainer').scrollLeft -= (delta*40);
  }

  const historyClearClickHandler = (e) => {
    props.openConfirm({confirmCaption: "Очистить историю?",
                       confirmApplyAction: "clearHistory"});
    e.stopPropagation();
  }

  return(
    <div className="history">
      <div className="history-items" id="historyItemsContainer" onWheel={scrollHorizontally}>
        {props.historyItems.map((item,index) =>
          (<HistoryItem key={index} itemIndex={index} item={item}/>)
        )}
        <div className="dummy-request"></div>
      </div>
      <div className="history-clear-container">
        <button className="history-clear" onClick={historyClearClickHandler}/>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const historyItems = state.history.historyItems;
  return {historyItems}
}

export default connect(mapStateToProps, {restoreHistory, openConfirm})(History);
