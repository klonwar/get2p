import React from "react";
import Main from "#components/big/main/main";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Send from "#components/big/send/send";
import Help from "#components/big/help/help";
import ATC from "#components/big/atc/atc";
import Wrapper from "#components/medium/wrapper/wrapper";
import Modules from "#components/big/modules/modules";

const App = () => {
  return (
    <Switch>
      <Route exact path={`/send`}>
        <Send />
      </Route>

      <Route exact path={`/help`}>
        <Help />
      </Route>

      <Route exact path={`/atc`}>
        <ATC />
      </Route>

      <Route exact path={`/modules`}>
        <Wrapper>
          <Modules />
        </Wrapper>
      </Route>

      <Route exact path={`/`}>
        <Wrapper>
          <Main />
        </Wrapper>
      </Route>

      <Route>
        <Redirect to={`/`} />
      </Route>
    </Switch>
  );
};

export default App;
