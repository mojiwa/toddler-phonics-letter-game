import React from 'react';
import { ILetterData, IItemData, LanguageSelection } from '../interfaces';

interface IItemProps {
  LetterData: ILetterData[];
  ItemData: IItemData[];
  LanguageSelection: LanguageSelection;
}

interface IItemState { 

}

/**
 * Displays the list of items corresponding to the phonics/letters the user has selected
*/
export default class Items extends React.PureComponent<IItemProps, IItemState> {
  readonly state = {

  }

  playSound(audioUrl: string) {
    var audio = new Audio(audioUrl);
    audio.play();
  }

  render() {
    let selectedLetters: string[] = [];
    this.props.LetterData.forEach(ld => { if (ld.IsSelected)  selectedLetters.push(ld.Letter) });
    return (
      <div>
        <ul>
          {this.props.ItemData.filter(item => selectedLetters.includes(item.Letter)).map(item => (
            <li>
              <img 
                src={item.ImageUrl} alt={item.Item} 
                onClick={() => this.playSound(this.props.LanguageSelection === LanguageSelection.British ? item.BritishAudioUrl : item.AmericanAudioUrl)}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}