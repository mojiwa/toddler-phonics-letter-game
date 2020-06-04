import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import About from './About';
import Home from './Home';
import LetterSelect from './LetterSelect';

interface IAppState {
  Letters: string[];
  Objects: string[];
}

class App extends React.PureComponent<{},IAppState> {
  readonly state = {
    Letters: this.getData('letters'),
    Objects: this.getData('objects')
  }

  componentDidMount = () => {
    
  }

  /** 
   * If the user is not using HTML 5 or has disabled access to 
   * web storage, return false.
  */
  userCanUseStorage(): boolean {
    return typeof(Storage) !== "undefined";
  }

  /**
   * If the user has the ability to store data in web storage, 
   * first stringify it (as web storage can only store strings), 
   * and then set the state to the appropriate new data. 
  */
  storeData = (key: string, data: string[]) => {    
    if (this.userCanUseStorage()) {
      var value = JSON.stringify(data);
      localStorage.setItem(key, value);
      if (key === 'letters')
        this.setState({Letters: data})
      else if (key === 'objects')
        this.setState({Objects: data});
    }
    else {
      return;
    }
  }

  /**
   * Extract the data from web storage using the predefined keys.
   * The data will be stringified, so it must be parsed back into JSON.
   * If the user does not have access to web storage, simply return
   * an empty array (no settings have been saved)
  */
  getData(key: string): string[] {
    if (this.userCanUseStorage()) {
      var data = localStorage.getItem(key);
      if (data !== null) {
        return JSON.parse(data);
      } else {
        return [''];
      }
    }
    else {
      return [''];
    }
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/letter-select">Select Letters</Link>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/letter-select">
              <LetterSelect />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;