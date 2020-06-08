/**
 * 
 * All phonics sounds are attributed to sets. When the data is
 * stored, it is done so with the set information so that it can
 * be grouped accordingly on the front-end.
 * 
 * @param Letter: Lowercase character of the letter selected
 * @param Set: Number of the set the letter belongs to
 */
export interface ILetterData {
    Letter: string;    
    Set: number;
    BritishAudioUrl: string;
    AmericanAudioUrl: string;
    IsSelected: boolean;
}

export interface IItemData {
    Item: string;
    Letter: string;
    Sound: string;
    BritishAudioUrl: string;
    AmericanAudioUrl: string;
    ImageUrl: string;
}

export enum LanguageSelection {
    British,
    American
}

export enum GameType {
    Phonics,
    Letters
}

export enum Page {
    Home,
    About,
    Phonics,
    Game,
    Options
}