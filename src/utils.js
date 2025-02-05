import { toast } from 'react-toastify';

export const handleSuccess = (message) => {
   toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: false,
   });
};

export const handleError = (message) => {
   toast.error(message, {
      position: "bottom-center",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: false,
   });
};