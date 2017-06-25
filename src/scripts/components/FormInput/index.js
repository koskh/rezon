// @flow

import React from 'react';
import PropTypes from 'prop-types';

class FormInput extends React.Component {
    getValue() {}

    props: {
        type: 'date' | 'suggest' | 'text' | 'input',
        id: string,
        options: Array<mixed>,
        defaultValue: any
    };

    static defaultProps = {
        options: []
    };

    render() {
        console.log('props.options',  this.props.options.length);
        return null;
    }
}


export default FormInput;