import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import GoogleLogin from 'react-google-login';

import Auth from './secret';
import './styles/main.css';
import './styles/custom.css';

interface ILoadAppState {
  IsLoggedIn: Boolean;
}

class LoadApp extends React.Component<{}, ILoadAppState> {
  readonly state = {
    IsLoggedIn: false
  }

  componentDidMount = () => {
    if (this.isClientLoggedIn())
      this.setState({IsLoggedIn: true});
  }

  storageSupported(): boolean {
    return typeof(Storage) !== 'undefined';
  }
  
  isClientLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
  
  onSuccess = () => {              
    localStorage.setItem('loggedIn', 'true');
    this.setState({IsLoggedIn: true});
  }
  
  onFailure(response: any) {        
    console.log(response);
    localStorage.setItem('loggedIn', 'false');
    this.setState({IsLoggedIn: false});
  }

  render() {
    if (!this.storageSupported()) {
      return (
        <div>Please use a web browser that supports HTML5</div>
      );
    }
    else {      
      return (
        this.state.IsLoggedIn ? 
          <App />  :            
          <GoogleLogin
            clientId={Auth.Google.CLIENT_ID}
            buttonText="Login with your Google account..."
            onSuccess={() => this.onSuccess()}
            onFailure={(response: any) => this.onFailure(response)}
            cookiePolicy={'single_host_origin'} />
      )      
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <LoadApp />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
