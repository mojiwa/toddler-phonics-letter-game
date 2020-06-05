import React from 'react';
import { ILetterData, IItemData, LanguageSelection } from '../interfaces';

interface IItemProps {
  LetterData: ILetterData[];
  ItemData: IItemData[];
  LanguageSelection: LanguageSelection;
}

interface IItemState { 

}

export default class Items extends React.PureComponent<IItemProps, IItemState> {
  readonly state = {

  }

  playSound(audioUrl: string) {
    var audio = new Audio(audioUrl);
    audio.play();
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.ItemData.map(item => (
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