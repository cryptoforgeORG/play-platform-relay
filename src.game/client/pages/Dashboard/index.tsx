import React from "react";

import { withCookies } from "react-cookie";

import { useEffect } from "react";
import { Observer, useLocalStore } from "mobx-react-lite";

import axios from "axios";

import SocketFeedStats from "../../features/SocketFeedStats";

import FormLogin from "../../features/FormLogin";

import camelcaseKeys from "camelcase-keys";

type Props = {
  cookies: any;
};

const Interface: React.FunctionComponent = () => {
  const store = useLocalStore(() => ({ url: "", build: {} as any }));
  // let heartbeat = {};

  useEffect(() => {
    retrieveBuildUrl();
  });

  const retrieveBuildUrl = async () => {
    const response = await axios.get(`/api/get_master_url`, {});

    if (response.status === 200) {
      console.log(response);

      store.url = response.data.url;
      store.build = camelcaseKeys(response.data.build, { deep: true });
    }
  };

  return (
    <>
      <Observer>
        {() => (
          <div>
            <a href={store.url}>Download Master Build {store.build.version}</a>
            <table>
              <tr>
                <td>enableOverlords:</td>
                <td>{store.build.enableOverlords ? "true" : "false"}</td>
              </tr>
              <tr>
                <td>enableTargetingCache:</td>
                <td>{store.build.enableTargetingCache ? "true" : "false"}</td>
              </tr>
              <tr>
                <td>enableTargetingJobs:</td>
                <td>{store.build.enableTargetingJobs ? "true" : "false"}</td>
              </tr>
            </table>
          </div>
        )}
      </Observer>
    </>
  );
};

const Dashboard = (props: Props) => {
  const { cookies } = props;

  const state = {
    hasCookie: cookies.get("cookie") ? true : false,
  };

  console.log("cookies", cookies);

  const handleLoginCallback = (session: any) => {
    console.log("handleLoginCallback fired", session);
    console.log(session);

    state.hasCookie = cookies.get("cookie") ? true : false;

    window.location.href = "/";
  };

  return (
    <div className="Dashboard">
      {!state.hasCookie ? (
        <div>
          <h2>Login</h2>
          <FormLogin handleLoginCallback={handleLoginCallback} />
        </div>
      ) : (
        <div>
          <h2>
            Dashboard |&nbsp;
            <a href={`https://core.playentertainment.online`}>Core</a>
          </h2>
          <br />
          <div>
            <a href={`/files`}>Logs</a>
          </div>

          <Interface />

          <br />
          <SocketFeedStats />
          <br />
        </div>
      )}
    </div>
  );
};

export default withCookies(Dashboard);
