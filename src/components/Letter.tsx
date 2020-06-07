import React from 'react';
import {ReactComponent as A} from '../images/a.svg';
import {ReactComponent as B} from '../images/b.svg';
import {ReactComponent as C} from '../images/c.svg';
import {ReactComponent as D} from '../images/d.svg';
import {ReactComponent as E} from '../images/e.svg';
import {ReactComponent as F} from '../images/f.svg';
import {ReactComponent as G} from '../images/g.svg';
import {ReactComponent as H} from '../images/h.svg';
import {ReactComponent as I} from '../images/i.svg';
import {ReactComponent as J} from '../images/j.svg';
import {ReactComponent as K} from '../images/k.svg';
import {ReactComponent as L} from '../images/l.svg';
import {ReactComponent as M} from '../images/m.svg';
import {ReactComponent as N} from '../images/n.svg';
import {ReactComponent as O} from '../images/o.svg';
import {ReactComponent as P} from '../images/p.svg';
import {ReactComponent as Q} from '../images/q.svg';
import {ReactComponent as R} from '../images/r.svg';
import {ReactComponent as S} from '../images/s.svg';
import {ReactComponent as T} from '../images/t.svg';
import {ReactComponent as U} from '../images/u.svg';
import {ReactComponent as V} from '../images/v.svg';
import {ReactComponent as W} from '../images/w.svg';
import {ReactComponent as X} from '../images/x.svg';
import {ReactComponent as Y} from '../images/y.svg';
import {ReactComponent as Z} from '../images/z.svg';
import { ILetterData, LanguageSelection } from '../interfaces';

var timer: NodeJS.Timeout;

interface ILetterProps {
  LetterData: ILetterData;
  Size: string;
  LanguagePreference: LanguageSelection;
  PlayAudio: boolean;
  ApplyChanges: Function;
}

/** 
 * Displays the corresponding .svg for the letter passed in the props
 * along with the selected height.
*/
export default class Letter extends React.PureComponent<ILetterProps, {}> {
  readonly state = {
    Selected: this.props.LetterData.IsSelected,
    AudioPlayed: false
  }

  // Render the letter based on the props
  renderLetter(letter: string = this.props.LetterData.Letter) {
    switch (letter) {
      case 'a':
        return <A/>
      case 'b':
        return <B/>
      case 'c':
        return <C/>
      case 'd':
        return <D/>
      case 'e':
        return <E/>
      case 'f':
        return <F/>
      case 'g':
        return <G/>
      case 'h':
        return <H/>
      case 'i':
        return <I/>
      case 'j':
        return <J/>
      case 'k':
        return <K/>
      case 'l':
        return <L/>
      case 'm':
        return <M/>
      case 'n':
        return <N/>
      case 'o':
        return <O/>
      case 'p':
        return <P/>
      case 'q':
        return <Q/>
      case 'r':
        return <R/>
      case 's':
        return <S/>
      case 't':
        return <T/>
      case 'u':
        return <U/>
      case 'v':
        return <V/>
      case 'w':
        return <W/>
      case 'x':
        return <X/>
      case 'y':
        return <Y/>
      case 'z':
        return <Z/>     
      default:
        return <div />
    }
  }

  // On long-click, plays the sound of the selected 
  // letter dependent upon language preference.
  playAudio = () => {
    if (!this.props.PlayAudio)
      return;
    var audio = new Audio(this.props.LanguagePreference === 
      LanguageSelection.British ? 
        this.props.LetterData.BritishAudioUrl : 
        this.props.LetterData.AmericanAudioUrl);    
    // Play the sound for 1 second (the sound clip is longer than this)
    // and then reset
    setTimeout(() => {
      audio.play();
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 1000);
    }, 1000);
    audio.play();
  }

  onSelected = () => {
    this.setState({Selected: !this.state.Selected}, () => {
      let letterToSave: ILetterData = {
        Letter: this.props.LetterData.Letter,
        Set: this.props.LetterData.Set,
        BritishAudioUrl: this.props.LetterData.BritishAudioUrl,
        AmericanAudioUrl: this.props.LetterData.AmericanAudioUrl,
        IsSelected: this.state.Selected
      }
      this.props.ApplyChanges(letterToSave);
    });
    return false;
  }

  // To detect a long click, we set a timeout on mousedown. 
  // If that timer reaches 1sec, we play the audio.
  onMouseDownEventRouter = () => {
      if (timer === undefined) timer = setTimeout(() => { 
        this.playAudio(); 
        this.setState({AudioPlayed: true}); 
      }, 500);
  }
  
  // On mouse up, we check to see if the timer was hit and
  // the audio was played. If not, that means it was a short-click
  // and so we select the letter.
  onMouseUp = () => {
    clearTimeout(timer);
    if(!this.state.AudioPlayed)
      this.onSelected();
    this.setState({AudioPlayed: false});
  }

  render() {
    // render single letter sounds only
    if (this.props.LetterData.Letter.length === 1) {
      return(
        <div id={this.props.LetterData.Letter} className={`letter-div ${this.state.Selected ? 'letter-selected' : ''}`} onClick={this.onSelected} onContextMenu={this.playAudio}>
          <div className={`${this.props.Size === 'small' ? 'letter-div-small' : 'letter-div-large'}`}>{this.renderLetter()}</div>
        </div>        
      )
    } else {      
      // indicates a duplicate of letters, such as 'oo' and 'OO'. One is prefixed with an '_' to identify them as separate and are styled differently
      if (this.props.LetterData.Letter.includes('_')) {
        return(
          <div>
            <div id={this.props.LetterData.Letter} className={`letter-div ${this.state.Selected ? 'letter-selected' : ''}`} onClick={this.onSelected} onContextMenu={this.playAudio}>
              <div className={`letter-rotated ${this.props.Size === 'small' ? 'letter-div-small' : 'letter-div-large'}`}>{this.renderLetter(this.props.LetterData.Letter.substr(1, 1).toLowerCase())}</div>
              <div className={`letter-rotated -ml-10 ${this.props.Size === 'small' ? 'letter-div-small' : 'letter-div-large'}`}>{this.renderLetter(this.props.LetterData.Letter.substr(2, 1).toLowerCase())}</div>
            </div>
          </div>
      )} else {
        // render two letter sounds such as 'ai' or 'th'
        return(      
          <div id={this.props.LetterData.Letter} className={`letter-div ${this.state.Selected ? 'letter-selected' : ''}`} onClick={this.onSelected} onContextMenu={this.playAudio}>
            <div className={`${this.props.Size === 'small' ? 'letter-div-small' : 'letter-div-large'}`}>{this.renderLetter(this.props.LetterData.Letter.substr(0, 1))}</div>
            <div className={`-ml-8 ${this.props.Size === 'small' ? 'letter-div-small' : 'letter-div-large'}`}>{this.renderLetter(this.props.LetterData.Letter.substr(1, 1))}</div>
          </div>                
        );
      }
    }
  }
}