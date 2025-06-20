import { toast } from 'sonner';
import axios from 'axios';

export function handleError(
  error: unknown,
  fallbackMessage = 'Something went wrong',
) {
  let message = fallbackMessage;

  if (axios.isAxiosError(error)) {
    message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      fallbackMessage;
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(message);
}
