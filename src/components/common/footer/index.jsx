import React from "react";
import { Link } from "react-router-dom";
import {
	companyLinks,
	contactLinks,
	serviceLinks,
	socialLinks,
} from "../../../utils/data";
import { Container } from "../../shared/container";
import { BlackText } from "../../shared/typograph";

const Footer = () => {
	return (
		<footer className=" pt-8 pb-3 px-[40px] font-Mont bg-[#283646] text-[#fff] font-montoto">
			<Container>
				<div className="flex flex-row flex-wrap  justify-between gap-6">
					<div>
						<img src="/images/logo.png" alt="Logo" />
						<h3 className="w-full font-mont  font-[600] mt-2">Tailored Solutions to <br/>Elevate Your Digital Presence</h3>
		
						<div className="flex gap-2 items-center mt-9">
							<img className="w-[30px]" src="/images/message.svg" alt="message" />
							<span className="font-mont text-white font-[400] text-[16px]">
							Autobiz @gmail.com
							</span>
						</div>
						<div className="flex gap-2 items-center mt-3">
							<img className="w-[30px]" src="/images/call.svg" alt="message" />
							<span className="font-mont text-white font-[400] text-[16px]">
								07884939023
							</span>
						</div>
						<div className="flex gap-3 items-center mt-4">
							{socialLinks.map((link, index) => (
								<SocialLink
									key={index}
									href={link.href}
									src={link.src}
									alt={link.alt}
								/>
							))}
						</div>
					</div>
					<div className="md:w-[40%]">
							<BlackText style={'text-white font-bold '} text={'Newsletter'}/>

							<div className="w-full">
								<BlackText style={'text-white'} text={'Sign up for the latest news and updates'}/>
								<div className='w-full flex items-center bg-white border rounded-md h-[50px] pl-4 mb-6'>
									<input disabled placeholder='' className='outline-none font-mont w-[90%]  h-full' type="text"  value={''}  />
									<button style={{backgroundColor:'#ffffff'}} className='flex justify-center items-center  h-full font-semibold font-mont'><img src="/images/send.png
									" alt="" /></button>
								</div> 
							</div>
					</div>

				</div>
				<div className="pt-[20px] border-t border-[#fff] mt-20 text-center flex flex-wrap gap-6 lg:gap-[9rem] justify-between items-center text-[14px] font-[400] ">


					<div className="flex gap-6 leading-[22px] flex-wrap font-mont text-[#F2F2F2]">
						<Link to={"/"}>Features</Link>
						<Link to={"/"}>FAQs</Link>
						<Link to={"/"}>Our Plan</Link>
					</div>					
					<p className="leading-[14px] font-mont text-[#F2F2F2]">
						{" "}
						© Copy right 2024. Smeclouds technologies{" "}
					</p>

				</div>
			</Container>
		</footer>
	);
};

function SocialLink({ href, src, alt }) {
	return (
		<a href={href}>
			<img className="w-[20px]" src={src} alt={alt} />
		</a>
	);
}

function Servicelink({ service, href }) {
	return (
		<a href={href} className="text-[14px] font-[500] leading-[40px]">
			{service}
		</a>
	);
}

export default Footer;
