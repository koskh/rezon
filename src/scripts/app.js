/* @flow */

//eslint-disable-next-line
import '!style-loader!css-loader!flexboxgrid'; // global CSS styles

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FormInput from './components/FormInput';

const hello = <div className="box"><span className="span-class">Responsive</span><b>Hello</b> world !!!</div>;

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
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
              {hello}
            </div>
            <FormInput type="input" id="forminput-id" defaultValue="testInput" />
          </div>
        );
    }
}

ReactDOM.render((
  <App />
), document.getElementById('root'));
