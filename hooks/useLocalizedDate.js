import { useLocaleContext } from 'components/common/Text';
import { formatLocalizedDate } from 'utils/formatters';

const useLocalizedDate = (date, format) => {
  const lang = useLocaleContext();
  return formatLocalizedDate(date, lang, format);
};

export default useLocalizedDate;
