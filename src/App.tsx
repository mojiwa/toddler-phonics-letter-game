import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import About from './About';
import Home from './Home';
import PhonicsSets from './PhonicsSets';
import { ILetterData, LanguageSelection, IItemData, GameType } from './interfaces';
import Items from './components/Items';

interface IAppState {
  SavedData: ILetterData[];
  LanguageSelection: LanguageSelection;
  GameTypeSelection: GameType;
}

const EMPTY_SAVED_DATA: ILetterData[] = [];
const SAVED_DATA_KEY: string = 'savedLettersAndSets';
const SAVED_LANGUAGE_KEY: string = 'savedLanguageSelection';
const SAVED_GAME_TYPE_KEY: string = 'savedGameTypeSelection';

class App extends React.PureComponent<{},IAppState> {
  readonly state = {
    SavedData: EMPTY_SAVED_DATA,
    LanguageSelection: LanguageSelection.British,
    GameTypeSelection: GameType.Phonics
  }

  componentDidMount = () => {    
    this.setState({SavedData: this.getData()});
    this.setState({LanguageSelection: this.getLanguageSelection()});
    this.setState({GameTypeSelection: this.getGameTypeSelection()});
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
  storeData = (data: ILetterData[]) => {    
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
   * @param languageSelection Enum pertaining to the selected language (0 or 1)
   */
  storeLanguageSelection(languageSelection: LanguageSelection) {
    if (this.userCanUseStorage()) {
      var value = languageSelection.toString();
      localStorage.setItem(SAVED_LANGUAGE_KEY, value);
    }
  }

  /**
   * Store the GameType selection in web storage
   * @param LanguageSelection Enum pertaining to the selected language (0 or 1)
   */
  storeGameTypeSelection(gameTypeSelection: GameType) {
    if (this.userCanUseStorage()) {
      var value = gameTypeSelection.toString();
      localStorage.setItem(SAVED_GAME_TYPE_KEY, value);
    }
  }

  /**
   * Extract the data from web storage using the predefined keys.
   * The data will be stringified, so it must be parsed back into JSON.
   * If the user does not have access to web storage, simply return
   * an empty array (no settings have been saved).
  */
  getData(): ILetterData[] {
    var returnData = PHONICS_AND_SETS;
    if (this.userCanUseStorage()) {
      var data = localStorage.getItem(SAVED_DATA_KEY);
      if (data !== null) {
        returnData = [];
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

  /** 
   * Extract the game type selected option from web storage, if possible,
   * else default to British English. 
  */
 getGameTypeSelection(): GameType {
  var returnData: GameType = GameType.Phonics;
  if (this.userCanUseStorage()) {
    var data = localStorage.getItem(SAVED_GAME_TYPE_KEY);
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

  onGameTypeSelect = (gameTypeSelected: any) => {

  }

  applyChanges = (letterData: ILetterData) => {
    var letterSetToSave = this.state.SavedData;
    var indexToSplice = letterSetToSave.findIndex(l => l.Letter === letterData.Letter);
    letterSetToSave.splice(indexToSplice, 1, letterData);
    this.storeData(letterSetToSave);
    this.setState({SavedData: letterSetToSave});
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
              <li className='p-2'>
                <Link to='/items'>Items</Link>
              </li>
            </ul>
            <label className='ml-2'>Select Game Type:</label>
            <select id='game-type' name='game-type' onChange={(e) => this.onGameTypeSelect(e.target.value)} value={this.state.GameTypeSelection}>
              <option value={0}>Phonics</option>
              <option value={1}>Letters</option>
            </select>
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
              <PhonicsSets LetterData={this.state.SavedData} LanguageSelection={this.state.LanguageSelection} ApplyChanges={this.applyChanges} ItemData={ITEMS}/>
            </Route>
            <Route path="/items">
              <Items ItemData={ITEMS} LanguageSelection={this.state.LanguageSelection} LetterData={this.state.SavedData} GameType={this.state.GameTypeSelection} />
          </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

// List of letter sounds in their phonics sets
const PHONICS_AND_SETS: ILetterData[] = [
  { Letter: 's', Set: 1, BritishAudioUrl: '/sounds/british/s.mp3', AmericanAudioUrl: '/sounds/american/s.mp3', IsSelected: false }, 
  { Letter: 'a', Set: 1, BritishAudioUrl: '/sounds/british/a.mp3', AmericanAudioUrl: '/sounds/american/a.mp3', IsSelected: false }, 
  { Letter: 't', Set: 1, BritishAudioUrl: '/sounds/british/t.mp3', AmericanAudioUrl: '/sounds/american/t.mp3', IsSelected: false }, 
  { Letter: 'i', Set: 1, BritishAudioUrl: '/sounds/british/i.mp3', AmericanAudioUrl: '/sounds/american/i.mp3', IsSelected: false }, 
  { Letter: 'p', Set: 1, BritishAudioUrl: '/sounds/british/p.mp3', AmericanAudioUrl: '/sounds/american/p.mp3', IsSelected: false }, 
  { Letter: 'n', Set: 1, BritishAudioUrl: '/sounds/british/n.mp3', AmericanAudioUrl: '/sounds/american/n.mp3', IsSelected: false },
  { Letter: 'ck', Set: 2, BritishAudioUrl: '/sounds/british/ck.mp3', AmericanAudioUrl: '/sounds/american/ck.mp3', IsSelected: false }, 
  { Letter: 'e', Set: 2, BritishAudioUrl: '/sounds/british/e.mp3', AmericanAudioUrl: '/sounds/american/e.mp3', IsSelected: false }, 
  { Letter: 'h', Set: 2, BritishAudioUrl: '/sounds/british/h.mp3', AmericanAudioUrl: '/sounds/american/h.mp3', IsSelected: false }, 
  { Letter: 'r', Set: 2, BritishAudioUrl: '/sounds/british/r.mp3', AmericanAudioUrl: '/sounds/american/r.mp3', IsSelected: false }, 
  { Letter: 'm', Set: 2, BritishAudioUrl: '/sounds/british/m.mp3', AmericanAudioUrl: '/sounds/american/m.mp3', IsSelected: false }, 
  { Letter: 'd', Set: 2, BritishAudioUrl: '/sounds/british/d.mp3', AmericanAudioUrl: '/sounds/american/d.mp3', IsSelected: false },
  { Letter: 'g', Set: 3, BritishAudioUrl: '/sounds/british/g.mp3', AmericanAudioUrl: '/sounds/american/g.mp3', IsSelected: false }, 
  { Letter: 'o', Set: 3, BritishAudioUrl: '/sounds/british/o.mp3', AmericanAudioUrl: '/sounds/american/o.mp3', IsSelected: false }, 
  { Letter: 'u', Set: 3, BritishAudioUrl: '/sounds/british/u.mp3', AmericanAudioUrl: '/sounds/american/u.mp3', IsSelected: false }, 
  { Letter: 'l', Set: 3, BritishAudioUrl: '/sounds/british/l.mp3', AmericanAudioUrl: '/sounds/american/l.mp3', IsSelected: false }, 
  { Letter: 'f', Set: 3, BritishAudioUrl: '/sounds/british/f.mp3', AmericanAudioUrl: '/sounds/american/f.mp3', IsSelected: false }, 
  { Letter: 'b', Set: 3, BritishAudioUrl: '/sounds/british/b.mp3', AmericanAudioUrl: '/sounds/american/b.mp3', IsSelected: false },
  { Letter: 'ai', Set: 4, BritishAudioUrl: '/sounds/british/ai.mp3', AmericanAudioUrl: '/sounds/american/ai.mp3', IsSelected: false }, 
  { Letter: 'j', Set: 4, BritishAudioUrl: '/sounds/british/j.mp3', AmericanAudioUrl: '/sounds/american/j.mp3', IsSelected: false }, 
  { Letter: 'oa', Set: 4, BritishAudioUrl: '/sounds/british/oa.mp3', AmericanAudioUrl: '/sounds/american/oa.mp3', IsSelected: false }, 
  { Letter: 'ia', Set: 4, BritishAudioUrl: '/sounds/british/ia.mp3', AmericanAudioUrl: '/sounds/american/ia.mp3', IsSelected: false }, 
  { Letter: 'ee', Set: 4, BritishAudioUrl: '/sounds/british/ee.mp3', AmericanAudioUrl: '/sounds/american/ee.mp3', IsSelected: false }, 
  { Letter: 'or', Set: 4, BritishAudioUrl: '/sounds/british/oor.mp3', AmericanAudioUrl: '/sounds/american/or.mp3', IsSelected: false }, 
  { Letter: 'z', Set: 5, BritishAudioUrl: '/sounds/british/z.mp3', AmericanAudioUrl: '/sounds/american/z.mp3', IsSelected: false }, 
  { Letter: 'w', Set: 5, BritishAudioUrl: '/sounds/british/w.mp3', AmericanAudioUrl: '/sounds/american/w.mp3', IsSelected: false }, 
  { Letter: 'ng', Set: 5, BritishAudioUrl: '/sounds/british/ng.mp3', AmericanAudioUrl: '/sounds/american/nw.mp3', IsSelected: false },
  { Letter: 'v', Set: 5, BritishAudioUrl: '/sounds/british/v.mp3', AmericanAudioUrl: '/sounds/american/v.mp3', IsSelected: false }, 
  { Letter: 'oo', Set: 5, BritishAudioUrl: '/sounds/british/oo.mp3', AmericanAudioUrl: '/sounds/american/oo.mp3', IsSelected: false }, 
  { Letter: '_oo', Set: 5, BritishAudioUrl: '/sounds/british/_oo.mp3', AmericanAudioUrl: '/sounds/american/_oo.mp3', IsSelected: false },
  { Letter: 'y', Set: 6, BritishAudioUrl: '/sounds/british/y.mp3', AmericanAudioUrl: '/sounds/american/y.mp3', IsSelected: false }, 
  { Letter: 'x', Set: 6, BritishAudioUrl: '/sounds/british/x.mp3', AmericanAudioUrl: '/sounds/american/x.mp3', IsSelected: false }, 
  { Letter: 'ch', Set: 6, BritishAudioUrl: '/sounds/british/ch.mp3', AmericanAudioUrl: '/sounds/american/ch.mp3', IsSelected: false }, 
  { Letter: 'sh', Set: 6, BritishAudioUrl: '/sounds/british/sh.mp3', AmericanAudioUrl: '/sounds/american/sh.mp3', IsSelected: false }, 
  { Letter: 'th', Set: 6, BritishAudioUrl: '/sounds/british/th.mp3', AmericanAudioUrl: '/sounds/american/th.mp3', IsSelected: false }, 
  { Letter: '_th', Set: 6, BritishAudioUrl: '/sounds/british/_th.mp3', AmericanAudioUrl: '/sounds/american/_th.mp3', IsSelected: false },  
  { Letter: 'qu', Set: 7, BritishAudioUrl: '/sounds/british/qu.mp3', AmericanAudioUrl: '/sounds/american/qu.mp3', IsSelected: false }, 
  { Letter: 'ou', Set: 7, BritishAudioUrl: '/sounds/british/ou.mp3', AmericanAudioUrl: '/sounds/american/ou.mp3', IsSelected: false }, 
  { Letter: 'oi', Set: 7, BritishAudioUrl: '/sounds/british/oi.mp3', AmericanAudioUrl: '/sounds/american/oi.mp3', IsSelected: false }, 
  { Letter: 'ue', Set: 7, BritishAudioUrl: '/sounds/british/ue.mp3', AmericanAudioUrl: '/sounds/american/ue.mp3', IsSelected: false }, 
  { Letter: 'er', Set: 7, BritishAudioUrl: '/sounds/british/er.mp3', AmericanAudioUrl: '/sounds/american/er.mp3', IsSelected: false }, 
  { Letter: 'ar', Set: 7, BritishAudioUrl: '/sounds/british/ar.mp3', AmericanAudioUrl: '/sounds/american/ar.mp3', IsSelected: false },  
]

// Standard list of the alphabet
const LETTERS_AND_SETS: ILetterData[] = [
  { Letter: 'a', Set: 1, BritishAudioUrl: '/sounds/british/a.mp3', AmericanAudioUrl: '/sounds/american/a.mp3', IsSelected: false },
  { Letter: 'b', Set: 3, BritishAudioUrl: '/sounds/british/b.mp3', AmericanAudioUrl: '/sounds/american/b.mp3', IsSelected: false }, 
  { Letter: 'c', Set: 2, BritishAudioUrl: '/sounds/british/ck.mp3', AmericanAudioUrl: '/sounds/american/ck.mp3', IsSelected: false }, 
  { Letter: 'd', Set: 2, BritishAudioUrl: '/sounds/british/d.mp3', AmericanAudioUrl: '/sounds/american/d.mp3', IsSelected: false },
  { Letter: 'e', Set: 2, BritishAudioUrl: '/sounds/british/e.mp3', AmericanAudioUrl: '/sounds/american/e.mp3', IsSelected: false }, 
  { Letter: 'f', Set: 3, BritishAudioUrl: '/sounds/british/f.mp3', AmericanAudioUrl: '/sounds/american/f.mp3', IsSelected: false }, 
  { Letter: 'g', Set: 3, BritishAudioUrl: '/sounds/british/g.mp3', AmericanAudioUrl: '/sounds/american/g.mp3', IsSelected: false }, 
  { Letter: 'h', Set: 2, BritishAudioUrl: '/sounds/british/h.mp3', AmericanAudioUrl: '/sounds/american/h.mp3', IsSelected: false },
  { Letter: 'i', Set: 1, BritishAudioUrl: '/sounds/british/i.mp3', AmericanAudioUrl: '/sounds/american/i.mp3', IsSelected: false }, 
  { Letter: 'j', Set: 4, BritishAudioUrl: '/sounds/british/j.mp3', AmericanAudioUrl: '/sounds/american/j.mp3', IsSelected: false }, 
  { Letter: 'k', Set: 2, BritishAudioUrl: '/sounds/british/ck.mp3', AmericanAudioUrl: '/sounds/american/ck.mp3', IsSelected: false }, 
  { Letter: 'l', Set: 3, BritishAudioUrl: '/sounds/british/l.mp3', AmericanAudioUrl: '/sounds/american/l.mp3', IsSelected: false },
  { Letter: 'm', Set: 2, BritishAudioUrl: '/sounds/british/m.mp3', AmericanAudioUrl: '/sounds/american/m.mp3', IsSelected: false }, 
  { Letter: 'n', Set: 1, BritishAudioUrl: '/sounds/british/n.mp3', AmericanAudioUrl: '/sounds/american/n.mp3', IsSelected: false },
  { Letter: 'o', Set: 3, BritishAudioUrl: '/sounds/british/o.mp3', AmericanAudioUrl: '/sounds/american/o.mp3', IsSelected: false }, 
  { Letter: 'p', Set: 1, BritishAudioUrl: '/sounds/british/p.mp3', AmericanAudioUrl: '/sounds/american/p.mp3', IsSelected: false }, 
  { Letter: 'q', Set: 7, BritishAudioUrl: '/sounds/british/qu.mp3', AmericanAudioUrl: '/sounds/american/qu.mp3', IsSelected: false }, 
  { Letter: 'r', Set: 2, BritishAudioUrl: '/sounds/british/r.mp3', AmericanAudioUrl: '/sounds/american/r.mp3', IsSelected: false }, 
  { Letter: 's', Set: 1, BritishAudioUrl: '/sounds/british/s.mp3', AmericanAudioUrl: '/sounds/american/s.mp3', IsSelected: false }, 
  { Letter: 't', Set: 1, BritishAudioUrl: '/sounds/british/t.mp3', AmericanAudioUrl: '/sounds/american/t.mp3', IsSelected: false }, 
  { Letter: 'u', Set: 3, BritishAudioUrl: '/sounds/british/u.mp3', AmericanAudioUrl: '/sounds/american/u.mp3', IsSelected: false }, 
  { Letter: 'v', Set: 5, BritishAudioUrl: '/sounds/british/v.mp3', AmericanAudioUrl: '/sounds/american/v.mp3', IsSelected: false }, 
  { Letter: 'w', Set: 5, BritishAudioUrl: '/sounds/british/w.mp3', AmericanAudioUrl: '/sounds/american/w.mp3', IsSelected: false }, 
  { Letter: 'x', Set: 6, BritishAudioUrl: '/sounds/british/x.mp3', AmericanAudioUrl: '/sounds/american/x.mp3', IsSelected: false }, 
  { Letter: 'y', Set: 6, BritishAudioUrl: '/sounds/british/y.mp3', AmericanAudioUrl: '/sounds/american/y.mp3', IsSelected: false }, 
  { Letter: 'z', Set: 5, BritishAudioUrl: '/sounds/british/z.mp3', AmericanAudioUrl: '/sounds/american/z.mp3', IsSelected: false }, 
  
]

const ITEMS: IItemData[] = [ 
  { Item: 'alligator', Letter: 'a', Sound: 'a', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/alligator--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/alligator--_us_1.mp3', ImageUrl: './images/objects/set1/a/alligator.jpg' },
  { Item: 'ant', Letter: 'a', Sound: 'a', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/ant--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/ant--_us_1.mp3', ImageUrl: './images/objects/set1/a/ant.jpg' },
  { Item: 'apple', Letter: 'a', Sound: 'a', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/apple--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/apple--_us_1.mp3', ImageUrl: './images/objects/set1/a/apple.jpg' },
  { Item: 'iguana', Letter: 'i', Sound: 'i', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/iguana--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/iguana--_us_1.mp3', ImageUrl: './images/objects/set1/i/iguana.jpg' },
  { Item: 'nail', Letter: 'n', Sound: 'n', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/nail--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/nail--_us_1.mp3', ImageUrl: './images/objects/set1/n/nail.jpg' },
  { Item: 'nest', Letter: 'n', Sound: 'n', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/nest--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/nest--_us_1.mp3', ImageUrl: './images/objects/set1/n/nest.jpg' },
  { Item: 'panda', Letter: 'p', Sound: 'p', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/panda--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/panda--_us_1.mp3', ImageUrl: './images/objects/set1/p/panda.jpg' },
  { Item: 'parrot', Letter: 'p', Sound: 'p', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/parrot--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/parrot--_us_1.mp3', ImageUrl: './images/objects/set1/p/parrot.jpg' },
  { Item: 'penguin', Letter: 'p', Sound: 'p', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/penguin--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/penguin--_us_1.mp3', ImageUrl: './images/objects/set1/p/penguin.jpg' },
  { Item: 'pig', Letter: 'p', Sound: 'p', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/pig--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/pig--_us_1.mp3', ImageUrl: './images/objects/set1/p/pig.jpg' },
  { Item: 'sandcastle', Letter: 's', Sound: 's', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/sandcastle--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/sandcastle--_us_1.mp3', ImageUrl: './images/objects/set1/s/sandcastle.jpg' },
  { Item: 'snake', Letter: 's', Sound: 's', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/snake--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/snake--_us_1.mp3', ImageUrl: './images/objects/set1/s/snake.jpg' },
  { Item: 'snowman', Letter: 's', Sound: 's', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/snowman--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/snowman--_us_1.mp3', ImageUrl: './images/objects/set1/s/snowman.jpg' },
  { Item: 'spoon', Letter: 's', Sound: 's', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/spoon--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/spoon--_us_1.mp3', ImageUrl: './images/objects/set1/s/spoon.jpg' },
  { Item: 'star', Letter: 's', Sound: 's', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/star--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/star--_us_1.mp3', ImageUrl: './images/objects/set1/s/star.jpg' },
  { Item: 'teapot', Letter: 't', Sound: 't', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/teapot--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/teapot--_us_1.mp3', ImageUrl: './images/objects/set1/t/teapot.jpg' },
  { Item: 'teddy', Letter: 't', Sound: 't', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/teddy--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/teddy--_us_1.mp3', ImageUrl: './images/objects/set1/t/teddy.jpg' },
  { Item: 'tomato', Letter: 't', Sound: 't', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/tomato--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/tomato--_us_1.mp3', ImageUrl: './images/objects/set1/t/tomato.jpg' },
  { Item: 'turtle', Letter: 't', Sound: 't', BritishAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/turtle--_gb_1.mp3', AmericanAudioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/turtle--_us_1.mp3', ImageUrl: './images/objects/set1/t/turtle.jpg' },

]