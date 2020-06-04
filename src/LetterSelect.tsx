import React from 'react';
import Letter from './components/Letter';

/** 
 * Displays all the letters so that the parent may select which to focus on
 * in the game. Selected letters are saved to web storage. 
*/
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