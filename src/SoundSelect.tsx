import React from 'react';
import Sound from './components/Sound';

/** 
 * Displays all the letters so that the parent may select which to focus on
 * in the game. Selected letters are saved to web storage. 
*/
export default class LetterSelect extends React.PureComponent<{},{}> {
  render() {
    return(
      <div className='flex-col'>
        {SOUNDS.map(l => (
          <Sound key={l} Sound={l} Size='small' />
        ))}
      </div>
    )
  }
}

const SOUNDS: string[] = [
  's', 'a', 't', 'i', 'p', 'n', 
  'ck', 'e', 'h', 'r', 'm', 'd', 
  'g', 'o', 'u', 'l', 'f', 'b', 
  'ai', 'j', 'oa', 'v', 'oo', '_oo', 
  'y', 'x', 'ch', 'sh', 'th', '_th',
  'qu', 'ou', 'oi', 'ue', 'er', 'ar'
]