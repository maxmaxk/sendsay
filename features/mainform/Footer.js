/**********************************************
* Footer component consists of send request button,
* link to author's github page and request format button
*
*
***********************************************/

import React from 'react';
import { connect } from 'react-redux';
import { sendRequest, formatRequest } from '../requests/requestsSlice';
import './Footer.css';

const Footer = props => {

  const requestButtonStateClass = props.process === "waiting" ? "request-button_waiting" : "";

  const onRequestHandle = () => {
    props.sendRequest(props.requestStr);
  }

  const onFormatHandle = () => {
    props.formatRequest();
  }

  return(
    <div className="footer">
        <div className="footer-container">
          <div className="request-button-container">
            <button
              className={`request-button ${requestButtonStateClass}`}
              type="button"
              onClick={onRequestHandle}
              data-testid="requestButton"
              disabled={props.process === "waiting"}
              >
              Отправить
            </button>
          </div>
          <div className="github-link-container">
            <a className="github-link github-link-footer" href={props.ghLink}>@my-github-link</a>
          </div>
          <div className="format-button-container">
            <input
              className="format-button"
              type="button"
              onClick={onFormatHandle}
              data-testid="formatButton"
              value="Форматировать"
              >
            </input>
          </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { requestStr, process } = state.requests;
  return { requestStr, process }
}

export default connect(mapStateToProps,{sendRequest,formatRequest})(Footer);
