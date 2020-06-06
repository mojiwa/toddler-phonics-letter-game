import React from 'react';
import { ILetterData, IItemData, LanguageSelection, GameType } from '../interfaces';

interface IItemProps {
  LetterData: ILetterData[];
  ItemData: IItemData[];
  LanguageSelection: LanguageSelection;
  GameType: GameType;
}

interface IItemState { 
  SelectedItems: IItemData[];
}

const EMPTY_ITEM_DATA: IItemData[] = [];

/**
 * Displays the list of items corresponding to the phonics/letters the user has selected
*/
export default class Items extends React.PureComponent<IItemProps, IItemState> {
  readonly state = {
    SelectedItems: EMPTY_ITEM_DATA
  }

  playSound(audioUrl: string) {
    var audio = new Audio(audioUrl);
    audio.play();
  }

  render() {
    return (
      <div>
        <img 
          src={this.props.ItemData[0].ImageUrl} alt={this.props.ItemData[0].Item} 
          onClick={() => this.playSound(this.props.LanguageSelection === LanguageSelection.British ? this.props.ItemData[0].BritishAudioUrl : this.props.ItemData[0].AmericanAudioUrl)}/>
      </div>
    )
  }
}