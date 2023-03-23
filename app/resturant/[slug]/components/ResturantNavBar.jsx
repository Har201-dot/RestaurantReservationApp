import React from "react";
import Link from "next/link";

const ResturantNavBar = (props) => {
	return (
		<nav className="flex text-reg border-b pb-2">
			<Link href={`/resturant/${props.slug}`} className="mr-7">
				Overview
			</Link>
			<Link href={`/resturant/${props.slug}/menu`} className="mr-7">
				Menu
			</Link>
		</nav>
	);
};

export default ResturantNavBar;
