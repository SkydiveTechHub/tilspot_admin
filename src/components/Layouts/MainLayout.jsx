import React from "react";

import Footer from "../common/footer";
import { Navbars } from "../common/navbar";

const MainLayout = ({ children }) => {
	return (
		<div className="relative">
			<Navbars />
			{children}
			<Footer />
		</div>
	);
};

export default MainLayout;
