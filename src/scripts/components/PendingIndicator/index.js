// @flow

import React from 'react';

import Indicator from './_components/Indicator';

import styles from './index.pcss';

type Props = {
    pending: boolean,
    className?: string,
    errorMessage?: string,
    children?: React.Children
}

type DefaultProps = {
    className: string,
    errorMessage: string,
    children: React.Children
}

const defaultProps: DefaultProps = {
    className: '',
    errorMessage: '',
    children: null
};


const PendingIndicator = (props: Props) => {
    const { pending, className, children, errorMessage } = props;

    /* eslint-disable no-nested-ternary */
    return (
      <div className={styles.root}>
        <div>
          {pending ? <Indicator className={className} /> : (errorMessage || children)}
        </div>
      </div>
    );
    /* eslint-enable no-nested-ternary */
};

PendingIndicator.defaultProps = defaultProps;

export default PendingIndicator;

