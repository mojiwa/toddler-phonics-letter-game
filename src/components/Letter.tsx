import React from 'react';
import {ReactComponent as A} from '../images/a.svg';

interface ILetterProps {

}

interface ILetterState {

}

export default class Letter extends React.PureComponent<ILetterProps, ILetterState> {
  readonly state = {

  }

  render() {
    return (
      <div>
        <A />
      </div>
    );
  }
}