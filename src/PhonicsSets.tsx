import React from 'react';
import Letter from './components/Letter';
import { ILetterData, LanguageSelection } from './interfaces';

interface ILetterSelectProps {
  LetterData: ILetterData[];
  LanguageSelection: LanguageSelection;
}

/** 
 * Displays all the letters so that the parent may select which to focus on
 * in the game. Selected letters are saved to web storage. 
*/
export default class PhonicsSets extends React.PureComponent<ILetterSelectProps,{}> {  

  render() {
    return(
      <div>
        Set 1
        <ul>
          {this.props.LetterData.filter(las => las.Set === 1).map(las => (
            <li key={las.Letter}>
              <Letter LetterData={las} Size='small' LanguagePreference={this.props.LanguageSelection}/>
            </li>
          ))}
        </ul>       
        Set 2 
        <ul>
          {this.props.LetterData.filter(las => las.Set === 2).map(las => (
            <li key={las.Letter}>
              <Letter LetterData={las} Size='small' LanguagePreference={this.props.LanguageSelection}/>
            </li>
          ))}
        </ul>
        Set 3
        <ul>
          {this.props.LetterData.filter(las => las.Set === 3).map(las => (
            <li key={las.Letter}>
              <Letter LetterData={las} Size='small' LanguagePreference={this.props.LanguageSelection}/>
            </li>
          ))}
        </ul>
        Set 4
        <ul>
          {this.props.LetterData.filter(las => las.Set === 4).map(las => (
            <li key={las.Letter}>
              <Letter LetterData={las} Size='small' LanguagePreference={this.props.LanguageSelection}/>
            </li>
          ))}
        </ul>
        Set 5
        <ul>
          {this.props.LetterData.filter(las => las.Set === 5).map(las => (
            <li key={las.Letter}>
              <Letter LetterData={las} Size='small' LanguagePreference={this.props.LanguageSelection}/>
            </li>
          ))}
        </ul>
        Set 6
        <ul>
          {this.props.LetterData.filter(las => las.Set === 6).map(las => (
            <li key={las.Letter}>
              <Letter LetterData={las} Size='small' LanguagePreference={this.props.LanguageSelection}/>
            </li>
          ))}
        </ul>        
      </div>
    )
  }
}