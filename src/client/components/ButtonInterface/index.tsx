/* @flow */

import React from "react";

// import styles from './styles.scss';

type Props = { actions: any; ws: any };

export default ({ actions }: Props) => (
  <div className="ButtonInterface">
    <h4>Button Interface</h4>
    <button onClick={() => actions.pingCore()}>Ping Core</button>
    <br />
    <button onClick={() => actions.redisWrite()}>Write to Redis</button>
    <br />
    <button onClick={() => actions.redisRead()}>Read from Redis</button>
    <br />
    <button onClick={() => actions.pingApiServer()}>Ping API Server</button>
    <br />
    <button onClick={() => actions.pingUnityMaster()}>Ping Unity Master</button>
    <br />
  </div>
);
