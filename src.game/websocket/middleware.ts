import WebSocket from 'html5-websocket';

let ws: any;
let identifier: string;
const channel = 'client-dashboard';

export function emit(payload: any) {
  if (ws) {
    if (ws.readyState !== WebSocket.OPEN) throw new Error('Not connected');

    ws.send(JSON.stringify(payload));
  } else {
    console.log('Socket instance does not exist.');
  }
}

export const actions = {
  importXml: (file: string) => {
    emit({
      from: identifier,
      channel,
      action: 'import_xml_test',
      file
    });
  },
  pingCore: () => {
    console.log('pingCore');
    emit({
      from: identifier,
      channel,
      action: 'ping_core'
    });
  },
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
  redisWrite: () => {
    console.log('redisWrite');
    emit({
      from: identifier,
      channel,
      action: 'redis_write'
    });
  },
  redisRead: () => {
    console.log('redisRead');
    emit({
      from: identifier,
      channel,
      action: 'redis_read'
    });
  },
  requestSessionData: () => {
    emit({
      from: identifier,
      channel,
      action: 'request_session_data'
    });
  },
  restartMatch: (data: any) => {
    emit({
      from: identifier,
      channel,
      action: 'restart_match',
      data: {
        photon_app_id: data.photonAppId
      }
    });
  },
  retrieveTests: (photonAppId: string) => {
    emit({
      from: identifier,
      channel,
      action: 'retrieve_tests',
      data: {
        photon_app_id: photonAppId
      }
    });
  },
  retrieveXmlObject: (params: any) => {
    emit({
      from: identifier,
      channel,
      action: 'retrieve_xml_object',
      data: params
    });
  },
  retrieveUnitySessions: () => {
    emit({
      from: identifier,
      channel,
      action: 'retrieve_unity_sessions'
    });
  },
  startTest: (data: any) => {
    emit({
      from: identifier,
      channel,
      action: 'start_test',
      data: {
        photon_app_id: data.photonAppId,
        test_index: data.testIndex
      }
    });
  },
  saveXmlObject: (params: any) => {
    console.log('saveXmlObject', params);
    console.log(identifier);
    emit({
      from: identifier,
      channel,
      action: 'save_xml_object',
      data: params
    });
  }
};

