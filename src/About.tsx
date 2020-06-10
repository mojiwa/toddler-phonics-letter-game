import React from 'react';
import { Page } from './interfaces';

interface IAboutProps {
  SetPage: Function;
}

export default class About extends React.PureComponent<IAboutProps, {}> {
  componentDidMount() {
    this.props.SetPage(Page.About);
  }

  render() {
    return(
      <div className='w-4/5 md:w-3/5 mx-auto bg-yellow-500 rounded-lg p-4 md:mt-10 shadow-2xl'>
        Coming soon...
      </div>
    );
  }  
}