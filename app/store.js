import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import requestsReducer from '../features/requests/requestsSlice';
import historyReducer from '../features/history/historySlice';
import confirmReducer from '../features/confirm/confirmSlice';
import fullscreenReducer from '../features/fullscreen/fullscreenSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    requests: requestsReducer,
    history: historyReducer,
    confirm: confirmReducer,
    fullscreen: fullscreenReducer,
  },
});
