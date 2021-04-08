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
import DescriptionHelmet from "#components/reusable/description-helmet/description-helmet";
import {HELP_DESCRIPTION, MAIN_DESCRIPTION} from "#src/config";

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
        <>
          <DescriptionHelmet title={`Запрос`}/>
          <Send payload={match.params.payload}/>
        </>
      )}/>

      <Route exact path={`/help`}>
        <DescriptionHelmet title={`Помощь`} description={HELP_DESCRIPTION}/>
        <Help/>
      </Route>

      <Route exact path={`/atc`}>
        <DescriptionHelmet title={`AddToCart`} description={MAIN_DESCRIPTION}/>
        <ATC/>
      </Route>

      <Route exact path={`/instant`}>
        <Wrapper>
          <DescriptionHelmet title={`Мгновенный Запрос`} description={MAIN_DESCRIPTION}/>
          <Instant/>
        </Wrapper>
      </Route>

      <Route exact path={`/settings`}>
        <Wrapper>
          <DescriptionHelmet title={`Настройки`} description={MAIN_DESCRIPTION}/>
          <Settings/>
        </Wrapper>
      </Route>

      <Route exact path={`/`}>
        <Wrapper>
          <DescriptionHelmet title={`Конструктор Запросов`} description={MAIN_DESCRIPTION}/>
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
