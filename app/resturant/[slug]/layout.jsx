import React from "react";
import Header from "./components/Header";
import { Metadata } from "next";

export async function generateMetadata({ params }) {
	const title = params.slug;
	return { title: title };
}

export const metadata = {
	title: "Milestones Grill (Toronto) | OpenTable",
};

const ResturantLayout = ({ params, children }) => {
	return (
		<main>
			<Header name={params.slug} />
			<div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
				{children}
			</div>
		</main>
	);
};

export default ResturantLayout;
