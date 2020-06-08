import React from 'react';
import Letter from './components/Letter';
import { ILetterData, LanguageSelection } from './interfaces';

interface IPhonicsSetsProps {
  LetterData: ILetterData[];
  LanguageSelection: LanguageSelection;
  ApplyChanges: Function;
}

/** 
 * Displays all the letters so that the parent may select which to focus on
 * in the game. Selected letters are saved to web storage. 
*/
export default class PhonicsSets extends React.PureComponent<IPhonicsSetsProps,{}> {  

  render() {
    return(
      <div>
        <div>
          Tap on a <a className='text-purple-700 hover:underline' target='_blank' rel='noopener noreferrer' href='https://www.theschoolrun.com/what-is-a-grapheme'>grapheme</a> select it. You can switch between British and American English in the options menu above.
        </div>
        <br />
        Set 1
        <ul className='flex flex-wrap'>
          {this.props.LetterData.filter(l => l.Set === 1).map(l => (
            <li key={l.Letter}>
              <Letter LetterData={l} LanguagePreference={this.props.LanguageSelection} PlayAudio={false} ApplyChanges={this.props.ApplyChanges} />
            </li>
          ))}
        </ul>       
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