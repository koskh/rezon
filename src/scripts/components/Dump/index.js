import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.pcss';

const Dump = props => {
    return (
      <div className={styles.dump}>{ props.children }</div>
    );
};

Dump.propTypes = {
    children: PropTypes.node.isRequired
};

export default Dump;
