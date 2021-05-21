import React from "react";

import { withCookies } from "react-cookie";

import { Link } from "react-router-dom";

import FormLogin from "../../features/FormLogin";

type Props = {
  cookies: any;
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
    <>
      <div className="container">
        {!state.hasCookie ? (
          <div className="row">
            <h2>Login</h2>
            <FormLogin handleLoginCallback={handleLoginCallback} />
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <h2>Dashboard</h2>
            </div>
            <div className="row">
              <Link to="/achievements">Achievements</Link>
            </div>
            <div className="row">
              <Link to="/announcements">Announcements</Link>
            </div>
            <div className="row">
              <Link to="/balance">Balance</Link>
            </div>
            <div className="row">
              <Link to="/base_item_properties">BaseItemProperties</Link>
            </div>
            <div className="row">
              <Link to="/builds">Builds</Link>
            </div>
            <div className="row">
              <Link to="/base_items">BaseItems</Link>
            </div>
            <div className="row">
              <Link to="/base_quests">BaseQuests</Link>
            </div>
            <div className="row">
              <Link to="/clans">Clans</Link>
            </div>
            <div className="row">
              <Link to="/cron_tasks">CronTasks</Link>
            </div>
            <div className="row">
              <Link to="/environment_items">EnvironmentItems</Link>
            </div>
            <div className="row">
              <Link to="/lootables">Lootables</Link>
            </div>
            <div className="row">
              <Link to="/matches">Matches</Link>
            </div>
            <div className="row">
              <Link to="/parameters">Parameters</Link> &nbsp;
            </div>
            <div className="row">
              <Link to="/player_quest_properties">PlayerQuestProperties</Link>
            </div>
            <div className="row">
              <Link to="/player_quests">PlayerQuests</Link>
            </div>
            <div className="row">
              <Link to="/promos">Promos</Link>
            </div>
            <div className="row">
              <Link to="/recruits">Recruits</Link>
            </div>
            <div className="row">
              <Link to="/rules">Rules</Link> &nbsp;
            </div>
            <div className="row">
              <Link to="/scenery">Scenery</Link>
            </div>
            <div className="row">
              <Link to="/screenshots">Screenshots</Link>
            </div>
            <div className="row">
              <Link to="/world_item_properties">WorldItemProperties</Link>
            </div>
            <div className="row">
              <Link to="/world_items">WorldItems</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default withCookies(Dashboard);
