import React from "react";
import { IconType } from "../types/Icons";

const AddIcon = (props: IconType) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.width}
			height={props.height}
			viewBox="0 0 24 24"
		>
			<path
				d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
				fill={props.fill}
			/>
		</svg>
	);
};

export default AddIcon;
