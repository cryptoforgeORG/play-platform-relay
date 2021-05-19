import WebSocket from 'html5-websocket';

let ws: any;
let identifier: string;
const channel = 'client-dashboard';

export function emit(payload: any) {
  if (ws.readyState !== WebSocket.OPEN) throw new Error('Not connected');
  console.log(identifier);
  ws.send(JSON.stringify(payload));
}

export const actions = {
  pingApiServer: () => {
    console.log('pingApiServer');
    emit({
      from: identifier,
      channel,
      action: 'ping_api_server'
    });
  },
  pingUnityMaster: () => {
    console.log('pingUnityMaster');
    emit({
      from: identifier,
      channel,
      action: 'ping_unity_master'
    });
  },
  info: () => {
    console.log('info');
    emit({
      from: identifier,
      channel,
      action: 'info_master_client'
    });
  },
  deploy: () => {
    console.log('deploy');
    emit({
      from: identifier,
      channel,
      action: 'deploy_master_client'
    });
  },
  inspect: () => {
    console.log('inspect');
    emit({
      from: identifier,
      channel,
      action: 'inspect_master_client'
    });
  },
  dump_log: () => {
    console.log('dump_log');
    emit({
      from: identifier,
      channel,
      action: 'dump_log_master_client'
    });
  },
  log: () => {
    console.log('log');
    emit({
      from: identifier,
      channel,
      action: 'log_master_client'
    });
  },
  start: () => {
    console.log('start');
    emit({
      from: identifier,
      channel,
      action: 'start_master_client'
    });
  },
  stop: () => {
    console.log('stop');
    emit({
      from: identifier,
      channel,
      action: 'stop_master_client'
    });
  }
};

function onCallback(dispatch: any, event: any) {
  const message = JSON.parse(event.data);

  const hasIdentifierProperty = message.hasOwnProperty.call(
    message,
    'identifier'
  );

  if (hasIdentifierProperty) {
    ({ identifier } = message);

    emit({
      from: identifier,
      channel,
      action: 'subscribe'
    });
  }

  const hasCallbackProperty = message.hasOwnProperty.call(message, 'callback');

  if (hasCallbackProperty) {
    console.log('callback');

    dispatch({ type: 'WEBSOCKET:CALLBACK', payload: event });
  }

  const hasHeartbeatProperty = message.hasOwnProperty.call(
    message,
    'heartbeat'
  );

  if (hasHeartbeatProperty) {
    console.log('heartbeat');

    // const payload = JSON.parse(message.payload);
    console.log(event);

    dispatch({ type: 'WEBSOCKET:MESSAGE:HEARTBEAT', payload: event });
  }
}

const middleware = (store: any) => (next: any) => (action: any) => {
  switch (action.type) {
    // User request to connect
    case 'WEBSOCKET:CONNECT':
      // Configure the object
      console.log('WEBSOCKET:CONNECT');
      console.log(action.payload.url);

      ws = new WebSocket(action.payload.url);

      // Attach the callbacks
      ws.onopen = () => {
        console.log('onopen');
        emit({
          action: 'join'
        });
        store.dispatch({ type: 'WEBSOCKET:OPEN' });
      };
      ws.onclose = (event: any) =>
        store.dispatch({ type: 'WEBSOCKET:CLOSE', payload: event });
      ws.onmessage = (event: any) => {
        console.log('onmessage');

        onCallback(store.dispatch, event);
      };
      break;

    // User request to send a message
    case 'WEBSOCKET:SEND':
      ws.send(JSON.stringify(action.payload));
      break;

    // User request to disconnect
    case 'WEBSOCKET:DISCONNECT':
      ws.close();
      break;

    default:
      break;
  }

  return next(action);
};

export default middleware;
