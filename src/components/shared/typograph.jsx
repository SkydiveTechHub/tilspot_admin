export const AuxAuthText = ({ text }) => {
	return (
		<span className="text-[#0588E8] font-mont font-[500] text-[14px]">
			{text}
		</span>
	);
};

export const BlackText = ({text, style})=>{
    return(
        <span className={`font-mont text-[#4F4F4F] ${style}`}>{text}</span>
    )
}
export const GrayText = ({text, style})=>{
    return(
        <span className={`font-mont text-[#475569] ${style}`}>{text}</span>
    )
}

export const Label = ({ text }) => {
	return (
		<p className="font-mont font-[500] text-[#475569] text-[14px]">{text}</p>
	);
};
export const CheckLabel = ({ text }) => {
	return (
		<label
			checked
			for="checkbox"
			className="font-mont font-[400] text-black text-[12px]"
		>
			{text}
		</label>
	);
};

export const Tagtext = ({ text, style }) => {
	return (
		<h6
			className={`border rounded-[8px] py-1 px-2 text-[16px] font-[500] leading-[24px] mb-2 ${style} inline-block`}
		>
			{text}
		</h6>
	);
};

export const Heading = ({ text, style }) => {
	return (
		<p
			className={`font-[500] ${style}`}
		>
			{text}
		</p>
	);
};

export const DescText = ({ value, style }) => {
	return (
		<p
			className={`font-[400] font-mont ${style}`}
		>
			{value}
		</p>
	);
};