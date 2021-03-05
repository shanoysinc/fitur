import React from "react";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
// import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider session={pageProps.session}>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
				<ToastContainer
					position="top-right"
					autoClose={2000}
					hideProgressBar={true}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable={false}
					pauseOnHover
				/>
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			</QueryClientProvider>
		</Provider>
	);
}

export default MyApp;
