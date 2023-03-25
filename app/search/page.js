import { PrismaClient, PRICE } from "@prisma/client";
import React from "react";
import Header from "./component/Header";
import SearchSideBar from "./component/SearchSideBar";
import ReasturantCard from "./component/ReasturantCard";

const prisma = new PrismaClient();

export const metadata = {
	title: "Search Resturants OpenTable",
};

const fetchRestByCity = async (searchParams) => {
	// console.log(searchParams);
	const where = {};
	// console.log();
	if (searchParams.city) {
		const location = {
			name: {
				equals: searchParams.city.toLowerCase(),
			},
		};
		where.location = location;
	}
	if (searchParams.cusine) {
		const cusine = {
			name: {
				equals: searchParams.cusine.toLowerCase(),
			},
		};
		where.cusine = cusine;
	}
	if (searchParams.price) {
		const price = {
			equals: searchParams.price,
		};
		where.price = price;
	}
	const select = {
		id: true,
		name: true,
		main_image: true,
		price: true,
		cusine: true,
		location: true,
		slug: true,
		reviews: true,
	};

	const rest = await prisma.restaurant.findMany({
		where,
		select,
	});
	return rest;
};

const fetchLocations = async () => {
	return await prisma.location.findMany({});
};

const fetchCusine = async () => {
	return await prisma.cuisine.findMany({});
};

const Search = async ({ searchParams }) => {
	// const city = searchParams.city;
	const rest = await fetchRestByCity(searchParams);

	const location = await fetchLocations();
	const cusine = await fetchCusine();
	return (
		<>
			<Header />
			<div className="flex py-4 m-auto w-2/3 justify-between items-start">
				<SearchSideBar
					locations={location}
					cusines={cusine}
					searchParams={searchParams}
				/>
				<div className="w-5/6">
					{rest.length ? (
						<>
							{rest.map((ele) => (
								<ReasturantCard key={rest.id} rest={ele} />
							))}
						</>
					) : (
						<p>Sorry, we found no resturants in this area</p>
					)}
				</div>
			</div>
		</>
	);
};

export default Search;
