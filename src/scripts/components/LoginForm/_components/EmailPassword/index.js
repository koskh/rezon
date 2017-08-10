// @flow
import React from 'react';
// import cn from 'classnames';

import FormWidget from '../../../FormWidget';

import styles from './index.pcss';

// type Props = {
//     id?: string,
//     name?: ?string,
//     options?: any,
//     defaultValue?: any,
//     onChange: Function,
//     // validationState?: ?validationStates, // css класс раскрашив поля ввода
//     // feedbackText?: ?string, // текст ошибки, подсказки, инфо и тд.
//     onChange?: Function
//     // children?: React.Children
// };


class EmailPassword extends FormWidget {
    // props: Props;
    // state: State;
    // static defaultProps: Props = {
    //     id: '',
    //     name: null,
    //     options: null,
    //     defaultValue: null,
    //     // validationState: null,
    //     feedbackText: null,
    //     onChange: () => {
    //     },
    // };

    // constructor(props: any) {
    //     super(props);
    // this.state = {
    //     value: props.defaultValue
    // };
    // }

    onChange = ({ target }: SyntheticInputEvent) => {
        // this.props.onChange && this.props.onChange(this.props.name, target.value);
        // this.setState({ value: target.value });
        // console.log('EmailPAssword onChange: ', target.name, target.value);

        this.setState((prevState, props) => {
            const value = prevState.value;
            value[target.name] = target.value;
            return { value };
        },
        () => { // логика уведомления родительской формы
            this.props.onChange(this.props.name, this.state.value);
        });
    };

    // getValue() {
    //     return this.state.value;
    // }

    render(): React.Element<any> {
        // const { id, type, name, defaultValue, validationState, feedbackText } = this.props;

        // const validationStateClass: string = (validationState && stateClasses[validationState]) || '';


        return (
            <div className="form-group">
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="text" id="inputEmail" className={`form-control ${styles.text}`} placeholder="Email address" name="email" onChange={this.onChange} />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className={`form-control ${styles.password}`} placeholder="Password" name="password" onChange={this.onChange} />
            </div>
        );
    }
}

export default EmailPassword;

