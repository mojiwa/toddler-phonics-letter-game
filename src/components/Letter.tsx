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


interface ILetterProps {
  Letter: string;
  Size: string;
}

/** 
 * Displays the corresponding .svg for the letter passed in the props
 * along with the selected height.
*/
export default class Letter extends React.PureComponent<ILetterProps, {}> {
  readonly state = {

  }

  renderSingleLetterSound(sound: string = this.props.Letter) {
    switch (sound) {
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

  playAudio() {    
    var audio = new Audio(`/sounds/british_english/${this.props.Letter}.mp3`);    
    setTimeout(() => {
      audio.play();
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 1000);
    }, 1000);
    audio.play();
  }

  render() {
    if (this.props.Letter.length === 1) {
      return(
        <div className={`letter-div w-1`} onClick={() => this.playAudio()} >
          <div className={`${this.props.Size === 'small' ? 'letter-div-small' : 'letter-div-large'}`}>{this.renderSingleLetterSound()}</div>
        </div>        
      )
    } else {      
      if (this.props.Letter.includes('_')) {
        return(
          <div>
            <div className='flex letter-div w-1' onClick={() => this.playAudio()}>
              <div className={`letter-rotated ${this.props.Size === 'small' ? 'letter-div-small' : 'letter-div-large'}`}>{this.renderSingleLetterSound(this.props.Letter.substr(1, 1).toLowerCase())}</div>
              <div className={`letter-rotated -ml-12 ${this.props.Size === 'small' ? 'letter-div-small' : 'letter-div-large'}`}>{this.renderSingleLetterSound(this.props.Letter.substr(2, 1).toLowerCase())}</div>
            </div>
          </div>
      )} else {
        return(      
          <div className='flex letter-div w-1' onClick={() => this.playAudio()}>
            <div className={`${this.props.Size === 'small' ? 'letter-div-small' : 'letter-div-large'}`}>{this.renderSingleLetterSound(this.props.Letter.substr(0, 1))}</div>
            <div className={`-ml-8 ${this.props.Size === 'small' ? 'letter-div-small' : 'letter-div-large'}`}>{this.renderSingleLetterSound(this.props.Letter.substr(1, 1))}</div>
          </div>                
        );
      }
    }
  }
}