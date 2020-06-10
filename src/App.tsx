import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import About from './About';
import PhonicsSets from './PhonicsSets';
import { ILetterData, LanguageSelection, IItemData, GameType, Page } from './interfaces';
import Game from './components/Game';

import AlphabetData from './AlphabetData.json';
import PhonicsData from './PhonicsData.json';
import ItemData from './ItemData.json';
import Options from './components/Options';

interface IAppState {
  SavedData: ILetterData[];
  LanguageSelection: LanguageSelection;
  GameTypeSelection: GameType;
  ItemData: IItemData[];
  SelectedItems: IItemData[];
  Page: Page;
  ShowMobileMenu: boolean;
}

const SAVED_DATA_KEY: string = 'savedLettersAndSets';
const SAVED_LANGUAGE_KEY: string = 'savedLanguageSelection';
const SAVED_GAME_TYPE_KEY: string = 'savedGameTypeSelection';

class App extends React.PureComponent<{},IAppState> {
  readonly state = {
    SavedData: this.getData(),
    LanguageSelection: this.getLanguageSelection(),
    GameTypeSelection: this.getGameTypeSelection(),
    ItemData: JSON.parse(JSON.stringify(ItemData)) as IItemData[],
    SelectedItems: this.setSelectedItems(this.getData()),
    Page: Page.Home,
    ShowMobileMenu: false
  }

  componentDidUpdate() {
    // when the navigation buttons are pressed, ensure
    // the selected menu item matches the correct page
    window.onpopstate = (e: any) => {
      let url: string = e.currentTarget.document.URL;      
      if (url.includes('phonics-sets')) {
        this.setPage(Page.Phonics);
      } else if (url.includes('game')) {
        this.setPage(Page.Game);
      } else if (url.includes('options')) {
        this.setPage(Page.Options);
      } else if (url.includes('about')) {
        this.setPage(Page.About);
      } else {
        this.setPage(Page.Home);
      }
    }
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
    let gameTypeSelection: GameType = parseInt(gameTypeSelected);
    this.storeGameTypeSelection(gameTypeSelection);
    this.setState({GameTypeSelection: gameTypeSelection});
  }

  /** 
   * We always save the entire letter set, however the letter that has just been selected
   * or unselected is updated. We then pass that updated set to the setSelectedItems method
  */
  applyChanges = (letterData: ILetterData) => {
    var letterSetToSave = this.state.SavedData;
    var indexToSplice = letterSetToSave.findIndex(l => l.Letter === letterData.Letter);
    letterSetToSave.splice(indexToSplice, 1, letterData);
    this.storeData(letterSetToSave);
    this.setState({SavedData: letterSetToSave}, () => {
      let selectedItems = this.setSelectedItems(letterSetToSave);
      this.setState({SelectedItems: selectedItems});
    });
  }

