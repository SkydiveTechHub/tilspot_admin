import { BlackText } from "../typograph";

export const Section = ({ title, children }) => {
	return (
		<div className="relative py-4 ">
			<BlackText text={title} style={"font-[600] leading-[14px] text-[18px]"} />

			<div className="mt-3 ">{children}</div>
		</div>
	);
};
