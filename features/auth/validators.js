/**********************************************
* Validator functions for login and password
* email regexp has taken from stackoverflow.com (c)
* link: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
*
*
***********************************************/

export const isLoginValid = (loginName) => {
  const emailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const isEmail = emailRegExp.test(String(loginName).toLowerCase());

  const correctStrRegExp = new RegExp(/^([a-zA-Z0-9_])+$/);
  const isCorrectStr = correctStrRegExp.test(String(loginName));
  return isEmail || isCorrectStr;
}

export const isPasswordValid = (password) => {
  const correctPassRegExp = new RegExp(/^([a-zA-Z0-9 ,.!@#$%^&()/*\-+\\"'|{}`;:?<>_=[\]~])+$/);
  return correctPassRegExp.test(String(password));
}
