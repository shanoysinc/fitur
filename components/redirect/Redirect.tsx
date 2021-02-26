import React from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const Redirect = ({ to }) => {
	const router = useRouter();
	const [session] = useSession();

	React.useEffect(() => {
		router.push(to);
	}, [to]);
	return null;
};

export default Redirect;
