// @flow

import * as React from 'react';

import FormValidation from '../../components/FormValidation';
import { FormGroup } from '../../components/FormGroup';

import Schema from './schema';

import type FormModel from '../../components/FormValidation';

type State = {
    sendEnabled: boolean
}

export default class Home extends React.Component<*, State> {
    state: State = {
        sendEnabled: true
    };

    componentWillMount() {
        document.title = 'FormValidationSample · Пример валидационной формы';
    };

    onFormValidationChange = (model: FormModel, isValid: boolean) => {
        // debugger;
        console.log('Form isValid: ', isValid);
        this.setState({sendEnabled: isValid});
    };


    render() {
        const sendEnabled = this.state.sendEnabled;
        return (
            <article>
                <h1>FormValidationSample · Пример валидационной формы</h1>

                <FormValidation id="testform" schema={Schema} onChange={this.onFormValidationChange}>

                    <FormGroup defaultValue="testInput" isValidated={true} type="input" name="email" />
                    <FormGroup defaultValue="22222 Input" isValidated={true} name="email2" />

                </FormValidation>

                <button type="submit" form="testform" className="btn btn-primary" disabled={!sendEnabled} >Submit</button>

            </article>
        );
    };
}
