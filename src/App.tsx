import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import About from './About';
import Home from './Home';
import PhonicsSets from './PhonicsSets';
import { ILetterData, LanguageSelection } from './interfaces';

interface IAppState {
  SavedData: ILetterData[];
  LanguageSelection: LanguageSelection;
}

const EMPTY_SAVED_DATA: ILetterData[] = [];
const SAVED_DATA_KEY: string = 'savedLettersAndSets';
const SAVED_LANGUAGE_KEY: string = 'savedLanguageSelection';

class App extends React.PureComponent<{},IAppState> {
  readonly state = {
    SavedData: EMPTY_SAVED_DATA,
    LanguageSelection: LanguageSelection.British
  }

  componentDidMount = () => {    
    this.setState({SavedData: this.getData()});
    this.setState({LanguageSelection: this.getLanguageSelection()})
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
   * @param data Array of ILetterData
  */
  storeData(data: ILetterData[]) {    
    if (this.userCanUseStorage()) {
      var value = JSON.stringify(data);
      localStorage.setItem(SAVED_DATA_KEY, value);      
    }
    else {
      return;
    }
  }

  /**
   * Store the Language selection in web storage
   * @param LanguageSelection Enum pertaining to the selected language (0 or 1)
   */
  storeLanguageSelection(LanguageSelection: LanguageSelection) {
    if (this.userCanUseStorage()) {
      var value = LanguageSelection.toString();
      localStorage.setItem(SAVED_LANGUAGE_KEY, value);
    }
  }

  /**
   * Extract the data from web storage using the predefined keys.
   * The data will be stringified, so it must be parsed back into JSON.
   * If the user does not have access to web storage, simply return
   * an empty array (no settings have been saved).
  */
  getData(): ILetterData[] {
    var returnData = EMPTY_SAVED_DATA;
    if (this.userCanUseStorage()) {
      var data = localStorage.getItem(SAVED_DATA_KEY);
      if (data !== null) {
        var jsonData: ILetterData[] = JSON.parse(data);                
        jsonData.forEach((lap: ILetterData) => {
          returnData.push(lap);
        });
      }
    }
    return returnData;
  }

  /** 
   * Extract the language selected option from web storage, if possible,
   * else default to British English. 
  */
  getLanguageSelection(): LanguageSelection {
    var returnData: LanguageSelection = LanguageSelection.British;
    if (this.userCanUseStorage()) {
      var data = localStorage.getItem(SAVED_LANGUAGE_KEY);
      if (data !== null) {
        returnData = parseInt(data);
      }
    }
    return returnData;
  }

  onLanguageSelect = (languageSelected: any) => {
    let languageSelection: LanguageSelection = parseInt(languageSelected);
    this.storeLanguageSelection(languageSelection);
    this.setState({LanguageSelection: languageSelection});
  }

  render() {
    return (
      <Router>
        <div>
          <div className='flex p-2'>
            <ul>
              <li className='p-2'>
                <Link to="/">Home</Link>
              </li>
              <li className='p-2'>
                <Link to="/about">About</Link>
              </li>
              <li className='p-2'>
                <Link to="/phonics-sets">Phonics Sets</Link>
              </li>
            </ul>
            <label className='ml-2'>Select Language:</label>
            <select id='language' name='language' onChange={(e) => this.onLanguageSelect(e.target.value)} value={this.state.LanguageSelection}>
              <option value={0}>British</option>
              <option value={1}>American</option>
            </select>
          </div>
          <hr />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/phonics-sets">
              <PhonicsSets LetterData={LETTERS_AND_SETS} LanguageSelection={this.state.LanguageSelection}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

// List of letter sounds in their phonics sets
var LETTERS_AND_SETS: ILetterData[] = [
  { Letter: 's', Set: 1, BritishAudioUrl: '/sounds/british/s.mp3', AmericanAudioUrl: '/sounds/american/s.mp3' }, 
  { Letter: 'a', Set: 1, BritishAudioUrl: '/sounds/british/a.mp3', AmericanAudioUrl: '/sounds/american/a.mp3' }, 
  { Letter: 't', Set: 1, BritishAudioUrl: '/sounds/british/t.mp3', AmericanAudioUrl: '/sounds/american/t.mp3' }, 
  { Letter: 'i', Set: 1, BritishAudioUrl: '/sounds/british/i.mp3', AmericanAudioUrl: '/sounds/american/i.mp3' }, 
  { Letter: 'p', Set: 1, BritishAudioUrl: '/sounds/british/p.mp3', AmericanAudioUrl: '/sounds/american/p.mp3' }, 
  { Letter: 'n', Set: 1, BritishAudioUrl: '/sounds/british/n.mp3', AmericanAudioUrl: '/sounds/american/n.mp3' },
  { Letter: 'ck', Set: 2, BritishAudioUrl: '/sounds/british/ck.mp3', AmericanAudioUrl: '/sounds/american/ck.mp3' }, 
  { Letter: 'e', Set: 2, BritishAudioUrl: '/sounds/british/e.mp3', AmericanAudioUrl: '/sounds/american/e.mp3' }, 
  { Letter: 'h', Set: 2, BritishAudioUrl: '/sounds/british/h.mp3', AmericanAudioUrl: '/sounds/american/h.mp3' }, 
  { Letter: 'r', Set: 2, BritishAudioUrl: '/sounds/british/r.mp3', AmericanAudioUrl: '/sounds/american/r.mp3' }, 
  { Letter: 'm', Set: 2, BritishAudioUrl: '/sounds/british/m.mp3', AmericanAudioUrl: '/sounds/american/m.mp3' }, 
  { Letter: 'd', Set: 2, BritishAudioUrl: '/sounds/british/d.mp3', AmericanAudioUrl: '/sounds/american/d.mp3' },
  { Letter: 'g', Set: 3, BritishAudioUrl: '/sounds/british/g.mp3', AmericanAudioUrl: '/sounds/american/g.mp3' }, 
  { Letter: 'o', Set: 3, BritishAudioUrl: '/sounds/british/o.mp3', AmericanAudioUrl: '/sounds/american/o.mp3' }, 
  { Letter: 'u', Set: 3, BritishAudioUrl: '/sounds/british/u.mp3', AmericanAudioUrl: '/sounds/american/u.mp3' }, 
  { Letter: 'l', Set: 3, BritishAudioUrl: '/sounds/british/l.mp3', AmericanAudioUrl: '/sounds/american/l.mp3' }, 
  { Letter: 'f', Set: 3, BritishAudioUrl: '/sounds/british/f.mp3', AmericanAudioUrl: '/sounds/american/f.mp3' }, 
  { Letter: 'b', Set: 3, BritishAudioUrl: '/sounds/british/b.mp3', AmericanAudioUrl: '/sounds/american/b.mp3' },
  { Letter: 'ai', Set: 4, BritishAudioUrl: '/sounds/british/ai.mp3', AmericanAudioUrl: '/sounds/american/ai.mp3' }, 
  { Letter: 'j', Set: 4, BritishAudioUrl: '/sounds/british/j.mp3', AmericanAudioUrl: '/sounds/american/j.mp3' }, 
  { Letter: 'oa', Set: 4, BritishAudioUrl: '/sounds/british/oa.mp3', AmericanAudioUrl: '/sounds/american/oa.mp3' }, 
  { Letter: 'v', Set: 4, BritishAudioUrl: '/sounds/british/v.mp3', AmericanAudioUrl: '/sounds/american/v.mp3' }, 
  { Letter: 'oo', Set: 4, BritishAudioUrl: '/sounds/british/oo.mp3', AmericanAudioUrl: '/sounds/american/oo.mp3' }, 
  { Letter: '_oo', Set: 4, BritishAudioUrl: '/sounds/british/_oo.mp3', AmericanAudioUrl: '/sounds/american/_oo.mp3' },
  { Letter: 'y', Set: 5, BritishAudioUrl: '/sounds/british/y.mp3', AmericanAudioUrl: '/sounds/american/y.mp3' }, 
  { Letter: 'x', Set: 5, BritishAudioUrl: '/sounds/british/x.mp3', AmericanAudioUrl: '/sounds/american/x.mp3' }, 
  { Letter: 'ch', Set: 5, BritishAudioUrl: '/sounds/british/ch.mp3', AmericanAudioUrl: '/sounds/american/ch.mp3' }, 
  { Letter: 'sh', Set: 5, BritishAudioUrl: '/sounds/british/sh.mp3', AmericanAudioUrl: '/sounds/american/sh.mp3' }, 
  { Letter: 'th', Set: 5, BritishAudioUrl: '/sounds/british/th.mp3', AmericanAudioUrl: '/sounds/american/th.mp3' }, 
  { Letter: '_th', Set: 5, BritishAudioUrl: '/sounds/british/_th.mp3', AmericanAudioUrl: '/sounds/american/_th.mp3' },  
  { Letter: 'qu', Set: 6, BritishAudioUrl: '/sounds/british/qu.mp3', AmericanAudioUrl: '/sounds/american/qu.mp3' }, 
  { Letter: 'ou', Set: 6, BritishAudioUrl: '/sounds/british/ou.mp3', AmericanAudioUrl: '/sounds/american/ou.mp3' }, 
  { Letter: 'oi', Set: 6, BritishAudioUrl: '/sounds/british/oi.mp3', AmericanAudioUrl: '/sounds/american/oi.mp3' }, 
  { Letter: 'ue', Set: 6, BritishAudioUrl: '/sounds/british/ue.mp3', AmericanAudioUrl: '/sounds/american/ue.mp3' }, 
  { Letter: 'er', Set: 6, BritishAudioUrl: '/sounds/british/er.mp3', AmericanAudioUrl: '/sounds/american/er.mp3' }, 
  { Letter: 'ar', Set: 6, BritishAudioUrl: '/sounds/british/ar.mp3', AmericanAudioUrl: '/sounds/american/ar.mp3' },  
]

// Standard list of the alphabet
var LETTERS: string[] = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]