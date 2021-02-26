import { toast } from "react-toastify";
import styles from "../styles/toast/toast.module.scss";

export const toastNotification = (message: string, errorType: string) => {
	const toastOptions = {
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: false,
		progress: undefined,
		className: styles.toast,
	};

	switch (errorType) {
		case "error":
			toast.error(message, toastOptions);
			break;
		case "success":
			toast.success(message, toastOptions);
			break;
		default:
			toast.warning(message, toastOptions);
			break;
	}
};
