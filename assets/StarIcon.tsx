import React from "react";
import { IconType } from "../types/Icons";

const StarIcon = (props: IconType) => {
	return (
		<svg
			width={props.width}
			height={props.height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 5.17298L14.335 9.98997L19.64 10.722L15.779 14.432L16.721 19.702L12 17.178L7.279 19.703L8.221 14.433L4.36 10.723L9.665 9.98997L12 5.17298V5.17298ZM12 0.586975L8.332 8.15497L0 9.30597L6.064 15.134L4.584 23.413L12 19.446L19.416 23.412L17.936 15.133L24 9.30597L15.668 8.15598L12 0.586975V0.586975Z"
				fill={props.fill}
			/>
		</svg>
	);
};

export default StarIcon;
