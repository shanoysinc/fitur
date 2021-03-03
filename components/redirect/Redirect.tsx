import React from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

interface AppProps {
	to: string;
}

const Redirect = ({ to }: AppProps) => {
	const router = useRouter();
	const [session] = useSession();

	React.useEffect(() => {
		router.push(to);
	}, [to, session]);
	return null;
};

export default Redirect;
