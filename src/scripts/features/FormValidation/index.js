// // @flow
//
// import 'bootstrap/dist/css/bootstrap.css';
//
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
//
// import FormValidation from './components/FormValidation';
// import Schema from './components/FormValidation/schema';
//
// import FormGroup from './components/FormGroup';
//
// // import Dump from './components/Dump';
//
// // const hello = <div className="box"><span className="span-class">Responsive</span><b>Hello</b> world !!!</div>;
//
//
// class App extends Component {
//
//     // constructor(props) {
//     //     super(props);
//     //     // (this: any).onBtnClick = this.onBtnClick.bind(this);
//     //     // (this: any).onFormChange = this.onFormChange.bind(this);
//     // }
//
//
//     render() {
//         return (
//             <div className="container">
//                 <div className="row mt-3">
//                     <div className="col">
//
//                         <FormValidation schema={Schema}>
//                             <FormGroup type="input" defaultValue="testInput" name="email" />
//                             <FormGroup defaultValue="22222 Input" name="email2" />
//
//                             <div className="form-control-feedback">feedback FormValidation Text</div>
//
//                             <button type="submit" className="btn btn-primary">Submit</button>
//                         </FormValidation>
//
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
//
// ReactDOM.render((
//     <App />
// ), document.getElementById('root'));
//
