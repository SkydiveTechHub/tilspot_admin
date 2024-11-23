import React from "react";

export const FlexContainer = ({ contentLeft, contentRight, direction }) => {
	return (
		<div className={`flex ${direction} gap-8  justify-between`}>
			<>{contentLeft}</>
			<>{contentRight}</>
		</div>
	);
};
