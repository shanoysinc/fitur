import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();

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
			</QueryClientProvider>
		</Provider>
	);
}

export default MyApp;
