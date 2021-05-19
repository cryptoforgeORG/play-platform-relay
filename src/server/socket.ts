let socket: any;

const reporting = require("./reporting");

const WebSocket = require("ws");

const _ = require("lodash");

import { deploy } from "./controllers/deploy";

let sockets: any = {};
let sockets_game: any = {};
let sockets_dashboard: any = {};

let heartbeat: any;

var uuid = require('uuid');

export const socketEmit = (ws: any, payload: any) => ws.send(JSON.stringify(payload));

export const helpers = {
  initialize: (server: any) => {
    if (!socket) {
      const wss = new WebSocket.Server({
        server
      });

      wss.on("connection", function connection(ws: any, req: any) {
        ws.id = uuid.v4();
        console.log(ws.id);

        sockets[ws.id] = ws;

        ws.on("message", function (payload: any) {
          payload = JSON.parse(payload);

          helpers.parse(ws, payload);

          // console.log('payload : ', payload);
        });

        ws.on("error", (error: any) => {
          reporting.reportError(error);
        });

        ws.on("close", function () {
          delete sockets[ws.id];

          if (sockets_game.hasOwnProperty(ws.id)) {
            console.log("stopping heartbeat");

            clearInterval(heartbeat);
            console.log(heartbeat);

            delete sockets_game[ws.id];
          }

          if (sockets_dashboard.hasOwnProperty(ws.id)) {
            delete sockets_dashboard[ws.id];
          }
        });
      });

      socket = wss;
    }
    return socket;
  },
  parse: async (ws: any, payload: any) => {
    let id: string;
    let ws_to: any;
    let callback: any;

    // console.log(payload);

    switch (payload["action"]) {
      case "join":
        socketEmit(ws, {
          identifier: ws.id
        });
        break;

      case "subscribe":
        console.log("subscribe");
        console.log(payload["from"], payload["channel"]);

        if (payload["channel"] === "client-dashboard") {
          sockets_dashboard[ws.id] = ws;
          socketEmit(ws, {
            heartbeat: true
          });
        }

        break;

      case "update_dashboard":
        // console.log(payload["from"], payload["channel"], payload["data"]);

        // payload["data"] = JSON.parse(payload["data"]);

        _.forEach(sockets_dashboard, function (client: any, id: string) {
          console.log(id);

          if (client.readyState === WebSocket.OPEN) {
            socketEmit(client, {
              heartbeat: true,
              payload: payload["data"]
            });
          }
        });

        break;

      case "ping_dashboard":
        console.log("ping_dashboard", payload["from"], payload["channel"]);

        _.forEach(sockets_dashboard, function (client: any, id: string) {
          console.log(id);

          if (client.readyState === WebSocket.OPEN) {
            socketEmit(client, {
              callback: true
            });
          }
        });

        break;

      case "ping_api_server":
        console.log("ping_api_server", payload["from"], payload["channel"]);

        // broadcast to all sockets in the channel
        id = payload["from"];
        ws_to = sockets[id];

        socketEmit(ws_to, {
          callback: true
        });
        break;

      case "info_master_client":
        console.log("info_master_client", payload["from"], payload["channel"]);

        // broadcast to all sockets in the channel
        id = payload["from"];
        ws_to = sockets[id];

        callback = (data: any) => {
          socketEmit(ws_to, {
            callback: true,
            status: "in-progress",
            data: data
          });
        };

        await deploy.info(callback);

        socketEmit(ws_to, {
          callback: true,
          status: "started"
        });
        break;

      case "deploy_master_client":
        console.log(
          "deploy_master_client",
          payload["from"],
          payload["channel"]
        );

        // broadcast to all sockets in the channel
        id = payload["from"];
        ws_to = sockets[id];

        callback = (data: any) => {
          socketEmit(ws_to, {
            callback: true,
            status: "in-progress",
            data: data
          });
        };

        await deploy.deploy(callback);

        socketEmit(ws_to, {
          callback: true,
          status: "started"
        });
        break;

      case "inspect_master_client":
        console.log(
          "inspect_master_client",
          payload["from"],
          payload["channel"]
        );

        // broadcast to all sockets in the channel
        id = payload["from"];
        ws_to = sockets[id];

        callback = (data: any) => {
          socketEmit(ws_to, {
            callback: true,
            status: "in-progress",
            data: data
          });
        };

        await deploy.inspect(callback);

        socketEmit(ws_to, {
          callback: true,
          status: "started"
        });
        break;

      case "log_master_client":
        console.log("log_master_client", payload["from"], payload["channel"]);

        // broadcast to all sockets in the channel
        id = payload["from"];
        ws_to = sockets[id];

        callback = (data: any) => {
          socketEmit(ws_to, {
            callback: true,
            status: "in-progress",
            data: data
          });
        };

        await deploy.log(callback);

        socketEmit(ws_to, {
          callback: true,
          status: "started"
        });
        break;

      case "dump_log_master_client":
        console.log(
          "dump_log_master_client",
          payload["from"],
          payload["channel"]
        );

        // broadcast to all sockets in the channel
        id = payload["from"];
        ws_to = sockets[id];

        callback = (data: any) => {
          socketEmit(ws_to, {
            callback: true,
            status: "in-progress",
            data: data
          });
        };

        await deploy.dump_log(callback);

        socketEmit(ws_to, {
          callback: true,
          status: "started"
        });
        break;

      case "start_master_client":
        console.log("start_master_client", payload["from"], payload["channel"]);

        // broadcast to all sockets in the channel
        id = payload["from"];
        ws_to = sockets[id];

        callback = (data: any) => {
          socketEmit(ws_to, {
            callback: true,
            status: "in-progress",
            data: data
          });
        };

        await deploy.start(callback);

        socketEmit(ws_to, {
          callback: true,
          status: "started"
        });
        break;

      case "stop_master_client":
        console.log("stop_master_client", payload["from"], payload["channel"]);

        // broadcast to all sockets in the channel
        id = payload["from"];
        ws_to = sockets[id];

        callback = (data: any) => {
          socketEmit(ws_to, {
            callback: true,
            status: "in-progress",
            data: data
          });
        };

        await deploy.stop(callback);

        socketEmit(ws_to, {
          callback: true,
          status: "started"
        });
        break;
    }
  }
};

// module.exports = helpers;
