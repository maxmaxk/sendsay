/**********************************************
* Redux slice for set and reset fullscreen operations
*
*
*
***********************************************/

import { createSlice } from '@reduxjs/toolkit';

export const fullscreenSlice = createSlice({
  name: 'fullscreen',
  initialState: {
    fullscreenTrigger: false,
    fullscreen: false,
  },
  reducers: {
    setFullscreenTrigger: state => {
      state.fullscreenTrigger = true;
    },
    resetFullscreenTrigger: state => {
      state.fullscreenTrigger = false;
    },
    setFullscreen: (state, action) => {
      state.fullscreen = action.payload.fullscreen;
    }
  },
});

export const { setFullscreenTrigger, resetFullscreenTrigger, setFullscreen } = fullscreenSlice.actions;

export default fullscreenSlice.reducer;
