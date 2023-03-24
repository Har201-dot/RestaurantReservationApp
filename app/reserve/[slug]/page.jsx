import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Form from "./components/Form";
import Header from "./components/Header";

export const metadata = {
	title: "Reserve at Milestones Grill (Toronto)",
};

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug) => {
	const restaurant = await prisma.restaurant.findUnique({
		where: {
			slug,
		},
	});

	if (!restaurant) {
		notFound();
	}

	return restaurant;
};

const Reserve = async ({ params, searchParams }) => {
	const restaurant = await fetchRestaurantBySlug(params.slug);
	console.log(searchParams);
	return (
		<div className="border-t h-screen">
			<div className="py-9 w-3/5 m-auto">
				<Header
					image={restaurant.main_image}
					name={restaurant.name}
					date={searchParams.date}
					partySize={searchParams.partySize}
				/>
				<Form
					image={restaurant.main_image}
					name={restaurant.name}
					date={searchParams.date}
					slug={params.slug}
					partySize={searchParams.partySize}
				/>
			</div>
		</div>
	);
};

export default Reserve;
