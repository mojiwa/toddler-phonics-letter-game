import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Letter from './components/Letter';
import { ILetterData, LanguageSelection, Page } from './interfaces';
import Game from './components/Game';

interface IPhonicsSetsProps {
  LetterData: ILetterData[];
  LanguageSelection: LanguageSelection;
  ApplyChanges: Function;
  SetPage: Function;  
}

interface IPhonicsSetsState {
  ShowPlayGameButton: boolean;
}

/** 
 * Displays all the letters so that the parent may select which to focus on
 * in the game. Selected letters are saved to web storage. 
*/
export default class PhonicsSets extends React.PureComponent<IPhonicsSetsProps, IPhonicsSetsState> {  
  readonly state = {
    ShowPlayGameButton: false
  }

  componentDidMount() {
    this.props.SetPage(Page.Phonics);
    this.showPlayGameButton()
  }

  componentWillReceiveProps() {    
    this.showPlayGameButton()
  }

  showPlayGameButton = () => {
    this.setState({ ShowPlayGameButton: this.props.LetterData.findIndex(l => l.IsSelected === true) !== -1})    
  }

  render() {
    return(
      <div className='w-4/5 md:w-3/5 mx-auto bg-yellow-500 rounded-lg p-4 md:mt-10 shadow-2xl'>
        <div>
          Tap on a <a className='text-purple-700 hover:underline' target='_blank' rel='noopener noreferrer' href='https://www.theschoolrun.com/what-is-a-grapheme'>grapheme</a> to select it. You can switch between British and American English in the options menu above.
        </div>
        <br />
        Set 1
        <ul className='flex flex-wrap justify-center'>
          {this.props.LetterData.filter(l => l.Set === 1).map(l => (
            <li key={l.Letter}>
              <Letter LetterData={l} LanguagePreference={this.props.LanguageSelection} PlayAudio={false} ApplyChanges={this.props.ApplyChanges} />
            </li>
          ))}
        </ul>       
        <div className={`flex justify-center ${this.state.ShowPlayGameButton ? '' : 'hidden'}`}>
          <Link to='/game' onClick={() => this.props.SetPage(Page.Game)}>
            <button className='my-4 mx border-purple-500 px-8 py-4 border-solid border-4 text-center md:text-2xl rounded-lg shadow-2xl bg-purple-700 text-white hover:bg-purple-600'>Start</button>
            <Router>
                <Switch>
                    <Route exact path='/game' component={Game}/>
                </Switch>
            </Router>            
          </Link>               
        </div>        
        <div>Set 2: Coming soon...</div>
        {/* Other sets to come later */}
        {/* Set 2 
        <ul>
          {this.props.LetterData.filter(l => l.Set === 2).map(l => (
            <li key={l.Letter}>
              <Letter LetterData={l} LanguagePreference={this.props.LanguageSelection} PlayAudio={true} ApplyChanges={this.props.ApplyChanges} />
            </li>
          ))}
        </ul>
        Set 3
        <ul>
          {this.props.LetterData.filter(l => l.Set === 3).map(l => (
            <li key={l.Letter}>
              <Letter LetterData={l} LanguagePreference={this.props.LanguageSelection} PlayAudio={true} ApplyChanges={this.props.ApplyChanges} />
            </li>
          ))}
        </ul>
        Set 4
        <ul>
          {this.props.LetterData.filter(l => l.Set === 4).map(l => (
            <li key={l.Letter}>
              <Letter LetterData={l} LanguagePreference={this.props.LanguageSelection} PlayAudio={true} ApplyChanges={this.props.ApplyChanges} />
            </li>
          ))}
        </ul>
        Set 5
        <ul>
          {this.props.LetterData.filter(l => l.Set === 5).map(l => (
            <li key={l.Letter}>
              <Letter LetterData={l} LanguagePreference={this.props.LanguageSelection} PlayAudio={true} ApplyChanges={this.props.ApplyChanges} />
            </li>
          ))}
        </ul>
        Set 6
        <ul>
          {this.props.LetterData.filter(l => l.Set === 6).map(l => (
            <li key={l.Letter}>
              <Letter LetterData={l} LanguagePreference={this.props.LanguageSelection} PlayAudio={true} ApplyChanges={this.props.ApplyChanges} />
            </li>
          ))}
        </ul>     
        Set 7
        <ul>
          {this.props.LetterData.filter(l => l.Set === 7).map(l => (
            <li key={l.Letter}>
              <Letter LetterData={l} LanguagePreference={this.props.LanguageSelection} PlayAudio={true} ApplyChanges={this.props.ApplyChanges} />
            </li>
          ))}
        </ul>       */}
      </div>
    )
  }
}