import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Datetime from 'react-datetime';
import moment from 'moment';

import Clickable from 'components/common/Clickable';
import LocaleContext from 'components/common/LocaleContext';

const yesterday = moment().subtract(1, 'day');
const notInPast = current => current.isAfter(yesterday);

export const TIME_FORMAT = 'HH:mm';

const formatDate = date => {
  if (!date) {
    return null;
  }
  let momentDate = date;
  if (typeof date === 'string') {
    momentDate = moment(date);
  }
  return momentDate.format();
};

const DateTimePicker = ({ className, placeholder, value, onChange }) => (
  <>
    <Head>
      <link
        key="react-datetime-styles"
        rel="stylesheet"
        href="/static/react-datetime/react-datetime.css"
      />
    </Head>
    <LocaleContext.Consumer>
      {lang => (
        <Datetime
          utc
          locale={lang}
          defaultValue={value ? moment(value) : ''}
          onChange={date => onChange(formatDate(date))}
          timeFormat={TIME_FORMAT}
          renderInput={props => (
            <div className="field has-addons">
              <p className="control">
                <input {...props} className={className} placeholder={placeholder} />
              </p>
              <p className="control">
                <Clickable
                  className="button is-primary"
                  onClick={props.onChange.bind(null, { target: { value: '' } })}
                >
                  ×
                </Clickable>
              </p>
            </div>
          )}
          isValidDate={notInPast}
        />
      )}
    </LocaleContext.Consumer>
  </>
);

DateTimePicker.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default DateTimePicker;
