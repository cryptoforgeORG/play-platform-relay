import WebSocket from "html5-websocket";
import _ from "lodash";

let channel = "client-dashboard";
let identifier = "";

export const worker = {
  updateStore: (ws: any, event: MessageEvent, store: any) => {
    const message: any = JSON.parse(event.data);

    console.log(message);

    const hasIdentifierProperty = message.hasOwnProperty.call(
      message,
      "identifier"
    );

    if (hasIdentifierProperty) {
      ({ identifier } = message);

      emit(ws, {
        action: "subscribe",
      });
    }

    const hasCallbackProperty = message.hasOwnProperty.call(
      message,
      "callback"
    );

    if (hasCallbackProperty) {
      console.log("callback");
      store.data = message.data;
    }
  },
};

export const emit = (ws: any, payload: any) => {
  if (ws) {
    if (ws.readyState !== WebSocket.OPEN) throw new Error("Not connected");

    payload["from"] = identifier;
    payload["channel"] = channel;

    ws.send(JSON.stringify(payload));
  } else {
    console.log("Socket instance does not exist.");
  }
};

export const actions = {
  info: (ws: any) => {
    console.log("info");
    emit(ws, {
      action: "info_master_client",
    });
  },
  deploy: (ws: any) => {
    console.log("deploy");
    emit(ws, {
      action: "deploy_master_client",
    });
  },
  inspect: (ws: any) => {
    console.log("inspect");
    emit(ws, {
      action: "inspect_master_client",
    });
  },
  dump_log: (ws: any) => {
    console.log("dump_log");
    emit(ws, {
      action: "dump_log_master_client",
    });
  },
  log: (ws: any) => {
    console.log("log");
    emit(ws, {
      action: "log_master_client",
    });
  },
  start: (ws: any) => {
    console.log("start");
    emit(ws, {
      action: "start_master_client",
    });
  },
  stop: (ws: any) => {
    console.log("stop");
    emit(ws, {
      action: "stop_master_client",
    });
  },
};
