import React from 'react';
import { LanguageSelection, GameType, Page } from '../interfaces';

interface IOptionsProps {
    OnLanguageSave: Function;
    OnGameTypeSave: Function;
    LanguageSelection: LanguageSelection;
    GameTypeSelection: GameType;
    SetPage: Function
}

export default class Options extends React.PureComponent<IOptionsProps, {}> {
    componentDidMount() {
        this.props.SetPage(Page.Options);
    }

    onLanguageSelectionChange = (e: any) => {       
        document.getElementById('options-save-message')?.classList.add('opacity-100');        
        setTimeout(() => {
            document.getElementById('options-save-message')?.classList.remove('opacity-100');
        }, 1000);                 
        this.props.OnLanguageSave(e.target.value);        
    }

    render() {
        return(
            <div className='w-4/5 md:w-3/5 flex justify-between mx-auto bg-yellow-500 rounded-lg p-4 mt-2 md:mt-10 shadow-2xl text-purple-700 font-bold'>
                <div className='flex-row'>
                    <div className='mb-4'>
                        <label className='mr-6'>Select Language:</label>
                        <select id='language' name='language' onChange={(e) => this.onLanguageSelectionChange(e)} value={this.props.LanguageSelection}>
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
                <div id='options-save-message' className='mr-8 font-normal duration-1000 ease-out opacity-0'>Saved...</div>
            </div>
        )
    }
}