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

  componentDidMount = () => {
    let selectedLetters: string[] = [];
    this.props.LetterData.forEach(ld => { 
      if (ld.IsSelected) { 
        selectedLetters.push(ld.Letter) 
      } 
    });
    
    var itemData = this.props.ItemData.filter(
      item => selectedLetters.includes(
        this.props.GameType === GameType.Letters ? 
          item.Letter : 
          item.Sound)
    );

    this.setState({ SelectedItems: itemData });
    
  }

  playSound(audioUrl: string) {
    var audio = new Audio(audioUrl);
    audio.play();
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.SelectedItems.map(item => (
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