  // Filter out only the items from the selected
  // letters/sounds and save them to state
  setSelectedItems(savedLetters: ILetterData[]): IItemData[] {
    let selectedLetters: string[] = [];
    savedLetters.forEach(ld => { 
      if (ld.IsSelected) { 
        selectedLetters.push(ld.Letter) 
      } 
    });

    var itemData = ItemData.filter(
      item => selectedLetters.includes(
        this.getGameTypeSelection() === GameType.Letters ? 
          item.Letter : 
          item.Sound)
    );
    return itemData;
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

  // Sets the current page which is used to define which menu
  // tab is highlighted
  setPage = (page: Page) => {
    this.setState({ Page: page, ShowMobileMenu: false });
  }

  openMobileMenu = () => {
    console.log('I have been clicked')
  }

  Home = () => {
    return(
      <div className='w-4/5 md:w-3/5 flex justify-center mx-auto bg-yellow-500 rounded-lg p-4 md:mt-10 shadow-2xl'>              
        <div className='flex-row text-center'>
          <div className='mb-4 text-left'>
            This game is designed for toddlers and young children to grasp the basics of learning the alphabet through phonics.
          </div>
          <Link to='/phonics-sets' onClick={() => this.setPage(Page.Phonics)}>
            <button className='border-purple-500 px-8 py-4 border-solid border-4 text-center md:text-2xl rounded-lg shadow-2xl bg-purple-700 text-white hover:bg-purple-600'>Start</button>
            <Router>
                <Switch>
                    <Route exact path='/phonics-sets' component={PhonicsSets}/>
                </Switch>
            </Router>            
          </Link>                 
        </div>                
      </div>      
    );
  }

  render() {
    return (
      <Router>
        <div className=''>
          {/* Mobile menu */}
          <div className='flex-row md:hidden'>
            <div className='flex x-2 items-center justify-between bg-yellow-500'>
              <div onClick={() => this.setState({ShowMobileMenu: !this.state.ShowMobileMenu})}>
                <svg fill={`${this.state.ShowMobileMenu ? 'white' : '#6B46C0'}`} viewBox="0 0 20 20" width='35px'>
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd">
                  </path>
                </svg>
              </div>
              <div className='p-2 bg-yellow-500' onClick={() => this.setPage(Page.Options)}>
                  <Link to="/options">
                    <svg 
                      className={`${this.state.Page === Page.Options ? 'text-white' : 'text-purple-700'}`}
                      width='35px'
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor">
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </Link>    
                </div>
              </div>
              <div className='absolute w-full z-10'>
                <ul className={`text-purple-700 text-xl mobile-menu ${this.state.ShowMobileMenu ? '' : 'hidden'}`}>
                  <li className={`p-2 ${this.state.Page === Page.Home ? 'bg-purple-700 text-white' : 'bg-yellow-500'}`}>
                    <Link to='/' onClick={() => this.setPage(Page.Home)}>
                        <div>Home</div>
                    </Link>
                  </li>
                  <li className={`p-2 ${this.state.Page === Page.About ? 'bg-purple-700 text-white' : 'bg-yellow-500'}`}>
                    <Link to="/about" onClick={() => this.setPage(Page.About)}>
                      <div>About</div>
                    </Link>
                  </li>
                  <li className={`p-2 ${this.state.Page === Page.Phonics ? 'bg-purple-700 text-white' : 'bg-yellow-500'}`}>
                    <Link to="/phonics-sets" onClick={() => this.setPage(Page.Phonics)}>
                      <div>Letters</div>
                    </Link>
                  </li>
                  <li className={`p-2 ${this.state.Page === Page.Game ? 'bg-purple-700 text-white' : 'bg-yellow-500'}`}>
                    {/* Don't show link to the game if no letters are selected */}
                    {this.state.SelectedItems.length === 0 ? <div> </div> : <Link to='/game' onClick={() => this.setPage(Page.Game)}>
                      <div>Play</div>
                    </Link>}
                  </li>
                </ul>
              </div>
          </div>
          {/* Desktop Menu */}
          <div className='flex x-2 bg-yellow-500 border-purple-700 border-solid border-b-4 hidden md:block'>
            <ul className='w-4/5 mx-auto flex text-purple-700 text-sm md:text-2xl justify-around text-center'>
              <li className={`p-2 ${this.state.Page === Page.Home ? 'bg-purple-700 text-white' : 'bg-yellow-500'} w-1/3 hover:bg-purple-700 hover:text-white duration-300 ease-out`}>
                <Link to='/' onClick={() => this.setPage(Page.Home)}>
                    <div className='h-full'>Home</div>
                </Link>
              </li>
              <li className={`p-2 ${this.state.Page === Page.About ? 'bg-purple-700 text-white' : 'bg-yellow-500'} w-1/3 hover:bg-purple-700 hover:text-white duration-300 ease-out`}>
                <Link to="/about" onClick={() => this.setPage(Page.About)}>
                  <div className='h-full'>About</div>
                </Link>
              </li>
              <li className={`p-2 ${this.state.Page === Page.Phonics ? 'bg-purple-700 text-white' : 'bg-yellow-500'} w-1/3 hover:bg-purple-700 hover:text-white duration-300 ease-out`}>
                <Link to="/phonics-sets" onClick={() => this.setPage(Page.Phonics)}>
                  <div className='h-full'>Letters</div>
                </Link>
              </li>
              {/* Don't show link to the game if no letters are selected */}
              <li className={`p-2 ${this.state.SelectedItems.length === 0 ? 'hidden' : ''} ${this.state.Page === Page.Game ? 'bg-purple-700 text-white' : 'bg-yellow-500'} w-1/3 hover:bg-purple-700 hover:text-white duration-300 ease-out`}>
                <Link to='/game' onClick={() => this.setPage(Page.Game)}>
                  <div className='h-full'>Play</div>
                </Link>
              </li>
              <li className='p-2 bg-yellow-500 w-1/12' onClick={() => this.setPage(Page.Options)}>
                <Link to="/options">
                  <svg 
                    className={`${this.state.Page === Page.Options ? 'text-white' : 'text-purple-700'} hover:text-white duration-300 ease-out`}
                    width='24px'
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor">
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </Link>    
              </li>
            </ul>   
          </div>          
          
          <div className='pt-4'>
            <Switch>
              <Route exact path="/" component={this.Home} />                
              <Route path="/options">
                <Options SetPage={this.setPage} OnLanguageSave={this.onLanguageSelect} OnGameTypeSave={this.onGameTypeSelect} LanguageSelection={this.state.LanguageSelection} GameTypeSelection={this.state.GameTypeSelection} />
              </Route>              
              <Route path="/about">
                <About SetPage={this.setPage} />
              </Route>
              <Route path="/phonics-sets">
                <PhonicsSets SetPage={this.setPage} LetterData={this.state.SavedData} LanguageSelection={this.state.LanguageSelection} ApplyChanges={this.applyChanges} />
              </Route>
              <Route path="/game">
                <Game 
                  SetPage={this.setPage}
                  ItemData={this.randomizeArray(this.state.SelectedItems)} 
                  Alphabet={AlphabetData}
                  LanguageSelection={this.state.LanguageSelection} 
                  LetterData={this.state.SavedData} 
                  GameType={this.state.GameTypeSelection}
                  RandomizeArray={this.randomizeArray} />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;