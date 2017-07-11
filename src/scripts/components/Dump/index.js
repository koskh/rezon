// @flow

import React from 'react';

import styles from './index.pcss';

type Props = {
    name?: string,
    children?: React.Children
}

type DefaultProps = {
    name: ?string,
    children: React.Children
};

const defaultProps: DefaultProps = {
    name: null,
    children: null
};

const Dump = (props: Props) => {
    return (
      <div className={styles.dump} data-name={props.name}>{ props.children }</div>
    );
};

Dump.defaultProps = defaultProps;

export default Dump;
