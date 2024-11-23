import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import Login from "./pages/authPages/Login";
import ResetPassword from "./pages/authPages/Reset";
import Register from "./pages/authPages/SignUp";
import Dashboard from "./pages/dashboardPages";
import DashboardLayout from "./layouts/dashboardLayout";
import ApiDoc from "./pages/dashboardPages/ApiDoc";
import SubscriptionPage from "./pages/dashboardPages/subscription";
import OPTpage from "./pages/authPages/OTPpage";
import AccountPage from "./pages/dashboardPages/Account";
import InstancePreview from "./pages/dashboardPages/instances/InstancePreview";
import InstanceView from "./pages/dashboardPages/instances/InstanceView";
import HelpPage from "./pages/dashboardPages/help";
import Articles from "./pages/dashboardPages/articles";
import AirtimePage from "./pages/dashboardPages/airtime";
import InternetPage from "./pages/dashboardPages/internet";
import GasPage from "./pages/dashboardPages/gas";
import ElectricityPage from "./pages/dashboardPages/electricity";
import CablePage from "./pages/dashboardPages/cable";
function App() {
	return (
		<>
			{/* <Routes/> */}
			<Routes>
				<Route element={<DashboardLayout />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboard/airtime" element={<AirtimePage/>}/>
					<Route path="/dashboard/internet" element={<InternetPage/>}/>
					<Route path="/dashboard/gas" element={<GasPage/>}/>
					<Route path="/dashboard/electricity" element={<ElectricityPage/>}/>
					<Route path="/dashboard/cable" element={<CablePage/>}/>
					<Route path="/dashboard/api-docs" element={<ApiDoc/>}/>
					<Route path="/dashboard/preview-instance" element={<InstancePreview/>}/>
					<Route path="/dashboard/view-instances" element={<InstanceView/>}/>
					<Route path="/dashboard/subscription" element={<SubscriptionPage/>}/>
					<Route path="/dashboard/account" element={<AccountPage/>}/>
					<Route path="/dashboard/help" element={<HelpPage/>}/>
					<Route path="/dashboard/article" element={<Articles/>}/>
		
				</Route>

				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/otp" element={<OPTpage />} />
			</Routes>
		</>
	);
}

export default App;
