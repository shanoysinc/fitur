import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProps } from "next/app";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider session={pageProps.session}>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</Provider>
	);
}

export default MyApp;
