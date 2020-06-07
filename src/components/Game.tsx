import React from 'react';
import { ILetterData, IItemData, LanguageSelection, GameType } from '../interfaces';
import Letter from './Letter';

interface IGameProps {
  LetterData: ILetterData[];
  Alphabet: ILetterData[];
  ItemData: IItemData[];
  LanguageSelection: LanguageSelection;
  GameType: GameType;
  RandomizeArray: Function;
}

interface IGameState { 
  SelectedItems: IItemData[];
  LetterSelection: ILetterData[];
  CorrectAnswer: ILetterData;
  SelectedAnswer: ILetterData;
}

const EMPTY_LETTER_DATA_ARRAY: ILetterData[] = [];

const EMPTY_LETTER_DATA: ILetterData = {
  Letter: '', 
  IsSelected: false,
  Set: 0,
  AmericanAudioUrl: '', 
  BritishAudioUrl: ''
}

/**
 * Displays the list of items corresponding to the phonics/letters the user has selected
*/
export default class Game extends React.PureComponent<IGameProps, IGameState> {
  readonly state = {
    SelectedItems: this.props.ItemData,
    LetterSelection: EMPTY_LETTER_DATA_ARRAY,
    CorrectAnswer: EMPTY_LETTER_DATA,
    SelectedAnswer: EMPTY_LETTER_DATA
  }

  componentDidMount = () => {
    this.setCorrectAnswer();
  }

  // The first item in selected items will map to the correct answer
  // as that's what we are displaying on screen.
  setCorrectAnswer = () => {
    let correctAnswer = this.props.Alphabet.find(a => a.Letter === this.state.SelectedItems[0].Letter);
    if (correctAnswer !== undefined)
      this.setState({ CorrectAnswer: correctAnswer }, () => this.setState({ LetterSelection: this.defineLettersToSelect() }));
  }

  playSound(audioUrl: string) {
    var audio = new Audio(audioUrl);
    audio.play();
  }

  /**
  * A selection of three letters make up the choices to select from.
  * One of those letters is the correct answer (previously defined).
  * The other two are randomly selected from the alphabet. 
  * This new array of 3 letters is then randomized and presented to the user. 
  */
  defineLettersToSelect = (): ILetterData[] => {
    let arrayOfLettersToSelect = [...EMPTY_LETTER_DATA_ARRAY];
    arrayOfLettersToSelect.push(this.state.CorrectAnswer);
    let alphabetLessCorrectAnswer = this.props.Alphabet.filter(a => a.Letter !== this.state.CorrectAnswer.Letter);
    let randomAlphabet: ILetterData[] = this.props.RandomizeArray(alphabetLessCorrectAnswer);
    arrayOfLettersToSelect.push(randomAlphabet[0], randomAlphabet[1]);
    return this.props.RandomizeArray(arrayOfLettersToSelect);
  }

  onSelected = (letterData: ILetterData) => {
    // TODO: Unselect other answers and just leave this one selected (might need IDs and DOM manipulation here)
    this.setState({ SelectedAnswer: letterData });
  }

  onNext = () => {
    // TODO: Check if selected answer was correct answer.

    // if we reach the end of the selection, randomize the list again with the selected options
    // and set the new correct answer.
    if (this.state.SelectedItems.length === 1) {
      this.setState({ SelectedItems: this.props.RandomizeArray(this.props.ItemData)}, () => 
        this.setCorrectAnswer());
    } else {
      // Remove the first item in the list so it displays the next image
      // and sets the new correct answer.
      var selectedItemsLessFirst = this.state.SelectedItems.filter(item => item !== this.state.SelectedItems[0]);
      this.setState({ SelectedItems: selectedItemsLessFirst }, () => 
        this.setCorrectAnswer());
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
            {this.state.LetterSelection.map(letter => (
              <li key={letter.Letter}>
                <Letter 
                  LetterData={letter} 
                  Size='large' 
                  LanguagePreference={this.props.LanguageSelection} 
                  PlayAudio={true} 
                  ApplyChanges={() => this.onSelected(letter)} />
              </li>
            ))}
          </div>
          <div> 
            <button onClick={() => this.onNext()}>Next</button>
          </div>
        </div>
      )
    }
  }
}