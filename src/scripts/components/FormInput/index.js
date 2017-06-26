// @flow

import React from 'react';
// import PropTypes from 'prop-types';


const Input = (props: { id: string, defaultValue: any, children?: React.Children }): React.Element<any> => {
    const { id, defaultValue, children } = props;
    return (
      <div>
        <input id={id} defaultValue={defaultValue} />
        {children}
      </div>
    );
};
Input.defaultProps = {
    children: null
};


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
        text: Input,
        input: TestComponent
    };


type InputTypes = 'date' | 'suggest' | 'text' | 'input';

type DefaultProps = {
    type: InputTypes,
    id: string
};

type Props = {
    type: InputTypes,
    id: string,
    options?: any,
    defaultValue: any,
    children?: React.Children
};

// type State = {
//
// }


class FormInput extends React.Component<DefaultProps, Props, any> {
    static defaultProps = {
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
