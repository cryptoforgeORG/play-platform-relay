import React from "react";
import { Redirect } from "react-router";
import { withCookies } from "react-cookie";

import FormLogin from "../../features/FormLogin";

type Props = {
  cookies: any;
};

const Login = (props: Props) => {
  const { cookies } = props;

  const state = {
    hasCookie: cookies.get("cookie") ? true : false,
  };

  console.log("cookies", cookies);

  const handleLoginCallback = (session: any) => {
    console.log("handleLoginCallback fired", session);
    console.log(session);

    state.hasCookie = cookies.get("cookie") ? true : false;

    if (!state.hasCookie) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="Login">
        {!state.hasCookie ? (
          <Redirect key="/dashboard" to="/dashboard" />
        ) : null}

        <h2>Login</h2>
        <FormLogin handleLoginCallback={handleLoginCallback} />
      </div>
    </>
  );
};

export default withCookies(Login);
