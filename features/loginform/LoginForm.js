/**********************************************
* LoginForm component has three inputs for login, sublogin, password
* and some warning panels hidden by default
*
*
***********************************************/

import React, {useState} from 'react';
import { connect } from 'react-redux';
import { loginAttempt, resetFailState } from '../auth/authSlice';
import './LoginForm.css';

const LoginForm = (props) => {

      const [loginName, setLoginName] = useState("");
      const [subLoginName, setSubLoginName] = useState("");
      const [password, setPassword] = useState("");

      const onChangeLoginName = (e) => {
        setLoginName(e.target.value);
        props.resetFailState();
      }
      const onChangePassword = (e) => {
        setPassword(e.target.value);
        props.resetFailState();
      }
      const onLoginHandle = () => {
        props.loginAttempt({loginName, subLoginName, password});
      }
      const onKeyUpHandle = ({key}) => {
        if (key === "Enter") onLoginHandle();
      }

      const loginMenuErrmessageHide = props.process === "loginfail" ? "" : "login-menu-errmessage_hide";

      const loginHelpHide = props.isLoginValid ? "login-menu-item__help_hide" : "";
      const loginLabelInvalid = props.isLoginValid ? "" : "login-menu-item__label_invalid";
      const loginInputInvalid = props.isLoginValid ? "" : "login-menu-item__input_invalid";

      const passwordHelpHide = props.isPasswordValid ? "login-menu-item__help_hide" : "";
      const passwordLabelInvalid = props.isPasswordValid ? "" : "login-menu-item__label_invalid";
      const passwordInputInvalid = props.isPasswordValid ? "" : "login-menu-item__input_invalid";

      let loginButtonStateClass;
      switch (props.process) {
        case "none":
          loginButtonStateClass = "";
        break;
        case "waiting":
          loginButtonStateClass = "login-menu-loginbutton_waiting";
        break;
        case "authinvalid":
          loginButtonStateClass = "login-menu-loginbutton_disabled";
        break;
        default:
          loginButtonStateClass = "";
      }

      return(
        <div className="login">
          <div className="app-logo-container">
            <div className="app-logo"></div>
          </div>
          <div className="login-menu">
            <div className="app-caption">API-консолька</div>
            <div className={`login-menu-errmessage ${loginMenuErrmessageHide}`}>
              <div className="login-menu-errmessage__smile"></div>
              <div className="login-menu-errmessage__textcontainer">
                <div>Вход не вышел</div>
                <div className="login-menu-errmessage__text">{props.errMessage}</div>
              </div>
            </div>
            <div className={`login-menu-item__help ${loginHelpHide}`}>
              Логином может быть email, либо строка из латинских букв, цифр и подчеркиваний
            </div>
            <div className={`login-menu-item__label ${loginLabelInvalid}`}>Логин</div>
            <input
              className={`login-menu-item__input ${loginInputInvalid}`}
              type="text"
              placeholder="iamyourlogin@domain.xyz"
              data-testid="loginInput"
              required
              onChange={onChangeLoginName}
              onKeyUp={onKeyUpHandle}
            />
            <div className="login-menu-item-labelcontainer">
              <div className="login-menu-item__label">Сублогин</div>
              <div className="login-menu-item__optionlabel"><span>Опционально</span></div>
            </div>
            <input
              className="login-menu-item__input"
              type="text"
              placeholder="sublogin-could-be-here"
              data-testid="subLoginInput"
              onChange={e => setSubLoginName(e.target.value)}
              onKeyUp={onKeyUpHandle}
            />
            <div className={`login-menu-item__help ${passwordHelpHide}`}>
              Пароль может содержать только латинские буквы, цифры, символы и пробел
            </div>
            <div className={`login-menu-item__label ${passwordLabelInvalid}`}>Пароль</div>
            <input
              className={`login-menu-item__input ${passwordInputInvalid}`}
              type="password"
              data-testid="passwordInput"
              required
              onChange={onChangePassword}
              onKeyUp={onKeyUpHandle}
            />
            <div className="login-menu-loginbutton-container">
              <button
                className={`login-menu-loginbutton ${loginButtonStateClass}`}
                type="button"
                onClick={onLoginHandle}
                data-testid="submitButton"
                disabled={["none","loginfail"].indexOf(props.process) === -1}>
                Войти
              </button>
            </div>
          </div>
          <a className="github-link" href={props.ghLink}>@my-github-link</a>
        </div>
      )

}

const mapStateToProps = (state) => {
  const {process, errMessage, isLoginValid, isPasswordValid} = state.auth;
  return {process, errMessage, isLoginValid, isPasswordValid}
}

export default connect(mapStateToProps,{loginAttempt, resetFailState})(LoginForm);
