// @flow

import React from 'react';

import Indicator from './_components/Indicator';

import styles from './index.pcss';

type Props = {
    pending: boolean,
    className?: string,
    message?: string,
    children?: React.Children
}

type DefaultProps = {
    className: string,
    message: string,
    children: React.Children
}

const defaultProps: DefaultProps = {
    className: '',
    message: '',
    children: null
};


const PendingIndicator = (props: Props): React.Element<any> => {
    const { pending, className, children, message } = props;

    /* eslint-disable no-nested-ternary */
    return (
      <div className={styles.root}>
        <div>
          {pending ? <Indicator className={className} /> : (message || children)}
        </div>
      </div>
    );
    /* eslint-enable no-nested-ternary */
};

PendingIndicator.defaultProps = defaultProps;

export default PendingIndicator;

