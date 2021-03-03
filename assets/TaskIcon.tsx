import React from "react";
import { IconType } from "../types/Icons";

const TaskIcon = (props: IconType) => {
	return (
		<svg
			width={props.width}
			height={props.height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2 4.5C2 3.11929 3.11929 2 4.5 2H19.5C20.8807 2 22 3.11929 22 4.5V19.5C22 20.8807 20.8807 22 19.5 22H4.5C3.11929 22 2 20.8807 2 19.5V4.5ZM7 6.5C6.44772 6.5 6 6.94772 6 7.5C6 8.05228 6.44772 8.5 7 8.5H17C17.5523 8.5 18 8.05228 18 7.5C18 6.94772 17.5523 6.5 17 6.5H7ZM7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H13C13.5523 13 14 12.5523 14 12C14 11.4477 13.5523 11 13 11H7ZM6 16.5C6 15.9477 6.44772 15.5 7 15.5H16C16.5523 15.5 17 15.9477 17 16.5C17 17.0523 16.5523 17.5 16 17.5H7C6.44772 17.5 6 17.0523 6 16.5Z"
				fill={props.fill}
				fillOpacity="0.65"
			/>
		</svg>
	);
};

export default TaskIcon;
