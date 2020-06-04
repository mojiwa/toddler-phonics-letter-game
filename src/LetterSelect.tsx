import React from 'react';
import Letter from './components/Letter';

export default class LetterSelect extends React.PureComponent<{},{}> {
  render() {
    return(
      <div className='flex-col'>
        {LETTERS.map(l => (
          <Letter key={l} Letter={l} Size='small' />
        ))}
      </div>
    )
  }
}

const LETTERS: string[] = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]