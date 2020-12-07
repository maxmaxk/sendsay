/**********************************************
* Viewer consists of two TextMemo components, diving by splitter
*
*
*
***********************************************/

import React from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import './Viewer.css';
import TextMemo from './TextMemo';

const minPaneSizePercent = 20;

const Viewer = () => {
  return(
    <SplitterLayout percentage={true} primaryMinSize={minPaneSizePercent} secondaryMinSize={minPaneSizePercent}>
      <TextMemo type="request"/>
      <TextMemo type="response"/>
    </SplitterLayout>
  )
}

export default Viewer;
