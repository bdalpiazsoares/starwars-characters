import { toast } from 'react-toastify';

export function showErrorMessage(message) {
  toast.error(message);
};