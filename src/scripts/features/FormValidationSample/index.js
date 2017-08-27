// @flow

import * as React from 'react';

import FormValidation from '../../components/FormValidation';
import FormGroup from '../../components/FormGroup';

import Schema from './schema';

export default class Home extends React.Component<*> {
    componentWillMount() {
        document.title = 'FormValidationSample · Пример валидационной формы';
    }

    render() {
        return (
            <article>
                <h1>FormValidationSample · Пример валидационной формы</h1>

                <FormValidation id='testform' schema={Schema}>

                    <FormGroup defaultValue="testInput" isValidated={true} type="input" name="email" />
                    <FormGroup defaultValue="22222 Input" isValidated={true} name="email2" />

                </FormValidation>

                <button type="submit" form="testform" className="btn btn-primary">Submit</button>

            </article>
        );
    }
}
