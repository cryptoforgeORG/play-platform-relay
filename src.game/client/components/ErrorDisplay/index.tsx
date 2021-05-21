/* @flow */

import React from 'react';

// import styles from './styles.scss';

type Props = { error: any };

export default ({ error }: Props) => (
  <div className="Error">
    <p>Oops! {error.message}</p>
  </div>
);
