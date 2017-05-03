import * as React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Input } from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';

import { ajax } from 'rxjs/observable/dom/ajax'

const INITIAL_STATE = {
  form: { cpf: '', senha: '' },
  loading: false
};

interface LoginComponentProps {
  onLogin: Function;
}

export class LoginComponent extends React.Component<LoginComponentProps, any> {

  state = INITIAL_STATE;

  updateForm(field, value) {
    this.setState((state) => ({
      ...state,
      form: { ...state.form, [field]: value }
    }));
  }

  resetForm() {
    this.setState(() => INITIAL_STATE);
  }

  requestLogin() {
    ajax
      .post('/login', this.state.form, { 'Content-Type': 'application/json' })
      .subscribe((res) => {
        this.props.onLogin(res.response);
      });

    this.setState(state => ({ ...state, loading: true }));
  }

  formInvalido() {
    return !this.state.form.cpf || !this.state.form.senha;
  }

  render() {
    const formInvalido = this.formInvalido();

    return (
      <Container>
        <Row>
          <Col offset={{ lg: 3 }} lg={6} style={{ textAlign: 'center' }}>
            <h3>Login</h3>
            <Input value={this.state.form.cpf} onChange={value => this.updateForm('cpf', value)}
              floating type="tel" label="CPF" icon="person" />
            <Input value={this.state.form.senha} onChange={value => this.updateForm('senha', value)}
              floating type="password" label="Senha" icon="lock" />
            <div style={{ marginBottom: '15px' }}>
              {this.state.loading ? <ProgressBar type="linear" mode="indeterminate" /> : null}
            </div>
            <Button label="Entrar" raised primary disabled={formInvalido} onClick={() => this.requestLogin()} />
            <Button style={{ marginLeft: '10px' }} label="Limpar" raised onClick={() => this.resetForm()} />
          </Col>
        </Row>
      </Container>
    );
  }
}
