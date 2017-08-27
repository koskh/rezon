// @flow
import * as React from 'react';

import FormGroup from '../../../../../components/FormGroup';


class CustomFormGroup extends FormGroup {
    render(): React.Element<any> {
        const { id, type, name, defaultValue, className, validationState, feedbackText } = this.props;

        const validationStateClass: string = '';// (validationState && stateClasses[validationState]) || '';

        return (
            <div className={validationStateClass}>
                <label htmlFor={id} className="sr-only">Email address</label>
                <input id={id} name={name} type={type} className={className} defaultValue={defaultValue} onChange={this.onChange} />
            </div>
        );
    }
}

export default CustomFormGroup;

