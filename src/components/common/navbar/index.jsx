import React from "react";
import {
	Navbar,
	Typography,
	Button,
	IconButton,
	Collapse,
} from "@material-tailwind/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { AuthButton } from "../../shared/button";

export function Navbars() {
	const [openNav, setOpenNav] = React.useState(false);

	React.useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setOpenNav(false)
		);
	}, []);

	const navList = (
		<ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className=" py-3 px-4 font-mont text-center text-[#4F4F4F] font-[500] text-[15px] leading-[18.29px]"
			>
				<Link className="flex items-center font-[500] textmd:text-[15px] leading-[18.29px]" to={'/'}>Home</Link>

			</Typography>
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 py-3 px-4 font-mont text-center text-[#4F4F4F] font-[500] text-[15px] leading-[18.29px]"
			>
				<Link className="flex items-center font-[500] textmd:text-[15px] leading-[18.29px]" to={'/'}>About Us</Link>
			</Typography>
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 py-3 px-4 font-mont text-center text-[#4F4F4F] font-[500] text-[15px] leading-[18.29px]"
			>
				<Link className="flex items-center font-[500] textmd:text-[15px] leading-[18.29px]" to={'/'}>Services</Link>

			</Typography>
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 py-3 px-4 font-mont text-center text-[#4F4F4F] font-[500] text-[15px] leading-[18.29px]"
			>
				<Link className="flex items-center font-[500] textmd:text-[15px] leading-[18.29px]" to={'/'}>Resources</Link>
			</Typography>
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 py-3 px-4 font-mont text-center text-[#4F4F4F] font-[500] text-[15px] leading-[18.29px]"
			>
				<Link className="flex items-center font-[500] textmd:text-[15px] leading-[18.29px]" to={'/'}>Pricing</Link>

			</Typography>
		</ul>
	);

	return (
		<div className="max-h-[1310px] md:max-h-[768px] w-full px-10 overflow-hidden absolute top-6">
			<Navbar className={`${!openNav && 'rounded-full'} max-w-none top-0 z-10 px-6`}>
				<div className="flex items-center justify-between  text-blue-gray-900 ">
					<Typography as="a" href="#" className="mr-4 cursor-pointer">
						<img src="/images/Logo.png" alt="logo" />
					</Typography>


						<div className="mr-4 hidden lg:block">{navList}</div>
						<div className="hidden lg:flex items-center gap-4 ">
						
							<Link to={'/login'} className='bg-white p-1 px-3 rounded-b-lg'><span className='font-mont text-[16px] text-transparent bg-clip-text bg-gradient-to-r font-bold to-purple-500 from-blue-300'>Login</span></Link>
							
							<Link to={'/register'}><AuthButton value={'Get Started'}/></Link>
							
						</div>

						<IconButton
							variant="text"
							className="ml-auto h-6 w-6 text-[#6E17B2] mr-4 pb-2  hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
							ripple={false}
							onClick={() => setOpenNav(!openNav)}
						>
							{openNav ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									className="h-10 w-10"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<RxHamburgerMenu className="text-[35px]" />
							)}
						</IconButton>

				</div>

				<Collapse open={openNav} className="pl-3">
							
					{navList}

					<div className="flex flex-col lg:flex-row items-center gap-x-9">
						<Link to={'/login'} className='bg-white p-1 px-3 rounded-b-lg'><span className='font-mont text-[16px] text-transparent bg-clip-text bg-gradient-to-r font-bold to-purple-500 from-blue-300'>Login</span></Link>
						<Link to={'/register'}><AuthButton value={'Register'}/></Link>
						
					</div>
				</Collapse>
			</Navbar>
		</div>
	);
}
