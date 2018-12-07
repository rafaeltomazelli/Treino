import * as React from 'react';
import { Style } from '../src/App.style';


class Welcome extends React.Component {

  render() {
    return (
      <div style={Style.header} >
      <h1 style = {Style.header}>Welcome</h1>
      </div>
    );
  }
}

export default Welcome;
