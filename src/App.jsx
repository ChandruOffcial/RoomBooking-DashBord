import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Accounts from "./pages/Account";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyled from "./styles/GlobalStyle";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<GlobalStyled />
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Navigate replace to="dashboard" />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="booking" element={<Booking />} />
						<Route path="cabins" element={<Cabins />} />
						<Route path="account" element={<Accounts />} />
						<Route path="settings" element={<Settings />} />
						<Route path="users" element={<Users />} />
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
			<Toaster
				position="top-center"
				toastOptions={{
					success: {
						duration: 3000,
					},
					error: {
						duration: 4000,
					},
				}}
			/>
		</QueryClientProvider>
	);
};

export default App;
