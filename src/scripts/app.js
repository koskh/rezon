/* @flow */

//eslint-disable-next-line
// import '!style-loader!css-loader!flexboxgrid'; // global CSS styles

import React, { Component } from 'react';
import ReactDOM from 'react-dom';



class App extends Component {
    // constructor(props) {
    //     super(props);
    //     // this.onBtnClick = this.onBtnClick.bind(this);
    //     // const storage: ?string = localStorage.getItem('data');
    //     // let data: Array<Object> = [{}];
    //     // if (storage) {
    //     //     data = JSON.parse(storage);
    //     //     console.log(data);
    //     // }
    // }


    // onBtnClick(e) {
    //     // debugger;
    //     console.log('!!! ', e.target.value);
    // }

    // onTextareaChange(e: Event) {
    //     const target = ((e.target: any): HTMLInputElement);
    //     console.log('@@@@ @@@@', target.value);
    // }

    render() {
        // console.log('json', json);
        // console.log('json.number', json.number);

        return (
          <div className="app">
              Hello world !!!
          </div>

        );
    }
}

ReactDOM.render((
  <App />
), document.getElementById('root'));
