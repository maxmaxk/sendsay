/**********************************************
* TextMemo is one component for both request and response panels.
* Property 'type' defines request or response type of panel
*
*
***********************************************/

import React from 'react';
import { connect } from 'react-redux';
import { setRequestStr } from '../requests/requestsSlice';
import './TextMemo.css';

const TextMemo = props => {
  const textMemoProps = props.type === "request"?
  {
    sideClass: "textmemo_left",
    caption  : "Запрос:",
    readOnly : false,
  }:{
    sideClass: "textmemo_right",
    caption  : "Ответ:",
    readOnly : true,
  };

  let viewerClass = "";
  let captionClass = "";
  if(((props.type === "request")  && (props.process === "invalidrequest")) ||
     ((props.type === "response") && (props.process === "invalidresponse"))){
    viewerClass = "textmemo__viewer_invalid";
    captionClass = "textmemo__caption_invalid";
  }

  let currentRequest = "";
  const onRequestChange = (e) => {
    currentRequest = e.target.value;
    if(!e.target.readOnly) props.setRequestStr({requestStr:e.target.value});
  }

  const getValue = () => {
    if(props.type === "request"){
      return (props.requestStr === currentRequest) ? undefined : props.requestStr;
    }
    return props.responseStr;
  }

  return(
    <div className={`textmemo ${textMemoProps.sideClass}`}>
      <div className={`textmemo__caption ${captionClass}`}>{textMemoProps.caption}</div>
      <textarea
        className={`textmemo__viewer ${viewerClass}`}
        readOnly={textMemoProps.readOnly}
        onChange={onRequestChange}
        value={getValue()}>
      </textarea>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { requestStr, responseStr, process } = state.requests;
  return { requestStr, responseStr, process };
}

export default connect(mapStateToProps,{setRequestStr})(TextMemo);
