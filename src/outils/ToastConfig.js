import { toast } from 'react-toastify';

export const successToast = (message) => toast.success(message);
export const errorToast = (message) => toast.error(message);
export const warningToast = (message) => toast.warning(message);
