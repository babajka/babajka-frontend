import moment from 'moment';

import { DATE_FORMAT } from 'constants';

export const formatDate = (date, format = DATE_FORMAT) => moment(date).format(format);

export const stub = 1;