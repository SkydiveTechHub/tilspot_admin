import React from "react";
import { Container } from "../../../shared/container";
import { Link } from "react-router-dom";
import { DescText } from "../../../shared/typograph";
import { PryButton } from "../../../shared/button";

const Hero = () => {
	return (
		<div className="bg-primary font-mont lg:h-[90vh]">
			<Container>
				<div className=" w-full flex flex-col gap-8 lg:flex-row justify-between items-end  h-full">
					<div className="w-full lg:w-[60%] pt-[10rem] flex  justify-center flex-col h-full space-y-6">

						<h1 className="font-[600] text-white font-mont hidden lg:block text-[24px] md:text-[32px] lg:text-[36px] md:leading-[40px] ">
							Experience Secure <img className='inline-flex pl-3 w-[70px]' src={'/images/key.png'}/>               
						</h1>
						<h1 className="font-[600] text-white font-mont hidden lg:block text-[24px] md:text-[32px] lg:text-[36px] md:leading-[40px] "> Authentication with WhatsApp <img className='inline-flex pl-3 w-[70px]' src={'/images/whatsapp.png'}/>        
						</h1>
						<h1 className="font-[600] text-white font-mont hidden lg:block text-[24px] md:text-[32px] lg:text-[36px] md:leading-[40px] ">OTPs</h1>
						
						
						<h1 className="font-[600] text-white lg:hidden font-mont text-center text-[32px] lg:text-[36px] md:leading-[40px] ">Experience Secure Authentication with WhatsApp OTPs.</h1>
						
						<DescText
							align={""}
							style={"lg:w-[95%] text-[12px] text-center lg:text-left  text-[#D2D2D2]"}
							value={
								"Our service ensures fast, reliable, and convenient delivery of one-time passwords directly to your WhatsApp, enhancing your security while providing a seamless user experience. Enjoy peace of mind with advanced protection, ensuring that your data stays secure while you enjoy the convenience of authentication anytime, anywhere."
							}
						/>

						<div className={'flex flex-col md:flex-row gap-6 items-center'}>
							<Link to="#/">
								<button onClick={()=>{}} className='rounded-[3rem] bg-white font-mont text-primary py-[6px] px-11 text-[16px] font-[500] leading-[24px]'>Try OTP Now Plan</button>
							</Link>								
							<Link to="#/">
								<button onClick={()=>{}} className='rounded-[3rem] bg-transparent border border-white font-mont text-white py-[6px] px-11 text-[16px] font-[500] leading-[24px]'>Explore Features</button>
							</Link>								
						</div>

					
					</div>

					<div className=" flex justify-center w-full lg:w-[40%]">
						<img
							src="/images/herodashboard.png"
							alt="Dashboard"
							className=""
						/>						
					</div>


				</div>
			</Container>
		</div>
	);
};

export default Hero;
