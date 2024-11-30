import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import Login from "./pages/authPages/Login";
import ResetPassword from "./pages/authPages/Reset";
import Register from "./pages/authPages/SignUp";
import Dashboard from "./pages/dashboardPages";
import DashboardLayout from "./layouts/dashboardLayout";
import ApiDoc from "./pages/dashboardPages/ApiDoc";
import OPTpage from "./pages/authPages/OTPpage";
import AccountPage from "./pages/dashboardPages/Account";
import HelpPage from "./pages/dashboardPages/help";
import Articles from "./pages/dashboardPages/articles";
import AirtimePage from "./pages/dashboardPages/airtime";
import InternetPage from "./pages/dashboardPages/internet";
import GasPage from "./pages/dashboardPages/gas";
import ElectricityPage from "./pages/dashboardPages/electricity";
import CablePage from "./pages/dashboardPages/cable";
import ParkingPage from "./pages/dashboardPages/parking";
import TransportPage from "./pages/dashboardPages/transport";
import FootballPage from "./pages/dashboardPages/football";
import GovernmentPage from "./pages/dashboardPages/government";
import HousingPage from "./pages/dashboardPages/housing";
import WastePage from "./pages/dashboardPages/Waste";
import PreviewParkingLocation from "./pages/dashboardPages/parking/InstancePreview";
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
					<Route path="/dashboard/parking" element={<ParkingPage/>}/>
					<Route path="/dashboard/parking-location" element={<PreviewParkingLocation/>}/>
					<Route path="/dashboard/transport" element={<TransportPage/>}/>
					<Route path="/dashboard/cable" element={<CablePage/>}/>
					<Route path="/dashboard/football" element={<FootballPage/>}/>
					<Route path="/dashboard/government" element={<GovernmentPage/>}/>
					<Route path="/dashboard/housing" element={<HousingPage/>}/>
					<Route path="/dashboard/waste" element={<WastePage/>}/>
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
