// @flow

import React from 'react';

import FormValidation from '../../components/FormValidation';
import FormGroup from '../../components/FormGroup';

import Schema from './schema';

export default class Home extends React.Component {
    componentWillMount() {
        document.title = 'FormValidationSample · Пример валидационной формы';
    }

    render() {
        return (
            <article>
                <h1>FormValidationSample · Пример валидационной формы</h1>

                <FormValidation schema={Schema}>

                    <FormGroup defaultValue="testInput" name="email" isValidated={true} type="input" />
                    <FormGroup defaultValue="22222 Input" isValidated={true} name="email2" />

                    <div className="form-control-feedback">feedback FormValidation Text</div>

                    <button type="submit" className="btn btn-primary">Submit</button>

                </FormValidation>

            </article>
        );
    }
}
