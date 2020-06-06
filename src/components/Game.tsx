import React from 'react';
import { ILetterData, IItemData, LanguageSelection, GameType } from '../interfaces';

interface IGameProps {
  LetterData: ILetterData[];
  ItemData: IItemData[];
  LanguageSelection: LanguageSelection;
  GameType: GameType;
  RandomizeArray: Function;
}

interface IGameState { 
  SelectedItems: IItemData[];
}

/**
 * Displays the list of items corresponding to the phonics/letters the user has selected
*/
export default class Game extends React.PureComponent<IGameProps, IGameState> {
  readonly state = {
    SelectedItems: this.props.ItemData
  }

  playSound(audioUrl: string) {
    var audio = new Audio(audioUrl);
    audio.play();
  }

  onNext = () => {
    // if we reach the end of the selection, randomize the list again with the selected options
    if (this.state.SelectedItems.length === 1) {
      this.setState({ SelectedItems: this.props.RandomizeArray(this.props.ItemData)});
    } else {
      // Remove the first item in the list so it displays the next image
      var selectedItemsLessFirst = this.state.SelectedItems.filter(item => item !== this.state.SelectedItems[0]);
      this.setState({ SelectedItems: selectedItemsLessFirst });
    }
  } 

  render() {
    if (this.state.SelectedItems.length === 0) {
      return (<div> </div>) 
    } else {
      return (
        <div>
          <div>
            <img 
              src={this.state.SelectedItems[0].ImageUrl} alt={this.state.SelectedItems[0].Item} 
              onClick={() => this.playSound(this.props.LanguageSelection === LanguageSelection.British ? this.state.SelectedItems[0].BritishAudioUrl : this.state.SelectedItems[0].AmericanAudioUrl)}/>
          </div>
          <div> 
            <button onClick={() => this.onNext()}>Next</button>
          </div>
        </div>
      )
    }
  }
}