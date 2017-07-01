// @flow

//eslint-disable-next-line
// import '!style-loader!css-loader!bootstrap/dist/css/bootstrap-reboot.css'; // global CSS styles
//eslint-disable-next-line
// import '!style-loader!css-loader!bootstrap/dist/css/bootstrap-grid.css'; // global CSS styles
//eslint-disable-next-line
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css'; // global CSS styles

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FormGroup from './components/FormGroup';

const hello = <div className="box"><span className="span-class">Responsive</span><b>Hello</b> world !!!</div>;

type validationStates = 'success' | 'warning' | 'error' | 'info';

type State = {
    formGroupsStates: { [key: string]: validationStates }
}

class App extends Component {
    state: State = {
        formGroupsStates: {
            TextInput: 'success'
        }
    };

    constructor(props) {
        super(props);
        (this: any).onBtnClick = this.onBtnClick.bind(this);
        (this: any).onFormChange = this.onFormChange.bind(this);
        // const storage: ?string = localStorage.getItem('data');
        // let data: Array<Object> = [{}];
        // if (storage) {
        //     data = JSON.parse(storage);
        //     console.log(data);
        // }

        // this.state = {
        //     formGroupsStates:  {}
        // };
    }

    // components:any {};


    onBtnClick(e) {
        // debugger;
        console.log('Form send !!! ', e.target.value);
    }

    onFormChange(e) {
        // const target = ((e.target: any): HTMLInputElement);
        console.log('Form changed !!! Validation is  in progress');

        this.setState({
            formGroupsStates: {
                TextInput: 'error'
            }
        });
        // this.components.formGroup

        // debugger;
        // console.log('Validation is cucessuful');
    }

    render() {
        // console.log('json', json);
        // console.log('json.number', json.number);
        // const index = Math.floor(Math.random() * 3);
        // console.log('index ', index);

        // const type = (['date', 'suggest', 'text', 'input', 'test1', 'test1'])[index];

        const FormGroupId = 'TextInput';
        const formGroupsState: validationStates = this.state.formGroupsStates[FormGroupId];

        return (
          <div className="container">
            <div className="row">
              <div className="col">
                {hello}
              </div>

              <div className="w-100" />

              <div className="col">
                <form>
                  <FormGroup ref={(comp)=>{debugger;}}defaultValue="testInput" id={FormGroupId} validationState={formGroupsState} onChange={this.onFormChange} />
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

ReactDOM.render((
  <App />
), document.getElementById('root'));
