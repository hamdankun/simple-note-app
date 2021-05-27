import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export function formatFromISO(dateString: string, format: string = 'ddd, DD MMM YYYY'): string {
    return dayjs(dateString).format(format);
}