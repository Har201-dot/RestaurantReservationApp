import React from "react";
import Header from "../components/Header";
import ResturantNavBar from "../components/ResturantNavBar";
import Menu from "../components/Menu";
import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateMetadata({ params }) {
	const title = params.slug;
	return { title: title };
}

const fetchItemsMenu = async (slug) => {
	const rest = await prisma.restaurant.findUnique({
		where: {
			slug,
		},
		select: {
			items: true,
		},
	});

	if (!rest) {
		throw new Error();
	}
	return rest.items;
};

const ResturantMenu = async ({ params }) => {
	const menu = await fetchItemsMenu(params.slug);

	return (
		<>
			<div className="bg-white w-[100%] rounded p-3 shadow">
				<ResturantNavBar slug={params.slug} />
				<Menu menu={menu} />
			</div>
		</>
	);
};

export default ResturantMenu;
