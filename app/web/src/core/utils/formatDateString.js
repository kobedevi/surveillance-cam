import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const formatDateString = (dateString) => {
  const date = dayjs(dateString, 'YYYYMMDDTHHmmss');
  return date.format('DD-MM-YYYY HH:mm:ss');
};

export default formatDateString;
