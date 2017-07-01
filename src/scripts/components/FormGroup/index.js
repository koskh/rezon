// @flow

import React from 'react';
import classNames from 'classnames';

// import PropTypes from 'prop-types';

//eslint-disable-next-line
import bsClasses from 'bootstrap/dist/css/bootstrap.css';

type InputProps = {
    id?: string,
    placeholder?: string,
    defaultValue?: string,
    onChange: Function
    // children?: React.Children
};

type InputDefaultProps = {
    id: string,
    placeholder: string,
    defaultValue: any,
    onChange: Function
    // children?: React.Children
};
//
type InputState = {
    value: string
};


class Input extends React.Component {
    props: InputProps;
    // state: InputState = {
    //     value: 'test'
    // };

    static defaultProps: InputDefaultProps = {
        id: '',
        placeholder: '',
        defaultValue: '',
        onChange: () => {
        },
        children: null
    };

    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     value: 'test'
    //     // };
    //
    //     // (this: any).onChangeValueHandler = this.onChangeValueHandler.bind(this);
    // }


    // onChangeValueHandler({ target }: SyntheticInputEvent) {
    //     this.setState({ value: target.value });
    // }

    // getValue(): string {
    //     return this.state.value;
    // }

    render() {
        const { id, defaultValue, placeholder, onChange } = this.props;

        return (
          <input id={id} className="form-control" defaultValue={defaultValue} placeholder={placeholder} onChange={onChange} />
        );
    }
}


class TestComponent extends React.Component {
    render() {
        return <div>Test Component</div>;
    }
}

//
// const Components: { [key: string]: Function } =
//     {
//         date: TestComponent,
//         suggest: TestComponent,
//         text: TestComponent,
//         input: Input
//     };


//

type InputTypes = 'date' | 'suggest' | 'text' | 'input';
type validationStates = 'success' | 'warning' | 'error' | 'info';

const stateClasses: { [key: validationStates]: string } = {
    success: 'has-success',
    warning: 'has-warning',
    error: 'has-danger',
    info: 'has-info'
};

type DefaultProps = {
    type: InputTypes,
    id: string,
    onChange: Function
};

type Props = {
    type: InputTypes,
    id?: string,
    options?: any,
    defaultValue?: any,
    onChange: Function,
    validationState?: validationStates,
    feedbackText?: string
    // children?: React.Children
};

type State = {
    value: string
}


class FormGroup extends React.Component {
    props: Props;
    state: State;
    static defaultProps: DefaultProps = {
        type: 'input',
        id: 'xxx-xxx-xx',
        onChange: () => {
        }
    };

    constructor(props: any) {
        super(props);
        this.state = {
            value: props.defaultValue
        };

        this.onChangeParentHandler = props.onChange;

        (this: any).onChange = this.onChange.bind(this);
    }

    onChangeParentHandler: Function = () => {
    };

    onChange({ target }: SyntheticInputEvent) {
        this.setState({ value: target.value });
        this.onChangeParentHandler(this.getValue());
    }

    getValue() {
        return this.state.value;
    }

    render() {
        const { type, id, defaultValue, validationState, feedbackText } = this.props;
        const validationStateClass: string = (validationState && stateClasses[validationState]) || '';

        // return <Comp {...common} />;
        return (
          <div className={classNames('form-group', 'row', validationStateClass)}>
            <label htmlFor={id} className="col-sm-2 col-form-label">Email address</label>
            <div className="col-sm-10">
              <Input id={id} defaultValue={defaultValue} placeholder="Placeholder...." onChange={this.onChange} />
              <div className="form-control-feedback">{feedbackText}</div>
              <small className="form-text text-muted">We will never share your email with anyone else.</small>
            </div>
          </div>
        );
    }
}

export default FormGroup;
