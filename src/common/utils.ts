import { format } from 'date-fns';

export function toISODate(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
}
