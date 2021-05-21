/* @flow */

import React from "react";

import { useEffect } from "react";
import { Observer, useLocalStore } from "mobx-react-lite";

import socket from "../../websocket/websocket";
import { worker, actions } from "../../websocket/worker";
import { ButtonInterface } from "../../components";

const Interface: React.FunctionComponent = () => {
  const store = useLocalStore(() => ({ data: [] as any }));
  // let heartbeat = {};

  useEffect(() => {
    socket.onmessage = (event: any) => {
      worker.updateStore(socket, event, store);
    };
  });

  const renderButtonInterface = () => (
    <ButtonInterface actions={actions} ws={socket} />
  );

  return (
    <>
      <Observer>
        {() => (
          <div>
            <div>{store.data}</div>
            {renderButtonInterface()}
          </div>
        )}
      </Observer>
    </>
  );
};

class SocketFeedStats extends React.Component {
  render() {
    return <Interface />;
  }
}

export default SocketFeedStats;
