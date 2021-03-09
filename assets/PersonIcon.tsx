import React from "react";
import { IconType } from "../types/Icons";

const PersonIcon = (props: IconType) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			version="1.1"
			viewBox="0 0 100 125"
			enableBackground="new 0 0 100 100"
			xmlSpace="preserve"
			height={props.height}
			width={props.width}
		>
			<path
				fill={props.fill}
				d="M59.941,49.087c3.272-2.808,5.356-6.963,5.356-11.603c0-8.435-6.862-15.297-15.297-15.297S34.703,29.05,34.703,37.484  c0,4.64,2.084,8.795,5.356,11.603C29.625,53.1,22.188,63.201,22.188,75.031c0,1.536,1.245,2.781,2.781,2.781h50.063  c1.536,0,2.781-1.245,2.781-2.781C77.813,63.201,70.375,53.1,59.941,49.087z M40.266,37.484c0-5.368,4.367-9.734,9.734-9.734  s9.734,4.367,9.734,9.734S55.368,47.219,50,47.219S40.266,42.852,40.266,37.484z M27.923,72.25  C29.296,61.289,38.673,52.781,50,52.781s20.704,8.508,22.077,19.469H27.923z"
			/>
		</svg>
	);
};

export default PersonIcon;
