import * as React from 'react';
import { Row, Col } from 'react-grid-system';
import { TimePicker } from 'react-toolbox/lib/time_picker';
import * as moment from 'moment';

const DatePicker = require('react-toolbox/lib/date_picker').default;

interface DateTimePickerProps {
  datePickerLabel: string;
  timePickerLabel: string;
  value: string;
  onChange: Function;
}

export class DateTimePickerComponent extends React.Component<DateTimePickerProps, any> {

  state = { data: undefined, hora: undefined };

  componentWillUpdate(nextProps) {
    if (this.props.value !== nextProps.value) {
      const [data, hora] = nextProps.value.split(' ');

      this.setState((state) => ({
        ...state,
        data: data ? moment(data, 'YYYY-MM-DD').toDate() : undefined,
        hora: hora ? moment(hora, 'HH:mm').toDate() : undefined,
      }));
    }
  }

  onChange(field, value) {
    this.setState(state => {
      const newState = {
        ...state,
        [field]: value
      };

      this.props.onChange(
        newState.data && newState.hora
          ? (moment(newState.data).format('YYYY-MM-DD') + ' ' + moment(newState.hora).format('HH:mm'))
          : ''
      );

      return newState;
    });
  }

  render() {
    return (
      <Row>
        <Col xs={12} lg={6}>
          <DatePicker inputFormat={value => moment(value).format('DD/MM/YYYY')}
            autoOk locale="pt" cancelLabel="Cancelar" label={this.props.datePickerLabel} icon="event"
            value={this.state.data} onChange={value => this.onChange('data', value)} />
        </Col>
        <Col xs={12} lg={6}>
          <TimePicker label={this.props.timePickerLabel} icon="alarm" cancelLabel="Cancelar"
            value={this.state.hora} onChange={value => this.onChange('hora', value)} />
        </Col>
      </Row>
    );
  }
}
