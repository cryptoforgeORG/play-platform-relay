import WebSocket from "html5-websocket";
import _ from "lodash";

let channel = "client-dashboard";
let identifier = "";

import camelcaseKeys from "camelcase-keys";

export const worker = {
  updateStore: (ws: any, event: MessageEvent, store: any) => {
    const message: any = JSON.parse(event.data);

    // console.log(message);

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
    }

    const hasHeartbeatProperty = message.hasOwnProperty.call(
      message,
      "heartbeat_callback"
    );

    if (hasHeartbeatProperty) {
      console.log("heartbeat_callback");
    }

    const hasResponseSessionDataProperty = message.hasOwnProperty.call(
      message,
      "response_session_data"
    );

    if (hasResponseSessionDataProperty) {
    }

    const hasRetrieveUnitySessionsCallbackProperty =
      message.hasOwnProperty.call(message, "retrieve_unity_sessions_callback");

    if (hasRetrieveUnitySessionsCallbackProperty) {
      console.log("hasRetrieveUnitySessionsCallbackProperty");
    }

    // CORE
    const hasSourceProperty = message.hasOwnProperty.call(message, "source");

    if (hasSourceProperty) {
      const { source } = message;

      if (source === "core") {
        console.log("core");
      }
    }

    const hasCoreRelayProperty = message.hasOwnProperty.call(
      message,
      "core_relay"
    );

    if (hasCoreRelayProperty) {
      // let match = findMatch(message.payload.matches) as any;
      // store.match = camelcaseKeys(match, { deep: true });
      store.matches = camelcaseKeys(message.payload.matches, { deep: true });
    }
    // CORE

    // XML
    const hasRetrieveXmlObjectCallbackProperty = message.hasOwnProperty.call(
      message,
      "retrieve_xml_object_callback"
    );

    if (hasRetrieveXmlObjectCallbackProperty) {
      console.log("hasRetrieveXmlObjectCallbackProperty");

      console.log("payload", message.payload);

      switch (message.action) {
        case "get_test_names":
          store.store_FormEditRule.testNames = message.payload.testNames;
          break;
        case "get_blueprint_names":
          store.store_FormEditBlueprint.blueprintNames =
            message.payload.blueprintNames;
          break;

        case "get_sequence_names_bots":
          store.store_FormEditBotSequence.sequenceNames =
            message.payload.sequenceNames;
          break;

        case "get_sequence_names_npcs":
          store.store_FormEditNpcSequence.sequenceNames =
            message.payload.sequenceNames;
          break;

        case "get_sequence_names_clusters":
          store.store_FormEditClusterSequence.sequenceNames =
            message.payload.sequenceNames;
          break;

        case "get_sequence_names_structures":
          store.store_FormEditStructureSequence.sequenceNames =
            message.payload.sequenceNames;
          break;

        case "get_profile_names_players":
          store.store_FormEditPlayerProfile.profileNames =
            message.payload.profileNames;
          break;

        case "get_profile_names_bots":
          store.store_FormEditBotProfile.profileNames =
            message.payload.profileNames;
          break;

        case "get_profile_names_npcs":
          store.store_FormEditNpcProfile.profileNames =
            message.payload.profileNames;
          break;

        case "get_profile_names_structures":
          store.store_FormEditStructureProfile.profileNames =
            message.payload.profileNames;
          break;

        case "get_profile_names_clusters":
          store.store_FormEditClusterProfile.profileNames =
            message.payload.profileNames;
          break;

        // Get Single
        case "get_single_test":
          store.store_FormEditRule.test = message.payload.test;
          break;

        case "get_single_blueprint":
          store.store_FormEditBlueprint.blueprint = message.payload.blueprint;
          break;

        case "get_single_bot_sequence":
          store.store_FormEditBotSequence.sequence = message.payload.sequence;
          break;
        case "get_single_npc_sequence":
          store.store_FormEditNpcSequence.sequence = message.payload.sequence;
          break;
        case "get_single_cluster_sequence":
          store.store_FormEditClusterSequence.sequence =
            message.payload.sequence;
          break;
        case "get_single_structure_sequence":
          store.store_FormEditStructureSequence.sequence =
            message.payload.sequence;
          break;

        case "get_single_player_profile":
          store.store_FormEditPlayerProfile.profile = message.payload.profile;
          break;
        case "get_single_bot_profile":
          store.store_FormEditBotProfile.profile = message.payload.profile;
          break;

        case "get_single_npc_profile":
          store.store_FormEditNpcProfile.profile = message.payload.profile;
          break;

        case "get_single_cluster_profile":
          store.store_FormEditClusterProfile.profile = message.payload.profile;
          break;

        case "get_single_structure_profile":
          store.store_FormEditStructureProfile.profile =
            message.payload.profile;
          break;
        default:
          break;
      }
    }

    const hasSaveXmlObjectCallbackProperty = message.hasOwnProperty.call(
      message,
      "save_xml_object_callback"
    );

    if (hasSaveXmlObjectCallbackProperty) {
      console.log("hasSaveXmlObjectCallbackProperty");

      console.log(message);

      switch (message.payload.data.action) {
        case "insert_sequence_into_test":
          actions.retrieveXmlObject(ws, {
            action: "get_single_test",
            index: message.payload.data.data.testIndex,
          });
          break;
        case "insert_bot_into_bot_sequence":
          actions.retrieveXmlObject(ws, {
            action: "get_single_bot_sequence",
            index: message.payload.data.data.sequenceIndex,
          });
          break;
        case "insert_npc_into_structure_sequence":
          actions.retrieveXmlObject(ws, {
            action: "get_single_structure_sequence",
            index: message.payload.data.data.sequenceIndex,
          });
          break;
        case "remove_sequence_from_test":
          actions.retrieveXmlObject(ws, {
            action: "get_single_test",
            index: message.payload.data.data.testIndex,
          });
          break;
        case "remove_bot_from_bot_sequence":
          actions.retrieveXmlObject(ws, {
            action: "get_single_bot_sequence",
            index: message.payload.data.data.sequenceIndex,
          });
          break;
        case "remove_npc_from_structure_sequence":
          actions.retrieveXmlObject(ws, {
            action: "get_single_structure_sequence",
            index: message.payload.data.data.sequenceIndex,
          });
          break;
        case "clone_test":
          actions.retrieveXmlObject(ws, {
            action: "get_single_test",
            index: message.payload.data.data.testIndex,
          });
          break;
        case "clone_blueprint":
          actions.retrieveXmlObject(ws, {
            action: "get_single_blueprint",
            index: message.payload.data.data.blueprintIndex,
          });
          break;
        case "clone_player_profile":
          actions.retrieveXmlObject(ws, {
            action: "get_single_player_profile",
            index: message.payload.data.data.profileIndex,
          });
          break;
        case "clone_bot_profile":
          actions.retrieveXmlObject(ws, {
            action: "get_single_bot_profile",
            index: message.payload.data.data.profileIndex,
          });
          break;
        case "clone_npc_profile":
          actions.retrieveXmlObject(ws, {
            action: "get_single_npc_profile",
            index: message.payload.data.data.profileIndex,
          });
          break;
        case "clone_cluster_profile":
          actions.retrieveXmlObject(ws, {
            action: "get_single_cluster_profile",
            index: message.payload.data.data.profileIndex,
          });
          break;
        case "clone_structure_profile":
          actions.retrieveXmlObject(ws, {
            action: "get_single_structure_profile",
            index: message.payload.data.data.profileIndex,
          });
          break;
        case "clone_bot_sequence":
          actions.retrieveXmlObject(ws, {
            action: "get_single_bot_sequence",
            index: message.payload.data.data.sequenceIndex,
          });
          break;
        case "clone_npc_sequence":
          actions.retrieveXmlObject(ws, {
            action: "get_single_npc_sequence",
            index: message.payload.data.data.sequenceIndex,
          });
          break;
        case "clone_structure_sequence":
          actions.retrieveXmlObject(ws, {
            action: "get_single_structure_sequence",
            index: message.payload.data.data.sequenceIndex,
          });
          break;
        case "remove_test":
          actions.retrieveXmlObject(ws, {
            action: "get_single_test",
            index: 0,
          });
          break;
        default:
          break;
      }
    }
    // XML
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
  importXml: (ws: any, file: any) => {
    emit(ws, {
      action: "import_xml_test",
      file,
    });
  },
  pingCore: (ws: any) => {
    console.log("pingCore");
    emit(ws, {
      action: "ping_core",
    });
  },
  pingApiServer: (ws: any) => {
    console.log("pingApiServer");
    emit(ws, {
      action: "ping_api_server",
    });
  },
  pingUnityMaster: (ws: any) => {
    console.log("pingUnityMaster");
    emit(ws, {
      action: "ping_unity_master",
    });
  },
  redisWrite: (ws: any) => {
    console.log("redisWrite");
    emit(ws, {
      action: "redis_write",
    });
  },
  redisRead: (ws: any) => {
    console.log("redisRead");
    emit(ws, {
      action: "redis_read",
    });
  },
  requestSessionData: (ws: any) => {
    emit(ws, {
      action: "request_session_data",
    });
  },
  restartMatch: (ws: any, data: any) => {
    emit(ws, {
      action: "restart_match",
      data: {
        photon_app_id: data.photonAppId,
      },
    });
  },
  retrieveTests: (ws: any, photonAppId: string) => {
    emit(ws, {
      action: "retrieve_tests",
      data: {
        photon_app_id: photonAppId,
      },
    });
  },
  retrieveXmlObject: (ws: any, params: any) => {
    emit(ws, {
      action: "retrieve_xml_object",
      data: params,
    });
  },
  retrieveUnitySessions: (ws: any) => {
    emit(ws, {
      action: "retrieve_unity_sessions",
    });
  },
  startTest: (ws: any, data: any) => {
    emit(ws, {
      action: "start_test",
      data: {
        photon_app_id: data.photonAppId,
        test_index: data.testIndex,
      },
    });
  },
  saveXmlObject: (ws: any, params: any) => {
    console.log("saveXmlObject", params);
    console.log(identifier);
    emit(ws, {
      action: "save_xml_object",
      data: params,
    });
  },
};
