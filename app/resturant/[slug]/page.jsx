import { PrismaClient } from "@prisma/client";
import React from "react";
import ResturantNavBar from "./components/ResturantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

const fetchRest = async (slug) => {
	const rest = await prisma.restaurant.findUnique({
		where: {
			slug,
		},
		select: {
			id: true,
			name: true,
			images: true,
			description: true,
			slug: true,
			reviews: true,
			open_time: true,
			close_time: true,
		},
	});
	if (!rest) {
		notFound();
	}
	return rest;
};

const RestaurantDetails = async (props) => {
	const rest = await fetchRest(props.params.slug);
	// console.log(rest.images);
	return (
		<>
			<div className="bg-white w-[70%] rounded p-3 shadow">
				<ResturantNavBar slug={rest.slug} />
				<Title name={rest.name} />
				<Rating reviews={rest.reviews} />
				<Description desc={rest.description} />
				<Images img={rest.images} />
				<Reviews reviews={rest.reviews} />
			</div>
			<div className="w-[27%] relative text-reg">
				<ReservationCard
					openTime={rest.open_time}
					closeTime={rest.close_time}
					slug={rest.slug}
				/>
			</div>
		</>
	);
};

export default RestaurantDetails;
