// @flow

import React from 'react';
// import cn from 'classnames';

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
            <form className={styles['form-signin']}>
              <h2 className={styles['form-signin-heading']}>Please sign in</h2>
              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required={true} />
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type="password" id="inputPassword" className="form-control" placeholder="Password" required={true} />
              <div className="checkbox">
                <label className="checkbox" htmlFor="rememberMe">
                  <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember me
                        </label>
              </div>
              <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
          </div>
        );
    }
}

export default LoginForm;

