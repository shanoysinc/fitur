import React from "react";
import { IconType } from "../types/Icons";

const DescriptionIcon = (props: IconType) => {
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
				d="M2 4.5C2 3.94772 2.44772 3.5 3 3.5H21C21.5523 3.5 22 3.94772 22 4.5C22 5.05228 21.5523 5.5 21 5.5H3C2.44772 5.5 2 5.05228 2 4.5ZM2 9.5C2 8.94772 2.44772 8.5 3 8.5H17C17.5523 8.5 18 8.94772 18 9.5C18 10.0523 17.5523 10.5 17 10.5H3C2.44772 10.5 2 10.0523 2 9.5ZM2 14.5C2 13.9477 2.44772 13.5 3 13.5H21C21.5523 13.5 22 13.9477 22 14.5C22 15.0523 21.5523 15.5 21 15.5H3C2.44772 15.5 2 15.0523 2 14.5ZM2 19.5C2 18.9477 2.44772 18.5 3 18.5H17C17.5523 18.5 18 18.9477 18 19.5C18 20.0523 17.5523 20.5 17 20.5H3C2.44772 20.5 2 20.0523 2 19.5Z"
				fill={props.fill}
				fillOpacity="0.65"
			/>
		</svg>
	);
};

export default DescriptionIcon;
