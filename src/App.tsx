import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import About from './About';
import Home from './Home';
import LetterSelect from './SoundSelect';
import { LetterAndSet } from './interfaces';

interface IAppState {
  SavedData: LetterAndSet[];
}

const EMPTY_SAVED_DATA: LetterAndSet[] = [];
const SAVED_DATA_KEY: string = 'savedLettersAndSets';

class App extends React.PureComponent<{},IAppState> {
  readonly state = {
    SavedData: EMPTY_SAVED_DATA
  }

  componentDidMount = () => {    
    this.setState({SavedData: this.getData(SAVED_DATA_KEY)});
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
  storeData = (key: string, data: LetterAndSet[]) => {    
    if (this.userCanUseStorage()) {
      var value = JSON.stringify(data);
      localStorage.setItem(key, value);      
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
  getData(key: string): LetterAndSet[] {
    var returnData = EMPTY_SAVED_DATA;
    if (this.userCanUseStorage()) {
      var data = localStorage.getItem(key);
      if (data !== null) {
        var jsonData: LetterAndSet[] = JSON.parse(data);                
        jsonData.forEach((lap: LetterAndSet) => {
          returnData.push(lap);
        });
      }
    }
    return returnData;
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