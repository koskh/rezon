// @flow

import React from 'react';
// import cn from 'classnames';

import EmailPassword from './_components/EmailPassword';

import styles from './index.pcss';

type Props = {
    // children?: React.Children
}

// const defaultProps: Props = {
//     // children: null
// };


class LoginForm extends React.Component {
    props: Props;
    // state: State;
    // static defaultProps: Props = {
    //     children: null
    // };

    // constructor(props: any) {
    //     super(props);
    // }


    render(): React.Element<any> {
        // const { children } = this.props;

        return (
          <div className={styles.wrapper}>
            <form className={`${styles['form-signin']} rounded`}>

              <h2 className={styles['form-signin-heading']}>Please sign in</h2>

              <EmailPassword />

              <div className="form-group">
                <div className="form-check">
                  <label className="form-check-label" htmlFor="rememberMe">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" />
                    Remember me
                  </label>
                </div>
              </div>

              <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={true}>Sign in</button>
            </form>
          </div>
        );
    }
}

export default LoginForm;

