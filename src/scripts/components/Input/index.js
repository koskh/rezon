// @flow

import React from 'react';
import classNames from 'classnames';


type Props = {
    // id?: string,
    className?: string,
    placeholder?: string,
    defaultValue?: string,
    onChange: Function
};

type DefaultProps = {
    // id: string,
    className: string,
    placeholder: string,
    defaultValue: string,
    onChange: Function
};


class Input extends React.Component {
    props: Props;

    static defaultProps: DefaultProps = {
        // id: '',
        className: '',
        placeholder: '',
        defaultValue: '',
        onChange: () => {
        },
    };

    render() {
        const { className, defaultValue, placeholder, onChange } = this.props;

        return (
          <input className={classNames('form-control', className)} defaultValue={defaultValue} placeholder={placeholder} onChange={onChange} />
        );
    }
}

export default Input;