function onCallback(dispatch: any, event: any) {
  const message = JSON.parse(event.data);
  console.log(message);

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
  }

  const hasHeartbeatProperty = message.hasOwnProperty.call(
    message,
    'heartbeat_callback'
  );

  if (hasHeartbeatProperty) {
    console.log('heartbeat_callback');
    dispatch({ type: 'WEBSOCKET:MESSAGE:HEARTBEAT', payload: event });
  }

  const hasResponseSessionDataProperty = message.hasOwnProperty.call(
    message,
    'response_session_data'
  );

  if (hasResponseSessionDataProperty) {
    dispatch({ type: 'WEBSOCKET:MESSAGE:HEARTBEAT', payload: event });
  }

  const hasRetrieveTestsCallbackProperty = message.hasOwnProperty.call(
    message,
    'retrieve_tests_callback'
  );

  if (hasRetrieveTestsCallbackProperty) {
    console.log('hasRetrieveTestsCallbackProperty');
    dispatch({ type: 'WEBSOCKET:RETRIEVE_TESTS:CALLBACK', payload: event });
  }

  const hasRetrieveUnitySessionsCallbackProperty = message.hasOwnProperty.call(
    message,
    'retrieve_unity_sessions_callback'
  );

  if (hasRetrieveUnitySessionsCallbackProperty) {
    console.log('hasRetrieveUnitySessionsCallbackProperty');
    dispatch({
      type: 'WEBSOCKET:RETRIEVE_UNITY_SESSIONS:CALLBACK',
      payload: event
    });
  }
  // ===========================================================================
  // XML FLOW
  const hasRetrieveXmlObjectCallbackProperty = message.hasOwnProperty.call(
    message,
    'retrieve_xml_object_callback'
  );

  if (hasRetrieveXmlObjectCallbackProperty) {
    console.log('hasRetrieveXmlObjectCallbackProperty');

    switch (message.action) {
      case 'get_test_names':
        dispatch({
          type: 'WEBSOCKET:GET_TEST_NAMES_XML:CALLBACK',
          payload: event
        });
        break;
      case 'get_single_test':
        dispatch({
          type: 'WEBSOCKET:GET_SINGLE_TEST_XML:CALLBACK',
          payload: event
        });
        break;
      case 'get_blueprint_names':
        dispatch({
          type: 'WEBSOCKET:GET_BLUEPRINT_NAMES_XML:CALLBACK',
          payload: event
        });
        break;
      case 'get_single_blueprint':
        dispatch({
          type: 'WEBSOCKET:GET_SINGLE_BLUEPRINT_XML:CALLBACK',
          payload: event
        });
        break;
      case 'get_sequence_names_bots':
        dispatch({
          type: 'WEBSOCKET:GET_SEQUENCE_NAMES_BOTS_XML:CALLBACK',
          payload: event
        });
        break;

      case 'get_sequence_names_npcs':
        dispatch({
          type: 'WEBSOCKET:GET_SEQUENCE_NAMES_NPCS_XML:CALLBACK',
          payload: event
        });
        break;

      case 'get_sequence_names_clusters':
        dispatch({
          type: 'WEBSOCKET:GET_SEQUENCE_NAMES_CLUSTERS_XML:CALLBACK',
          payload: event
        });
        break;

      case 'get_sequence_names_structures':
        dispatch({
          type: 'WEBSOCKET:GET_SEQUENCE_NAMES_STRUCTURES_XML:CALLBACK',
          payload: event
        });
        break;

      case 'get_profile_names_players':
        dispatch({
          type: 'WEBSOCKET:GET_PROFILE_NAMES_PLAYERS_XML:CALLBACK',
          payload: event
        });
        break;

      case 'get_profile_names_bots':
        dispatch({
          type: 'WEBSOCKET:GET_PROFILE_NAMES_BOTS_XML:CALLBACK',
          payload: event
        });
        break;

      case 'get_profile_names_npcs':
        dispatch({
          type: 'WEBSOCKET:GET_PROFILE_NAMES_NPCS_XML:CALLBACK',
          payload: event
        });
        break;

      case 'get_profile_names_clusters':
        dispatch({
          type: 'WEBSOCKET:GET_PROFILE_NAMES_CLUSTERS_XML:CALLBACK',
          payload: event
        });
        break;

      case 'get_profile_names_structures':
        dispatch({
          type: 'WEBSOCKET:GET_PROFILE_NAMES_STRUCTURES_XML:CALLBACK',
          payload: event
        });
        break;
      case 'get_single_bot_sequence':
        dispatch({
          type: 'WEBSOCKET:GET_SINGLE_BOT_SEQUENCE_XML:CALLBACK',
          payload: event
        });
        break;
      case 'get_single_npc_sequence':
        dispatch({
          type: 'WEBSOCKET:GET_SINGLE_NPC_SEQUENCE_XML:CALLBACK',
          payload: event
        });
        break;

      case 'get_single_cluster_sequence':
        dispatch({
          type: 'WEBSOCKET:GET_SINGLE_CLUSTER_SEQUENCE_XML:CALLBACK',
          payload: event
        });
        break;

      case 'get_single_structure_sequence':
        dispatch({
          type: 'WEBSOCKET:GET_SINGLE_STRUCTURE_SEQUENCE_XML:CALLBACK',
          payload: event
        });
        break;

      case 'get_single_player_profile':
        dispatch({
          type: 'WEBSOCKET:GET_SINGLE_PLAYER_PROFILE_XML:CALLBACK',
          payload: event
        });
        break;
      case 'get_single_bot_profile':
        dispatch({
          type: 'WEBSOCKET:GET_SINGLE_BOT_PROFILE_XML:CALLBACK',
          payload: event
        });
        break;
      case 'get_single_npc_profile':
        dispatch({
          type: 'WEBSOCKET:GET_SINGLE_NPC_PROFILE_XML:CALLBACK',
          payload: event
        });
        break;

      case 'get_single_cluster_profile':
        dispatch({
          type: 'WEBSOCKET:GET_SINGLE_CLUSTER_PROFILE_XML:CALLBACK',
          payload: event
        });
        break;

      case 'get_single_structure_profile':
        dispatch({
          type: 'WEBSOCKET:GET_SINGLE_STRUCTURE_PROFILE_XML:CALLBACK',
          payload: event
        });
        break;
      default:
        break;
    }
  }

  const hasSaveXmlObjectCallbackProperty = message.hasOwnProperty.call(
    message,
    'save_xml_object_callback'
  );

  if (hasSaveXmlObjectCallbackProperty) {
    console.log('hasSaveXmlObjectCallbackProperty');

    console.log(message);

    switch (message.payload.data.action) {
      case 'insert_sequence_into_test':
        actions.retrieveXmlObject({
          action: 'get_single_test',
          index: message.payload.data.data.testIndex
        });
        break;
      case 'insert_bot_into_bot_sequence':
        actions.retrieveXmlObject({
          action: 'get_single_bot_sequence',
          index: message.payload.data.data.sequenceIndex
        });
        break;
      case 'insert_npc_into_structure_sequence':
        actions.retrieveXmlObject({
          action: 'get_single_structure_sequence',
          index: message.payload.data.data.sequenceIndex
        });
        break;
      case 'remove_sequence_from_test':
        actions.retrieveXmlObject({
          action: 'get_single_test',
          index: message.payload.data.data.testIndex
        });
        break;
      case 'remove_bot_from_bot_sequence':
        actions.retrieveXmlObject({
          action: 'get_single_bot_sequence',
          index: message.payload.data.data.sequenceIndex
        });
        break;
      case 'remove_npc_from_structure_sequence':
        actions.retrieveXmlObject({
          action: 'get_single_structure_sequence',
          index: message.payload.data.data.sequenceIndex
        });
        break;
      case 'clone_test':
        actions.retrieveXmlObject({
          action: 'get_single_test',
          index: message.payload.data.data.testIndex
        });
        break;
      case 'clone_blueprint':
        actions.retrieveXmlObject({
          action: 'get_single_blueprint',
          index: message.payload.data.data.blueprintIndex
        });
        break;
      case 'clone_player_profile':
        actions.retrieveXmlObject({
          action: 'get_single_player_profile',
          index: message.payload.data.data.profileIndex
        });
        break;
      case 'clone_bot_profile':
        actions.retrieveXmlObject({
          action: 'get_single_bot_profile',
          index: message.payload.data.data.profileIndex
        });
        break;
      case 'clone_npc_profile':
        actions.retrieveXmlObject({
          action: 'get_single_npc_profile',
          index: message.payload.data.data.profileIndex
        });
        break;
      case 'clone_cluster_profile':
        actions.retrieveXmlObject({
          action: 'get_single_cluster_profile',
          index: message.payload.data.data.profileIndex
        });
        break;
      case 'clone_structure_profile':
        actions.retrieveXmlObject({
          action: 'get_single_structure_profile',
          index: message.payload.data.data.profileIndex
        });
        break;
      case 'clone_bot_sequence':
        actions.retrieveXmlObject({
          action: 'get_single_bot_sequence',
          index: message.payload.data.data.sequenceIndex
        });
        break;
      case 'clone_npc_sequence':
        actions.retrieveXmlObject({
          action: 'get_single_npc_sequence',
          index: message.payload.data.data.sequenceIndex
        });
        break;
      case 'clone_structure_sequence':
        actions.retrieveXmlObject({
          action: 'get_single_structure_sequence',
          index: message.payload.data.data.sequenceIndex
        });
        break;
      case 'remove_test':
        actions.retrieveXmlObject({
          action: 'get_single_test',
          index: 0
        });
        break;
      default:
        break;
    }
  }
  // XML FLOW
}

const middleware = (store: any) => (next: any) => (action: any) => {
  switch (action.type) {
    // User request to connect
    case 'WEBSOCKET:CONNECT':
      // Configure the object
      console.log('WEBSOCKET:CONNECT');

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
        onCallback(store.dispatch, event);
      };
      break;

    // User request to send a message
    case 'WEBSOCKET:SEND':
      ws.send(JSON.stringify(action.payload));
      break;

    // User request to disconnect
    case 'WEBSOCKET:DISCONNECT':
      console.log('WEBSOCKET:DISCONNECT');
      ws.close();
      break;

    default:
      break;
  }

  return next(action);
};

export default middleware;
