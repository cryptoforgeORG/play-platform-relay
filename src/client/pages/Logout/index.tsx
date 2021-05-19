/* @flow */

import React from "react";
import { Redirect } from "react-router";
import { withCookies } from "react-cookie";

type Props = {
  cookies: any;
};

const Logout = (props: Props) => {
  const { cookies } = props;
  cookies.remove("cookie", { path: "/" });

  return (
    <div className="Logout">
      <Redirect to="/" />
    </div>
  );
};

export default withCookies(Logout);
