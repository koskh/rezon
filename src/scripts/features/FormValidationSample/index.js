// @flow

import * as React from 'react';

import FormValidation from '../../components/FormValidation';
import { FormGroup } from '../../components/FormGroup';

import Schema from './schema';

import type {FormModel} from '../../components/FormValidation';

type State = {
    sendEnabled: boolean
}

export default class Home extends React.Component<*, State> {
    state: State = {
        sendEnabled: true
    };

    formValidation = null;

    componentWillMount() {
        document.title = 'FormValidationSample · Пример валидационной формы';
    }

    onFormValidationChange = (model: FormModel, isValid: boolean) => {
        // debugger;
        console.log('Form isValid: ', isValid);
        this.setState({ sendEnabled: isValid });
    };

    onClick = () => {
        const isValid: boolean = this.formValidation ? this.formValidation.isValid() : true;
        // console.log('Form isValid: ', isValid);

        this.setState({ sendEnabled: isValid });
    };

    render() {
        const sendEnabled = this.state.sendEnabled;
        return (
            <article>
                <h1>FormValidationSample · Пример валидационной формы</h1>

                <FormValidation id="testform" ref={formValidation => { this.formValidation = formValidation; }} schema={Schema} onChange={this.onFormValidationChange} >

                    <FormGroup defaultValue="88" isValidated={true} type="input" name="email" />
                    <FormGroup defaultValue="fghfgfghf" isValidated={true} name="email2" />

                </FormValidation>

                <button type="submit" form="testform" className="btn btn-primary" disabled={!sendEnabled} onClick={this.onClick} >Submit</button>

            </article>
        );
    }
}
