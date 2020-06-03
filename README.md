# Toddler Phonics Letter Game
A simple web app designed to teach toddlers their letters using phonics.  

Parents select objects from a predefined list that their child is familiar with and children are then presented with images and letters. The aim is for the child to select the corresponding first letter of the object out of a possible 3 choices.  

Hover over or tap the object to hear how it is spoken.  
Hover over or tap the letter to listen to its phonic pronunciation.  

The pronounciation of each letter is based on the phonics alphabet and can be found here:  
https://www.youtube.com/watch?v=Ki6onJrZA8o

## Project details and contribution guidelines
The project uses React with Typescript, and Tailwind CSS.  
To style components, please refer to Tailwind CSS documentation:  
https://tailwindcss.com/docs/

## Installation

Once cloned, navigate to the directory and run:  
`npm install`

You will need to provide a secret.ts file that will contain a Google Client ID which is required for the login authentication.
Create a file in ./src called `secret.ts`
Populate it with the following:
```
export default {
    Google: {      
      CLIENT_ID: "YOUR_CLIENT_ID",
      CLIENT_SECRET: "NOT_REQUIRED_CURRENTLY"
    }
}
```

Then, simply run:  
`npm run start`
