import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import About from './About';
import Home from './Home';
import PhonicsSets from './PhonicsSets';
import { ILetterData, LanguageSelection, IItemData, GameType } from './interfaces';
import Items from './components/Items';

//import LetterData from './LetterData.json';
import PhonicsData from './PhonicsData.json';
import ItemData from './ItemData.json';

interface IAppState {
  SavedData: ILetterData[];
  LanguageSelection: LanguageSelection;
  GameTypeSelection: GameType;
  ItemData: IItemData[];
  SelectedItems: IItemData[];
}

const EMPTY_SAVED_DATA: ILetterData[] = [];
const SAVED_DATA_KEY: string = 'savedLettersAndSets';
const SAVED_LANGUAGE_KEY: string = 'savedLanguageSelection';
const SAVED_GAME_TYPE_KEY: string = 'savedGameTypeSelection';

class App extends React.PureComponent<{},IAppState> {
  readonly state = {
    SavedData: EMPTY_SAVED_DATA,
    LanguageSelection: LanguageSelection.British,
    GameTypeSelection: GameType.Phonics,
    ItemData: JSON.parse(JSON.stringify(ItemData)) as IItemData[],
    SelectedItems: JSON.parse(JSON.stringify(ItemData))
  }

  componentDidMount = () => {    
    this.setState({SavedData: this.getData()}, () => this.setSelectedItems(this.state.SavedData));
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
    var returnData: ILetterData[] = JSON.parse(JSON.stringify(PhonicsData));
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
    this.setSelectedItems(letterSetToSave);
  }

  // Filter out only the items from the selected
  // letters/sounds and save them to state
  setSelectedItems = (savedLetters: ILetterData[]) => {
    let selectedLetters: string[] = [];
    savedLetters.forEach(ld => { 
      if (ld.IsSelected) { 
        selectedLetters.push(ld.Letter) 
      } 
    });
    
    var itemData = this.state.ItemData.filter(
      item => selectedLetters.includes(
        this.state.GameTypeSelection === GameType.Letters ? 
          item.Letter : 
          item.Sound)
    );

    this.setState({ SelectedItems: this.randomizeArray(itemData) });
  }

  // Use the Fisher-Yates shuffle to 
  // randomize the ItemData list
  randomizeArray(array: any[]): any[] {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
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
                {/* Don't show link to the game if no letters are selected */}
                {this.state.SelectedItems.length === 0 ? <div> </div> : <Link to='/items'>Items</Link>}
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
              <PhonicsSets LetterData={this.state.SavedData} LanguageSelection={this.state.LanguageSelection} ApplyChanges={this.applyChanges} />
            </Route>
            <Route path="/items">
              <Items ItemData={this.state.SelectedItems} LanguageSelection={this.state.LanguageSelection} LetterData={this.state.SavedData} GameType={this.state.GameTypeSelection} />
          </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;