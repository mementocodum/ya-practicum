import { format, isValid } from 'date-fns';

export const parseDateAndTime = (dateTimeString: string | number): { date: string, time: string } => {
    const dateObj = new Date(dateTimeString);
    const obj = { date: '00.00.0000', time: '00:00' };
    if (!isValid(dateObj)) {
        return obj;
    }
    obj.date = format(dateObj, 'dd.MM.yyyy');
    obj.time = format(dateObj, 'hh:mm');
    return obj;
};
