/* @flow */

import React from 'react';

type Props = { actions: any; socket: any };

export default ({ socket, actions }: Props) => (
  <div className="ButtonInterfaceRules">
    <h4>Import Data</h4>
    <button onClick={() => actions.importXml(socket, { action: 'tests' })}>
      Import Tests
    </button>
    <br />
  </div>
);
