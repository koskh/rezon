// @flow

import React from 'react';
// import PropTypes from 'prop-types';


type InputProps = {
    id?: string,
    defaultValue?: string,
    children?: React.Children
};

type InputDefaultProps = {
    id: string,
    defaultValue: any,
    children?: React.Children
};

type InputState = {
    value: string
};


class Input extends React.Component {
    props: InputProps;
    state: InputState;
    static defaultProps: InputDefaultProps = {
        id: 'xxx-xxx-xx',
        defaultValue: '',
        children: null
    };

    constructor(props) {
        super(props);
        this.state = {
            value: 'test'
        };

        (this: any).onChangeValueHandler = this.onChangeValueHandler.bind(this);
    }


    onChangeValueHandler({ target }: SyntheticInputEvent) {
        this.setState({ value: target.value });
    }

    getValue(): string {
        return this.state.value;
    }

    render() {
        const { id, defaultValue, children } = this.props;

        return (
          <div>
            <input id={id} defaultValue={defaultValue} onChange={this.onChangeValueHandler} />
            {children}
          </div>
        );
    }
}


class TestComponent extends React.Component {
    render() {
        return <div>Test Component</div>;
    }
}

//
const Components: {[key: string]: Function} =
    {
        date: TestComponent,
        suggest: TestComponent,
        text: TestComponent,
        input: Input
    };


type InputTypes = 'date' | 'suggest' | 'text' | 'input';

type DefaultProps = {
    type: InputTypes,
    id: string
};

type Props = {
    type: InputTypes,
    id?: string,
    options?: any,
    defaultValue?: any,
    children?: React.Children
};

// type State = {
//
// }


class FormInput extends React.Component {
    props: Props;
    // state: State;
    static defaultProps: DefaultProps = {
        type: 'input',
        id: 'xxx-xxx-xx'
    };

    getValue() {

    }

    render() {
        const { type, ...common } = this.props;
        const Comp = Components[type];

        return <Comp {...common} />;
    }
}

export default FormInput;
