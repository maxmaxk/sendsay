/**********************************************
* Main application module which create switch between two
* form components (LoginForm and MainForm) and also add a AppRoute
* component for auto redirect
*
***********************************************/

import React, {useEffect} from 'react';
import { Switch } from 'react-router'
import './App.css';
import LoginForm from './features/loginform/LoginForm';
import MainForm from './features/mainform/MainForm';
import AppRoute from './AppRoute';

function App() {
  const gitHubLink="https://github.com/maxmaxk/sendsay";
  useEffect(()=>{
    document.title = "Sendsay Test";
  },[])
  return (
    <div className="App">
      <Switch>
        <AppRoute path="/login" type="guest">
          <LoginForm ghLink={gitHubLink}/>
        </AppRoute>
        <AppRoute path="/" type="user">
          <MainForm ghLink={gitHubLink}/>
        </AppRoute>
      </Switch>
    </div>
  );
}

export default App;
