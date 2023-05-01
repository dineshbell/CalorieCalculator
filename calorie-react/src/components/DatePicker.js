import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

export default function DatePickerValue(props) {

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Date"
          value={props.value ? moment(props.value):""}
          onChange={props.onChange}
          name={props.name}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}