// @flow
import React from 'react';
// import cn from 'classnames';

import styles from './index.pcss';


// type Props = {
//     children?: React.Children
// }
//
// const defaultProps: Props = {
//     children: null
// };


const EmailPassword = () => {
    return (
      <div>
          <div className="form-group">
              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input type="text" id="inputEmail" className={`form-control ${styles.text}`} placeholder="Email address"/>
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type="password" id="inputPassword" className={`form-control ${styles.password}`} placeholder="Password" />
          </div>
      </div>
    );
};

// EmailPassword.defaultProps = defaultProps;

export default EmailPassword;

