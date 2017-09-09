// @flow

import * as React from 'react';

import FormValidation from '../../../components/FormValidation/index';
import { FormGroup } from '../../../components/FormGroup/index';

import PendingIndicator from '../../../components/PendingIndicator';
import Spiner from '../../../components/Indicators/Spiner';

import Schema from './schema';

import type { FormModel } from '../../../components/FormValidation/index';

type State = {
    sendEnabled: boolean
}

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    formSampleComponent: any
}

export default class FormValidationSample extends React.Component<Props, State> {
    props: Props;

    state: State = {
        sendEnabled: true
    };

    formValidation = null;

    componentWillMount() {
        document.title = 'FormValidationSample · Пример валидационной формы';
    }

    componentWillUnmount() {
        this.props.cancelFetch();
    }

    onFormValidationChange = (model: FormModel, isValid: boolean) => {
        // debugger;
        // console.log('Form isValid: ', isValid);
        this.setState({ sendEnabled: isValid });
    };

    onClick = ({ target }: SyntheticInputEvent<*>) => {
        const isValid: boolean = this.formValidation ? this.formValidation.isValid() : true;
        // console.log('Form isValid: ', isValid);

        this.setState({ sendEnabled: isValid });

        const { data } = this.formValidation && this.formValidation.getModel() || {};
        isValid && this.props.makeFetch({ min: data.min, max: data.max });
    };

    render() {
        const sendEnabled = this.state.sendEnabled;
        const {isPending, data} = this.props.formSampleComponent;
        return (
            <article>
                <h1>FormValidationSample · Пример валидационной формы</h1>

                <FormValidation id="testform" ref={formValidation => { this.formValidation = formValidation; }} schema={Schema} onChange={this.onFormValidationChange} >
                    <FormGroup defaultValue="" isValidated={true} name="min" label="Min" />
                    <FormGroup defaultValue="" isValidated={true} name="max" label="Max" />
                </FormValidation>

                <button type="button" form="testform" className="btn btn-primary" disabled={!sendEnabled} onClick={this.onClick} >Submit</button>

                <PendingIndicator pending={isPending}> Answer: {data}</PendingIndicator>
            </article>
        );
    }
}
