import React from "react";
import axios from "axios";

import { Observer, useLocalObservable } from "mobx-react-lite";

interface InterfaceProps {
  handleLoginCallback: any;
}

const Interface: React.FunctionComponent<InterfaceProps> = (props) => {
  const store = useLocalObservable(() => ({
    user: "",
    password: "",
  }));

  const handleLogin = async () => {
    const response = await axios.post(`/forms/login`, {
      user: store.user,
      password: store.password,
    });

    if (response.status === 200) {
      const { session } = response.data;
      props.handleLoginCallback(session);
    } else {
    }
  };

  return (
    <>
      <Observer>
        {() => (
          <div>
            <div>
              <input onChange={(e) => (store.user = e.target.value)} />
              <br />
              <input
                onChange={(e) => (store.password = e.target.value)}
                type="password"
              />
              <br />
              <button type="submit" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        )}
      </Observer>
    </>
  );
};

interface Props {
  handleLoginCallback: any;
}

class FormLogin extends React.Component<Props> {
  render() {
    const { handleLoginCallback } = this.props;

    return <Interface handleLoginCallback={handleLoginCallback} />;
  }
}

export default FormLogin;
