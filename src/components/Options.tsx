import React from 'react';
import { LanguageSelection, GameType } from '../interfaces';

interface IOptionsProps {
    OnLanguageSave: Function;
    OnGameTypeSave: Function;
    LanguageSelection: LanguageSelection;
    GameTypeSelection: GameType;
}

export default class Options extends React.PureComponent<IOptionsProps, {}> {
    render() {
        return(
            <div>
                <div className='mb-4'>
                    <label className='mr-6'>Select Language:</label>
                    <select id='language' name='language' onChange={(e) => this.props.OnLanguageSave(e.target.value)} value={this.props.LanguageSelection}>
                        <option value={0}>British</option>
                        <option value={1}>American</option>
                    </select>
                </div>       
                <div>
                    {/* Disable select game type until after MVP */}
                    {/* <label className='mr-6'>Select Game Type:</label>
                    <select id='game-type' name='game-type' onChange={(e) => this.props.OnGameTypeSave(e.target.value)} value={this.props.GameTypeSelection}>
                        <option value={0}>Phonics</option>
                        <option value={1}>Letters</option>
                    </select> */}
                </div>                                         
            </div>
        )
    }
}