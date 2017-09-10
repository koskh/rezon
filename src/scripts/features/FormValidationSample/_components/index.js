// @flow

import _ from 'lodash';
import * as React from 'react';

import FormValidation from '../../../components/FormValidation/index';
import { FormGroup } from '../../../components/FormGroup/index';

import PendingIndicator from '../../../components/PendingIndicator';
import Spiner from '../../../components/Indicators/Spiner';

import Schema from './schema';

import type { FormModel } from '../../../components/FormValidation/index';
import type { ComponentReduxState } from '../store/reducer';

// type State = {

// }

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    formSampleComponent: ComponentReduxState // errors уходят <FormValidation />, error уходит  текущему компоненту
}

export default class FormValidationSample extends React.Component<Props, State> {
    props: Props;

    // state: State = {
    //
    // };

    formValidation = null; // обращаемся за валидностью данных формы
    sendButton = null; // дизейбли-енейблим кнопку отправки, не через state, т.к. ошибки сервреной валидации начинают перебивать обновление данных формы

    componentWillMount() {
        document.title = 'FormValidationSample · Пример валидационной формы';
    }

    componentWillUnmount() {
        this.props.cancelFetch();
    }


    onFormChange = (model: FormModel, isValid: boolean) => {
        // console.log('Form isValid: ', isValid);
        this._toggleSendButton(isValid);
    };

    onClick = () => {
        const form = this.formValidation || {};
        const isValid: boolean = _.isFunction(form.isValid) ? form.isValid() : true;
        if (!isValid)
            return;

        const { data } = _.isFunction(form.getModel) && form.getModel();
        this.props.makeFetch({ min: data.min, max: data.max });
    };

    _toggleSendButton(state: boolean) {
        this.sendButton && (this.sendButton.disabled = !state);
    }

    render() {
        const { isPending, isUpdated, data, error, errors } = this.props.formSampleComponent;
        return (
            <article>
                <h1>FormValidationSample · Пример валидационной формы</h1>

                <FormValidation
                    ref={formValidation => {this.formValidation = formValidation;}}
                    schema={Schema}
                    serverErrors={errors}
                    onChange={this.onFormChange}
                >
                    <FormGroup defaultValue="" isValidated={true} name="min" label="Min" />
                    <FormGroup defaultValue="" isValidated={true} name="max" label="Max" />
                </FormValidation>

                <button type="button" className="btn btn-primary" ref={button => { this.sendButton = button; }} disabled={isPending} onClick={this.onClick}>Submit</button>

                <PendingIndicator pending={isPending} />
                {isUpdated ? `Answer: ${data}` : ''}
                {error ? `Error: ${error}` : ''}

            </article>
        );
    }
}
