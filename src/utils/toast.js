import { toast } from 'react-toastify';

export default {
  showErrorMessage(message) {
    toast.error(message);
  },
};