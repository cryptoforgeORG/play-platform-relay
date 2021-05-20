/* @flow */

import React from 'react';

// import styles from './styles.scss';

type Props = { actions: any, ws: any };

export default ({ actions, ws }: Props) => (
  <div className="ButtonInterface">
    <h4>Button Interface</h4>
    <button onClick={() => actions.info(ws)}>Build Info</button>&nbsp;|&nbsp;
    <button
      onClick={() => {
        if (window.confirm('Are you sure?')) actions.deploy(ws);
      }}
    >
      Deploy
    </button>
    &nbsp;|&nbsp;
    <button onClick={() => actions.inspect(ws)}>Inspect</button>&nbsp;|&nbsp;
    <button onClick={() => actions.log(ws)}>Last Logline</button>&nbsp;|&nbsp;
    <br />
    <br />
    <button
      onClick={() => {
        if (window.confirm('Are you sure?')) actions.start(ws);
      }}
    >
      Start Client
    </button>
    &nbsp;|&nbsp;
    <button
      onClick={() => {
        if (window.confirm('Are you sure?')) actions.stop(ws);
      }}
    >
      Stop Clent
    </button>
    <br />
  </div>
);
