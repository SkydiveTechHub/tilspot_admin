import React from "react";
import { Container } from "../../../shared/container";
import { DescText, Heading, Tagtext } from "../../../shared/typograph";
import FaqItems from "./faqitems";

const FaqSection = () => {
	return (
		<div className="bg-[#FAF6FE] py-[60px] md:py-[120px]">
			<Container>
				<div className="flex flex-col lg:flex-row justify-between">

					<div className="flex-1 ">
						<DescText
							align={""}
							style={"w-[95%]  text-center md:text-left text-primary"}
							value={"Frequently Asked Questions"}
						/>						
						<h1 className="font-[600] text-black font-mont text-[32px] text-center md:text-left lg:text-[32px] lg:leading-[64px] ">
							Do you have any Questions?
						</h1>
						<DescText
							align={""}
							style={"w-full md:w-[80%] text-center md:text-left my-[3rem]  text-[#888888]"}
							value={"Got Questions? Find answers to the most common questions about our WhatsApp-Based Authentication Service. Whether you’re curious about security, integration, or delivery speed, we’ve got you covered with clear and detailed explanations."}
						/>
						


					</div>	
					<div className="flex-1">
						<FaqItems />
					</div>									
				</div>


				
			</Container>
		</div>
	);
};

export default FaqSection;
