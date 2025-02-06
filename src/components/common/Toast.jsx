import { FaCheck } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const showSuccessToast = ({ message }) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    closeButton: false,
    className: "toast-success-container toast-success-container-after ",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
    width: "100%",
    icon: <FaCheck />,
  });
};

const showErrorToast = ({ message }) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    closeButton: false,
    className: "toast-error-container toast-error-container-after ",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
    width: "100%",
    icon: <FiX />,
  });
};

export { showErrorToast, showSuccessToast };
