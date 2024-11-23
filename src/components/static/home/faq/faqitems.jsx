import React, { useState } from "react";
import { FaqItem } from "../../../../utils/data";

const FaqItems = () => {
	const [curOpen, SetCurOpen] = useState(null);
	return (
		<div className="flex flex-col gap-10 mb-16">
			{FaqItem.map((el, i) => (
				<AccordionItem
					title={el.title}
					key={el.title}
					numb={i}
					curOpen={curOpen}
					onOpen={SetCurOpen}
					text={el.text}
				/>
			))}
		</div>
	);
};
function AccordionItem({ title, numb, curOpen, text, onOpen }) {
	const isOpen = numb === curOpen;

	function handleClick() {
		onOpen(isOpen ? null : numb);
	}
	return (
		<div
			className="cursor-pointer border-b-[3px] font-int transition-all ease-in-out duration-500 border-[#E0E4EC] pb-5 shadow p-3 md:p-4 w-full lg:w-[90%] mr-auto ml-auto"
			onClick={handleClick}
		>
			<div className="flex gap-4  text-[#333333] font-[500] text-[20px]">
				{/* <p className="">{numb < 9 ? `0${numb + 1}` : numb + 1}</p> */}
				<p className="flex-1 text-[#333333] font-[700] font-mont text-[14px] md:text-[16Tpx] leading-[28px]">
					{title}
				</p>
				<p className="text-[26px] font-mont">{isOpen ? "-" : "+"}</p>
			</div>

			<div className=" text-[#333333] font-[400] text-[18px]">
				{isOpen && (
					<div className="text-[#6F6C90] font-mont font-[400] text-[16px] leading-[30px]">
						{text}
					</div>
				)}
			</div>
		</div>
	);
}

export default FaqItems;
