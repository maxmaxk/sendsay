/**********************************************
* Redux slice for operations with history items
*
*
*
***********************************************/

import { createSlice } from '@reduxjs/toolkit';
import isEqual from './isEqualObject';
import { indexedDatabase } from './indexedDBConnector';

const maxRequestsCount = 20;

const checkDuplicateItem = (historyItems, historyItem) => {
  let index = historyItems.findIndex((item) => isEqual(item.request,historyItem.request));
  if(index < 0){
    historyItems.push(historyItem);
  }else{
    historyItems[index].timestamp = historyItem.timestamp;
  }
}

const checkMaxSize = (historyItems) => {
  let overCount = historyItems.length - maxRequestsCount;
  if(overCount > 0) historyItems.splice(maxRequestsCount,overCount);
}

const sortItems = (historyItems) => {
  historyItems.sort((a,b) => a.timestamp > b.timestamp ? -1 : 1);
}

const updateHistoryItems = (state, action, successStatus) => {
  let historyItem = {request: action.payload.request, status:successStatus, timestamp:Date.now()};
  let historyItems = state.historyItems;
  checkDuplicateItem(historyItems, historyItem);
  sortItems(historyItems);
  checkMaxSize(historyItems);
  indexedDatabase.updateDatabase(historyItems);
  return historyItems;
}

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    historyItems: [],
    popupedItem: null,
    copyAnimatedItem: null,
  },
  reducers: {
    addSuccessHistoryItem: (state, action) => {
      state.historyItems = updateHistoryItems(state, action, "success");
    },
    addFailHistoryItem: (state, action) => {
      state.historyItems = updateHistoryItems(state, action, "fail");
    },
    setHistory: (state, action) => {
      state.historyItems = [];
      action.payload.history.forEach((item) => {
        try{
          state.historyItems.push(JSON.parse(item));
        }catch(err){
          console.log("Database corrupted");
        }
      });
    },
    removeHistoryItem: (state, action) => {
      state.historyItems.splice(action.payload.deleteItemIndex,1);
      indexedDatabase.updateDatabase(state.historyItems);
    },
    clearHistory: state => {
      state.historyItems = [];
      indexedDatabase.updateDatabase(state.historyItems);
    },
    openPopup: (state, action) => {
      state.popupedItem = parseInt(action.payload.popupedItem.slice(13));
    },
    closePopup: state => {
      state.popupedItem = null;
    },
    setCopyAnimatedItem: (state, action) => {
      state.copyAnimatedItem = action.payload.copyAnimatedItem;
    },
    resetCopyAnimatedItem: state => {
      state.copyAnimatedItem = null;
    },
  },
});

export const restoreHistory = () => (dispatch) => {
  (async () => {
    try{
      await indexedDatabase.openDatabase();
      const history = await indexedDatabase.getHistory();
      dispatch(setHistory({history: history}));
    }catch(err){
      console.log("error: ",err);
    }
  })();
}

export const resetCopyAnimated = () => (dispatch) => {
  setTimeout(() => dispatch(resetCopyAnimatedItem()), 2000);
}

export const { addSuccessHistoryItem, addFailHistoryItem, setHistory, removeHistoryItem, clearHistory,
               openPopup, closePopup, setCopyAnimatedItem, resetCopyAnimatedItem } = historySlice.actions;

export default historySlice.reducer;
