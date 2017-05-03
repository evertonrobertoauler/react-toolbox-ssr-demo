import * as React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Dropdown } from 'react-toolbox/lib/dropdown';
import { Input } from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import { ProgressBar } from 'react-toolbox/lib/progress_bar';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import { ajax } from 'rxjs/observable/dom/ajax'
import { DateTimePickerComponent } from './components/datetimepicker.component';

const INITIAL_STATE = {
  form: { tipo: 1, inicio: '', termino: '', descricao: '' },
  loading: false,
  tabIndex: 0
};

const TIPOS = [{ value: 1, label: 'Posto' }, { value: 2, label: 'SAMU' }];

export class RegistrarPontoComponent extends React.Component<any, any> {

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

  registrarPonto() {
    ajax
      .post('/registrarPonto', this.state.form, { 'Content-Type': 'application/json' })
      .subscribe(data => {
        this.setState(() => ({ ...INITIAL_STATE, tabIndex: 1 }));
      })

    this.setState(state => ({ ...state, loading: true }));
  }

  formInvalido() {
    return !this.state.form.tipo || !this.state.form.inicio;
  }

  render() {
    const formInvalido = this.formInvalido();

    return (
      <Container>
        <Row>
          <Col offset={{ lg: 2 }} lg={8}>
            <Tabs index={this.state.tabIndex} onChange={index => this.setState(state => ({ ...state, tabIndex: index }))} fixed>
              <Tab label="Registrar Ponto">
                <Dropdown value={this.state.form.tipo}
                  onChange={value => this.updateForm('tipo', value)}
                  label="Tipo" source={TIPOS} />
                <DateTimePickerComponent datePickerLabel="Data Início" timePickerLabel="Hora Início"
                  value={this.state.form.inicio}
                  onChange={value => this.updateForm('inicio', value)} />
                <DateTimePickerComponent datePickerLabel="Data Término" timePickerLabel="Hora Término"
                  value={this.state.form.termino}
                  onChange={value => this.updateForm('termino', value)} />
                <Input value={this.state.form.descricao}
                  onChange={value => this.updateForm('descricao', value)}
                  type="text" floating label="Descrição" icon="message" />
                <div style={{ marginBottom: '15px' }}>
                  {this.state.loading ? <ProgressBar type="linear" mode="indeterminate" /> : null}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Button label="Registrar" raised primary disabled={formInvalido} onClick={() => this.registrarPonto()} />
                  <Button style={{ marginLeft: '10px' }} label="Limpar" raised onClick={() => this.resetForm()} />
                </div>
              </Tab>
              <Tab label="Extrato">
                <h1>Extrato</h1>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    );
  }
}
