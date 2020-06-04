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

  renderSwitch() {
    switch (this.props.Letter) {
      case 'A':
        return <A />
      case 'B':
        return <B/>
      case 'C':
        return <C/>
      case 'D':
        return <D/>
      case 'E':
        return <E/>
      case 'F':
        return <F/>
      case 'G':
        return <G/>
      case 'H':
        return <H/>
      case 'I':
        return <I/>
      case 'J':
        return <J/>
      case 'K':
        return <K/>
      case 'L':
        return <L/>
      case 'M':
        return <M/>
      case 'N':
        return <N/>
      case 'O':
        return <O/>
      case 'P':
        return <P/>
      case 'Q':
        return <Q/>
      case 'R':
        return <R/>
      case 'S':
        return <S/>
      case 'T':
        return <T/>
      case 'U':
        return <U/>
      case 'V':
        return <V/>
      case 'W':
        return <W/>
      case 'X':
        return <X/>
      case 'Y':
        return <Y/>
      case 'Z':
        return <Z/>
      default:
        return <div />
    }
  }

  render() {
    return (
      <div className={`letter-div ${this.props.Size === 'small' ? 'letter-div-small' : 'letter-div-large'}`}>
        {this.renderSwitch()}
      </div>
    );
  }
}