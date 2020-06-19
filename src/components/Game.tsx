import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { ILetterData, IItemData, LanguageSelection, GameType, Page } from '../interfaces';
import Letter from './Letter';
import Modal from './Modal';
import PlayAgainModal from './PlayAgainModal';

interface IGameProps {
  LetterData: ILetterData[];
  Alphabet: ILetterData[];
  ItemData: IItemData[];
  LanguageSelection: LanguageSelection;
  GameType: GameType;
  RandomizeArray: Function;
  SetPage: Function;
}

interface IGameState { 
  SelectedItems: IItemData[];
  LetterSelection: ILetterData[];
  CorrectAnswer: ILetterData;
  SelectedAnswer: ILetterData;
  ShowModal: boolean;
  ModalTitleText: string;
  ModalText: string;
  ModalNeedsCancel: boolean;
  ModalNextText: string;
  Question: number;
  Score: number;
  MouseOverImage: boolean;
  Win: boolean;
  ShowEndGameModal: boolean;
}

const EMPTY_LETTER_DATA_ARRAY: ILetterData[] = [];

const EMPTY_LETTER_DATA: ILetterData = {
  Letter: '', 
  IsSelected: false,
  Set: 0,
  AmericanAudioUrl: '', 
  BritishAudioUrl: '',
};

/**
 * Displays the list of items corresponding to the phonics/letters the user has selected
*/
export default class Game extends React.PureComponent<IGameProps, IGameState> {
  readonly state = {
    SelectedItems: this.props.ItemData,
    LetterSelection: EMPTY_LETTER_DATA_ARRAY,
    CorrectAnswer: EMPTY_LETTER_DATA,
    SelectedAnswer: EMPTY_LETTER_DATA,
    ShowModal: false,
    ModalTitleText: '',
    ModalText: '',
    ModalNeedsCancel: true,
    ModalNextText: 'Next',
    Question: 1,
    Score: 0,
    MouseOverImage: false,
    Win: false,
    ShowEndGameModal: false,
  }

