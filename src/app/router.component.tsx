/// <reference path="../typings.d.ts" />

import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as Cookies from 'universal-cookie';

import { LoginComponent } from './login.component';
import { RegistrarPontoComponent } from './registrar-ponto.component';

import { AppBar } from 'react-toolbox/lib/app_bar';
import { Button } from 'react-toolbox/lib/button';

import * as injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

interface RouterComponentProps {
  cookie?: any;
}

export class RouterComponent extends React.Component<RouterComponentProps, any> {

  cookies: Cookies;

  constructor(props: RouterComponentProps) {
    super(props);
    this.cookies = props.cookie ? new Cookies(props.cookie) : new Cookies();
    this.state = { user: this.cookies.get('user') }
  }

  onLogin(user) {
    this.cookies.set('user', user);
    this.setState(state => ({ ...state, user }));
  }

  onLogout() {
    this.cookies.set('user', '');
    this.setState(state => ({ ...state, user: null }));
  }

  render() {
    if (this.state.user) {
      return (
        <div>
          <AppBar title="Ponto APP">
            <Button label="Sair" flat icon="exit_to_app" style={{ color: 'white' }} onClick={() => this.onLogout()} />
          </AppBar>
          <Switch>
            <Route exact path="/" component={() => <RegistrarPontoComponent />} />
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div>
          <AppBar title="Ponto APP" />
          <Switch>
            <Route exact path="/" component={() => <LoginComponent onLogin={(user) => this.onLogin(user)} />} />
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </div>
      );
    }
  }
}
