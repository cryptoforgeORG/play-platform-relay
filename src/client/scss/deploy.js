import axios from "axios";
const path = require("path");
const { spawn } = require("child_process");

import { builds } from "./builds";

import {
  TOKEN_OVERRIDE_PLAY_PLATFORM,
  TOKEN_UNITY_CLOUD,
  SERVER_ADDRESS_HYPEWIZARD,
  TOKEN_HYPEWIZARD_OVERRIDE,
  API_PLATFORM_ENDPOINT,
  UNITY_ORGANIZATION,
} from "../../config";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let child;

export const deploy = {
  deploy: async (callback) => {
    console.log("deploy");

    const script = path.dirname(__filename) + "/bash/" + "deploy.sh";

    // const buildUrl = `${API_PLATFORM_ENDPOINT}/api/builds?build_type=StandaloneLinux64`;

    let result = await builds.fetchByBuildType("StandaloneLinux64");

    let build = result[0];

    const { version, url, uses_unity_cloud_build } = build;

    if (uses_unity_cloud_build) {
      let PROJECT = "masters-of-conquest-master";

      const shareUrl = `https://build-api.cloud.unity3d.com/api/v1/orgs/${UNITY_ORGANIZATION}/projects/${PROJECT}/buildtargets/masters-of-conquest-headless/builds/${version}/share`;

      let response = await axios.get(shareUrl, {
        headers: { Authorization: `Basic ${TOKEN_UNITY_CLOUD}` },
      });

      if (response) {
        const detailsUrl = `https://build-api.cloud.unity3d.com/api/v1/shares/${response.data.shareid}`;

        response = await axios.get(detailsUrl, {
          headers: { Authorization: `Basic ${TOKEN_UNITY_CLOUD}` },
        });

        const url = response.data.links.download_primary.href;

        console.log("url", url);

        child = spawn("sh", [script, url]);

        child.stdout.on("data", function(data) {
          console.log("stdout: " + data);
          callback(`${data}`);
        });

        let i = 0;
        child.stderr.on("data", function(data) {
          // console.log('stderr: ' + data);

          if (i % 32 == 0) {
            if (data.includes("%")) {
              data = `${data}`.replace(".", "");
              callback(data);
            }
          }
          i += 1;
        });

        child.on("close", function(code) {
          console.log("child process exited with code " + code);
          callback(`${code}`);
        });
      }
    } else {
      console.log("url", url);

      child = spawn("sh", [script, url]);

      child.stdout.on("data", function(data) {
        console.log("stdout: " + data);
        callback(`${data}`);
      });

      let i = 0;
      child.stderr.on("data", function(data) {
        // console.log('stderr: ' + data);

        if (i % 32 == 0) {
          if (data.includes("%")) {
            data = `${data}`.replace(".", "");
            callback(data);
          }
        }
        i += 1;
      });

      child.on("close", function(code) {
        console.log("child process exited with code " + code);
        callback(`${code}`);
      });
    }

    return null;
  },
  deploy_without_callback: async () => {
    console.log("deploy_withouth_callback");

    // ALERT
    let message = `master-client-node MasterClientDeployEvent fired`;

    let url = SERVER_ADDRESS_HYPEWIZARD + "/api/alert_mobile_user";

    var params = {
      api_token: TOKEN_HYPEWIZARD_OVERRIDE,
      user_id: 2,
      message: message,
    };
    //

    // http://127.0.0.1:3000/api/kill_master_client_webhook?photon_app_id=fa5e21e8-531b-49fe-93ac-4915068825ea

    let result = await axios.get(url, {
      params: params,
    });

    result = await builds.fetchByBuildType("StandaloneLinux64");

    let build = result[0];
    const version = build.version;

    let buildTargetName = "masters-of-conquest-headless";

    let PROJECT = "masters-of-conquest-master";

    const shareUrl = `https://build-api.cloud.unity3d.com/api/v1/orgs/${UNITY_ORGANIZATION}/projects/${PROJECT}/buildtargets/${buildTargetName}/builds/${version}/share`;

    let response = await axios.get(shareUrl, {
      headers: { Authorization: `Basic ${TOKEN_UNITY_CLOUD}` },
    });

    const detailsUrl = `https://build-api.cloud.unity3d.com/api/v1/shares/${response.data.shareid}`;

    response = await axios.get(detailsUrl, {
      headers: { Authorization: `Basic ${TOKEN_UNITY_CLOUD}` },
    });

    url = response.data.links.artifacts[0].files[0].href;

    console.log(url);

    const script = path.dirname(__filename) + "/bash/" + "deploy.sh";

    let child = spawn("sh", [script, url], {
      detached: true,
      stdio: "inherit",
    });

    child.on("close", function(code) {
      console.log("child process exited with code " + code);
    });

    return null;
  },
  inspect: async (callback) => {
    console.log("inspect");

    const script = path.dirname(__filename) + "/bash/" + "inspect.sh";

    var child = spawn("sh", [script]);

    child.stdout.on("data", function(data) {
      console.log("stdout: " + data);

      callback("");
      callback(`${data}`);
    });

    child.stderr.on("data", function(data) {
      // console.log('stderr: ' + data);
      callback(`${data}`);
    });

    child.on("close", function(code) {
      console.log("child process exited with code " + code);
      // callback(`${code}`);
    });

    return null;
  },
  log: async (callback) => {
    console.log("log");

    const script = path.dirname(__filename) + "/bash/" + "log.sh";

    var child = spawn("sh", [script]);

    child.stdout.on("data", function(data) {
      console.log("stdout: " + data);
      callback(`${data}`);
    });

    child.stderr.on("data", function(data) {
      // console.log('stderr: ' + data);
      callback(`${data}`);
    });

    child.on("close", function(code) {
      console.log("child process exited with code " + code);
      // callback(`${code}`);
    });

    return null;
  },
  dump_log: async (callback) => {
    console.log("dump_log");

    const script = path.dirname(__filename) + "/bash/" + "dump_log.sh";

    var child = spawn("sh", [script]);

    child.stdout.on("data", function(data) {
      console.log("stdout: " + data);
      callback(`${data}`);
    });

    child.stderr.on("data", function(data) {
      // console.log('stderr: ' + data);
      callback(`${data}`);
    });

    child.on("close", function(code) {
      console.log("child process exited with code " + code);
      // callback(`${code}`);
    });

    return null;
  },
  info: async (callback) => {
    const buildUrl = `${API_PLATFORM_ENDPOINT}/api/builds?build_type=StandaloneLinux64`;

    axios
      .get(buildUrl, {
        headers: { "X-OverrideToken": `${TOKEN_OVERRIDE_PLAY_PLATFORM}` },
      })
      .then(function(response) {
        const version = response.data.data.builds[0].version;

        callback(`${version}`);
      })
      .catch(function(error) {
        console.log(error);
      });

    return null;
  },
  start: async (callback) => {
    console.log("start");

    const script = path.dirname(__filename) + "/bash/" + "start.sh";

    var child = spawn("sh", [script]);

    child.stdout.on("data", function(data) {
      console.log("stdout: " + data);

      callback("");
      callback(`${data}`);
    });

    child.stderr.on("data", function(data) {
      // console.log('stderr: ' + data);
      callback(`${data}`);
    });

    child.on("close", function(code) {
      console.log("child process exited with code " + code);
      // callback(`${code}`);
    });

    return null;
  },
  stop: async (callback) => {
    console.log("stop");

    const script = path.dirname(__filename) + "/bash/" + "stop.sh";

    var child = spawn("sh", [script]);

    child.stdout.on("data", function(data) {
      console.log("stdout: " + data);

      callback("");
      callback(`${data}`);
    });

    child.stderr.on("data", function(data) {
      // console.log('stderr: ' + data);
      callback(`${data}`);
    });

    child.on("close", function(code) {
      console.log("child process exited with code " + code);
      // callback(`${code}`);
    });

    return null;
  },
};

// { id: '232',
//   build_type: 'StandaloneLinux64',
//   version: '15',
//   caption: 'masters-of-conquest-headless.zip',
//   url:
//    'https://unitycloud-build-user-svc-live-build.s3.amazonaws.com/2485260/93996fe3-b080-483d-995e-722c9984012e/masters-of-conquest-headless-15/masters-of-conquest-headless.zip?AWSAccessKeyId=AKIAI6ZGSQWNDMF7X33A&Expires=1530669280&Signature=vXFGbcHenLNrGfuxvcBpmC3PZCs%3D&response-content-disposition=attachment%3B%20filename%3Dplay-entertainment-llc-masters-of-conquest-masters-of-conquest-headless-15.zip&response-content-type=application%2Foctet-stream',
//   created_at: '2018-07-04T01:24:41.226Z',
//   updated_at: '2018-07-04T01:24:41.226Z' }
