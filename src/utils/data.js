import LOGO from "../assets/img/Logo.png";
import DashLOGO from "../assets/img/Logo.png";

export const Logo = ({size}) => {
	return <img src={LOGO} style={{width:`${size}rem`}} alt="sme cloud logo" />;
};

export const DashboardLogo = () => {
	return <img src='/images/Logo.png' alt="sme cloud logo" />;
};


export const pageEnum = [
	{
		title:'Dashboard',
		pages:[
			"/dashboard/", "/dashboard"
		]
	},
	{
		title:'Staff',
		pages:[
			"/dashboard/staff"
		]
	},
	{
		title:'Airtime',
		pages:[
			"/dashboard/airtime"
		]
	},
	{
		title:'Internet',
		pages:[
			"/dashboard/internet", "/dashboard/preview-internet"
		]
	},
	{
		title:'Parking',
		pages:[
			"/dashboard/parking",
			'/dashboard/parking-location'
		]
	},
	{
		title:'Gas',
		pages:[
			"/dashboard/gas"
		]
	},
	{
		title:'Electricity',
		pages:[
			"/dashboard/electricity"
		]
	},
	{
		title:'Cable',
		pages:[
			"/dashboard/cable"
		]
	},
	{
		title:'Transport',
		pages:[
			"/dashboard/transport"
		]
	},
	{
		title:'Football Ticket ',
		pages:[
			"/dashboard/football", "/dashboard/preview-football"
		]
	},
	{
		title:'Housing',
		pages:[
			"/dashboard/housing"
		]
	},
	{
		title:'Government',
		pages:[
			"/dashboard/government"
		]
	},
	{
		title:'Waste',
		pages:[
			"/dashboard/waste"
		]
	},
	{
		title:'Fees',
		pages:[
			"/dashboard/fees"
		]
	},
	
]

