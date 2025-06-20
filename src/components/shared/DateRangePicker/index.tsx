import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

type Props = {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
};

export function DateRangePicker({ value, onChange }: Props) {
  return (
    <input
      type="date"
      value={value?.from ? format(value.from, 'yyyy-MM-dd') : ''}
      onChange={(e) =>
        onChange({ from: new Date(e.target.value), to: value?.to || undefined })
      }
    />
  );
}
