import { Route, Routes, useNavigate } from "react-router-dom";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import Login from "./pages/authPages/Login";
import ResetPassword from "./pages/authPages/Reset";
import Register from "./pages/authPages/SignUp";
import Dashboard from "./pages/dashboardPages";
import DashboardLayout from "./layouts/dashboardLayout";
import OPTpage from "./pages/authPages/OTPpage";
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
import PreviewInternetProvider from "./pages/dashboardPages/internet/InstancePreview";
import StaffPage from "./pages/dashboardPages/staff";
import PreviewFootballMatches from "./pages/dashboardPages/football/InstancePreview";
import FeesPage from "./pages/dashboardPages/fees";
import ProtectedRoute from "./routes";
import Loader from "./components/loader/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/reducers/authSlice";
import StatisticPage from "./pages/dashboardPages/statistics";
import { SocketProvider, useSocket } from "./hooks/SocketContext";
import TransactionsPage from "./pages/dashboardPages/transactions";
import UsersView from "./pages/dashboardPages/users";


function App() {
	const dispatch =  useDispatch()
	const socket = useSocket()
	const navigate = useNavigate()
	// const role = localStorage.getItem('role')
	const [hasRole, setHasRole] = useState(false)
	const loading = useSelector((state) => state.app.loading);
	const {role} = useSelector((state) => state.auth);

	  useEffect(()=>{
		// dispatch(checkAuth())
		if(!role){
			dispatch(checkAuth())
			// navigate(0)
		}
	  },[])
	  
	  useEffect(()=>{
		if(!socket | socket === null){
			navigate('/')
		}
	  },[socket])
	  
	
	  return (
		<>
		  {loading &&  <Loader />}

			<SocketProvider>
			<Routes>
				
					{/* {
						hasRole&& */}

						<>
								<Route element={<ProtectedRoute roles={['admin']} />}>
									<Route path="/verifyPasswordResetOTP/:id" element={<OPTpage />} />
									<Route path="/reset-password/:id" element={<ResetPassword />} />
									
									<Route element={<DashboardLayout />}>
										<Route path="/dashboard/users" element={<UsersView />} />
										<Route path="/dashboard/staff" element={<StaffPage />} />
										<Route path="/dashboard/fees" element={<FeesPage/>}/>
										<Route path="/dashboard/statistics" element={<StatisticPage/>}/>
										<Route path="/dashboard/preview-internet/:id" element={<PreviewInternetProvider/>}/>
										<Route path="/dashboard/parking-location/:id" element={<PreviewParkingLocation/>}/>
										<Route path="/dashboard/preview-football/:id" element={<PreviewFootballMatches/>}/>
										
									</Route>
								</Route>

								<Route element={<ProtectedRoute roles={['operator']} />}>
									<Route element={<DashboardLayout />}>
										<Route path="/dashboard/index" element={<Dashboard />} />
							
									</Route>

									
								</Route>			
								<Route element={<ProtectedRoute roles={['operator', 'admin']} />}>
									<Route element={<DashboardLayout />}>
										<Route path="/dashboard/airtime" element={<AirtimePage/>}/>
										<Route path="/dashboard/internet" element={<InternetPage/>}/>
										
										<Route path="/dashboard/gas" element={<GasPage/>}/>
										<Route path="/dashboard/electricity" element={<ElectricityPage/>}/>
										<Route path="/dashboard/parking" element={<ParkingPage/>}/>
										
										<Route path="/dashboard/transport" element={<TransportPage/>}/>
										<Route path="/dashboard/cable" element={<CablePage/>}/>
										<Route path="/dashboard/football" element={<FootballPage/>}/>
										
										<Route path="/dashboard/government" element={<GovernmentPage/>}/>
										<Route path="/dashboard/housing" element={<HousingPage/>}/>
										<Route path="/dashboard/waste" element={<WastePage/>}/>
										<Route path="/dashboard/transactions" element={<TransactionsPage/>}/>
							
									</Route>

									
								</Route>			
						</>

					{/* } */}
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					
					<Route path="/forgot-password" element={<ForgotPassword />} />
					
				


			</Routes>
			</SocketProvider>
		</>
	);
}

export default App;