  componentDidMount = () => {
    this.props.SetPage(Page.Game);
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

  // When an item is selected, ensure no other items are selected at the same time.
  // Set the state of Selected Item to most recently selected item.
  onSelected = (letterData: ILetterData) => {
    let selectedItems = document.getElementsByClassName('letter-div');
    for (let index = 0; index < selectedItems.length; index++) {
      const element = selectedItems[index];
      element.classList.remove('letter-selected')
    }

    document.getElementById(letterData.Letter)?.classList.add('letter-selected');
    
    this.setState({ SelectedAnswer: letterData });
  }

  // Determine if the selection was correct and display the corresponding Modal
  onNext = () => {
    var win = false;
    if (this.state.SelectedAnswer === this.state.CorrectAnswer)
      win = true;
    this.setState({ 
      ShowModal: !win, 
      ModalTitleText: 'Sorry, wrong answer', 
      ModalText: 'Feel free to try again or skip to the next question', 
      ModalNeedsCancel: !win, 
      ModalNextText: 'Skip',
      Score: win ? this.state.Score+1 : this.state.Score,
      Win: win});
    if (win) {
      setTimeout(() => {
        this.setState({Win: false}); 
        this.nextImage();
      }, 1000);
    }
  }

  nextImage = () => {
    if (this.state.Question < 5) {
      // if we reach the end of the selection, randomize the list again with the selected options
      // and set the new correct answer.
      if (this.state.SelectedItems.length === 1) {
        this.setState({ SelectedItems: this.props.RandomizeArray(this.props.ItemData), ShowModal: false, Question: this.state.Question+1 }, () => 
          this.setCorrectAnswer());
      } else {
        // Remove the first item in the list so it displays the next image
        // and sets the new correct answer.
        var selectedItemsLessFirst = this.state.SelectedItems.filter(item => item !== this.state.SelectedItems[0]);
        this.setState({ SelectedItems: selectedItemsLessFirst, ShowModal: false, Question: this.state.Question+1 }, () => 
          this.setCorrectAnswer());
      }

      // reset the selected states of all letters
      let selectedItems = document.getElementsByClassName('letter-div');
      for (let index = 0; index < selectedItems.length; index++) {
        const element = selectedItems[index];
        element.classList.remove('letter-selected')
      }
    } else {
      this.setState({ 
        ShowEndGameModal: true, 
        ModalText: 'Thanks for playing. You scored: ' + this.state.Score,
        Question: 0, 
        Score: 0
      });
    }
  }

  render() {
    if (this.state.SelectedItems.length === 0) {
      return (<div> </div>) 
    } else {
      return (
        <div className='w-4/5 md:w-3/5 mx-auto bg-yellow-500 rounded-lg p-4 mt-2 md:mt-10 shadow-2xl'>

          {/* Modals */}
          <Modal 
            ShowModal={this.state.ShowModal} 
            ModalCancelText='Try Again' 
            ModalConfirmText={this.state.ModalNextText} 
            ModalOnCancel={() => this.setState({ShowModal: false})} 
            ModalOnConfirm={() => {this.nextImage()}} 
            ModalTitle={this.state.ModalTitleText} 
            ModalText={this.state.ModalText}
            ModalNeedsCancel={this.state.ModalNeedsCancel} />
          <PlayAgainModal 
            ShowModal={this.state.ShowEndGameModal}
            ModalText={this.state.ModalText}
            SetPage={this.props.SetPage}
            ModalOnCancel={() => { this.setState({ShowEndGameModal: false}); this.nextImage(); }} />

          {/* Image */}
          <div className='text-center text-purple-700 font-bold md:text-xl'>What sound does the image below begin with?</div>
          <div className='mobile-image-tap text-center text-purple-700'>Tap image to listen</div>
          <div className='flex justify-center'>            
            <div className={`${this.state.MouseOverImage ? '' : 'hidden'} absolute self-center text-gray-900 text-lg md:text-2xl`}>Click to listen</div>
            <div className={`${this.state.Win ? 'opacity-100' : 'opacity-0'} p-4 duration-400 ease-in-out transform absolute self-center text-gray-900 text-lg md:text-2xl rounded-lg border-4 border-solid border-purple-700`}>
              Well done!
            </div>
            <img 
              id='game-image'
              className={`${this.state.MouseOverImage ? 'opacity-25' : ''} ${this.state.Win ? 'pointer-events-none opacity-0' : ''} transform duration-400 ease-in-out shadow-xl border-solid border-4 border-purple-700 mb-5 mt-5 duration-300 ease-in-out md:w-3/5`}
              onMouseOver={() => this.setState({ MouseOverImage: true })}
              onMouseLeave={() => this.setState({ MouseOverImage: false })}
              src={this.state.SelectedItems[0].ImageUrl} alt={this.state.SelectedItems[0].Item} 
              onClick={() => this.playSound(this.props.LanguageSelection === LanguageSelection.British ? this.state.SelectedItems[0].BritishAudioUrl : this.state.SelectedItems[0].AmericanAudioUrl)}/>
          </div>

          {/* Letters */}
          <div className='flex justify-center'>
            {this.state.LetterSelection.map(letter => (
              <li key={letter.Letter}>
                <Letter 
                  LetterData={letter}
                  LanguagePreference={this.props.LanguageSelection} 
                  PlayAudio={true} 
                  ApplyChanges={() => this.onSelected(letter)} />
              </li>
            ))}
          </div>
          <div className='md:w-3/5 mx-auto flex mt-2 justify-between items-center'>
            <div className='flex-row md:text-2xl'>
              <div> 
                Question: {this.state.Question}/5
              </div>
              <div>
                Score: {this.state.Score}/5
              </div>
            </div>

            {/* Scores and Next */}
            <div className='mt-2 text-purple-700 md:text-purple-600 hover:text-purple-700' onClick={() => this.onNext()}> 
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 480 480" fill="currentColor" className='h-16 md:h-24'>
                <g>
                  <g>
                    <path d="M461.248,194.736l-128-128c-24.928-24.96-65.568-24.96-90.496,0C230.656,78.8,224,94.896,224,111.984
                      s6.656,33.184,18.752,45.248l82.752,82.752l-82.752,82.752C230.656,334.832,224,350.896,224,367.984s6.656,33.152,18.752,45.248
                      c12.096,12.096,28.16,18.752,45.248,18.752s33.152-6.656,45.248-18.752l128-128C473.344,273.168,480,257.072,480,239.984
                      S473.344,206.8,461.248,194.736z M438.624,262.608l-128,128c-12.128,12.096-33.12,12.096-45.248,0
                      c-12.48-12.48-12.48-32.768,0-45.248l105.376-105.376L265.376,134.608c-6.048-6.048-9.376-14.08-9.376-22.624
                      s3.328-16.576,9.376-22.624c6.24-6.24,14.432-9.376,22.624-9.376c8.192,0,16.384,3.136,22.624,9.344l128,128
                      c6.048,6.08,9.376,14.112,9.376,22.656S444.672,256.56,438.624,262.608z"/>
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M237.248,194.736l-128-128c-24.928-24.96-65.568-24.96-90.496,0C6.656,78.8,0,94.896,0,111.984
                      s6.656,33.184,18.752,45.248l82.752,82.752l-82.752,82.752C6.656,334.832,0,350.896,0,367.984s6.656,33.152,18.752,45.248
                      c12.096,12.096,28.16,18.752,45.248,18.752s33.152-6.656,45.248-18.752l128-128C249.344,273.168,256,257.072,256,239.984
                      S249.344,206.8,237.248,194.736z M214.624,262.608l-128,128c-12.128,12.096-33.12,12.096-45.248,0
                      c-12.48-12.48-12.48-32.768,0-45.248l105.376-105.376L41.376,134.608C35.328,128.56,32,120.528,32,111.984
                      s3.328-16.576,9.376-22.624c6.24-6.24,14.432-9.376,22.624-9.376s16.384,3.136,22.624,9.344l128,128
                      c6.048,6.08,9.376,14.112,9.376,22.656S220.672,256.56,214.624,262.608z"/>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      )
    }
  }
}