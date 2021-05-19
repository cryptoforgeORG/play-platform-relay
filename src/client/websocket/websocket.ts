import WebSocket from "html5-websocket";

let ws: any;
let channel = "client-dashboard";
let identifier = "";

export const emit = (payload: any) => {
  if (ws) {
    if (ws.readyState !== WebSocket.OPEN) throw new Error("Not connected");

    payload['from'] = identifier;
    payload['channel'] = channel;

    ws.send(JSON.stringify(payload));
  } else {
    console.log("Socket instance does not exist.");
  }
};

function connectSocket() {
  if (!ws) {
    ws = new WebSocket(`${location.protocol == "https:" ? "wss" : "ws"}://${window.location.host}`);
    // ws = new WebSocket("wss://core.playentertainment.online");

    ws.onopen = () => {
      console.log("onopen");

      emit({
        action: "join"
      });
    };
    ws.onclose = (event: any) => {
      console.log("onclose");
      console.log(event);
    };
    // ws.onmessage = event => {
    //   // worker.onCallback(ws, event, store);
    // };
  }
  return ws;
}

export default connectSocket();
