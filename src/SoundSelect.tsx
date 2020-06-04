import React from 'react';
import Letter from './components/Letter';
import { LetterAndSet } from './interfaces';

/** 
 * Displays all the letters so that the parent may select which to focus on
 * in the game. Selected letters are saved to web storage. 
*/
export default class LetterSelect extends React.PureComponent<{},{}> {  

  render() {
    return(
      <div>
        <ul>
          {LETTERS_AND_SETS.filter(las => las.Set === 1).map(las => (
            <li key={las.Letter}>
              <Letter Letter={las.Letter} Size='small'/>
            </li>
          ))}
        </ul>        
        <ul>
          {LETTERS_AND_SETS.filter(las => las.Set === 2).map(las => (
            <li key={las.Letter}>
              <Letter Letter={las.Letter} Size='small'/>
            </li>
          ))}
        </ul>
        <ul>
          {LETTERS_AND_SETS.filter(las => las.Set === 3).map(las => (
            <li key={las.Letter}>
              <Letter Letter={las.Letter} Size='small'/>
            </li>
          ))}
        </ul>
        <ul>
          {LETTERS_AND_SETS.filter(las => las.Set === 4).map(las => (
            <li key={las.Letter}>
              <Letter Letter={las.Letter} Size='small'/>
            </li>
          ))}
        </ul>
        <ul>
          {LETTERS_AND_SETS.filter(las => las.Set === 5).map(las => (
            <li key={las.Letter}>
              <Letter Letter={las.Letter} Size='small'/>
            </li>
          ))}
        </ul>
        <ul>
          {LETTERS_AND_SETS.filter(las => las.Set === 6).map(las => (
            <li key={las.Letter}>
              <Letter Letter={las.Letter} Size='small'/>
            </li>
          ))}
        </ul>        
      </div>
    )
  }
}

var LETTERS_AND_SETS: LetterAndSet[] = [
  { Letter: 's', Set: 1 }, { Letter: 'a', Set: 1 }, { Letter: 't', Set: 1 }, { Letter: 'i', Set: 1 }, { Letter: 'p', Set: 1 }, { Letter: 'n', Set: 1 },
  { Letter: 'ck', Set: 2 }, { Letter: 'e', Set: 2 }, { Letter: 'h', Set: 2 }, { Letter: 'r', Set: 2 }, { Letter: 'm', Set: 2 }, { Letter: 'd', Set: 2 },
  { Letter: 'g', Set: 3 }, { Letter: 'o', Set: 3 }, { Letter: 'u', Set: 3 }, { Letter: 'l', Set: 3 }, { Letter: 'f', Set: 3 }, { Letter: 'b', Set: 3 },
  { Letter: 'ai', Set: 4 }, { Letter: 'j', Set: 4 }, { Letter: 'oa', Set: 4 }, { Letter: 'v', Set: 4 }, { Letter: 'oo', Set: 4 }, { Letter: '_oo', Set: 4 },
  { Letter: 'y', Set: 5 }, { Letter: 'x', Set: 5 }, { Letter: 'ch', Set: 5 }, { Letter: 'sh', Set: 5 }, { Letter: 'th', Set: 5 }, { Letter: '_th', Set: 5 },  
  { Letter: 'qu', Set: 6 }, { Letter: 'ou', Set: 6 }, { Letter: 'oi', Set: 6 }, { Letter: 'ue', Set: 6 }, { Letter: 'er', Set: 6 }, { Letter: 'ar', Set: 6 },  
]