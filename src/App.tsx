import React from 'react';
import { GoogleLogout } from 'react-google-login';

import Auth from './secret';

class App extends React.Component {

  onLoggedOut() {    
    localStorage.setItem('loggedIn', 'false');
  }

  render() {
    return (
      <div>
        <GoogleLogout
          clientId={Auth.Google.CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={this.onLoggedOut}
          onFailure={() => console.log('Failed')} />      
      </div>
    );
  }
}

export default App;