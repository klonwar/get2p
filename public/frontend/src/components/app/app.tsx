import React, {FC, useEffect} from "react";
import Main from "#components/pages/main/main";
import {Redirect, Route, Switch,} from "react-router-dom";
import Send from "#components/pages/send/send";
import Help from "#components/pages/help/help";
import ATC from "#components/pages/atc/atc";
import Wrapper from "#components/reusable/header/wrapper";
import Instant from "#components/pages/instant/instant";
import Settings from "#components/pages/settings/settings";
import {useSelector} from "react-redux";
import {darkThemeSettingSelector} from "#src/js/redux/selectors";

const App: FC = () => {
  const darkTheme = useSelector(darkThemeSettingSelector);

  useEffect(() => {
    const def = document.body.className;
    if (darkTheme) {
      document.body.className = `uk-light`;
    } else {
      document.body.className = `uk-dark`;
    }

    return () => {
      document.body.className = def;
    };
  });

  return (
    <Switch>
      <Route exact path={`/send/:payload`} render={({match}) => (
        <Send payload={match.params.payload}/>
      )}/>

      <Route exact path={`/help`}>
        <Help/>
      </Route>

      <Route exact path={`/atc`}>
        <ATC/>
      </Route>

      <Route exact path={`/instant`}>
        <Wrapper>
          <Instant/>
        </Wrapper>
      </Route>

      <Route exact path={`/settings`}>
        <Wrapper>
          <Settings/>
        </Wrapper>
      </Route>

      <Route exact path={`/`}>
        <Wrapper>
          <Main/>
        </Wrapper>
      </Route>

      <Route>
        <Redirect to={`/`}/>
      </Route>
    </Switch>
  );
};

export default App;
