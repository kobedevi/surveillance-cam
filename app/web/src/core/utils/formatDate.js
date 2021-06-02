import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const formatDate = (input, format) => {
  let dateObj;

  if (typeof input === 'string') {
    dateObj = dayjs(input, 'YYYYMMDDTHHmmss');
  } else if ('seconds' in input) {
    dateObj = dayjs.unix(input.seconds);
  }

  return dateObj.format(format);
};

export default formatDate;
