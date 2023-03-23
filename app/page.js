import Header from "./component/Header";
import ResturantCard from "./component/ResturantCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchRest = async () => {
	const rest = await prisma.restaurant.findMany({
		select: {
			id: true,
			name: true,
			main_image: true,
			cusine: true,
			slug: true,
			location: true,
			price: true,
			reviews: true,
		},
	});
	return rest;
};

export default async function Home() {
	const rest = await fetchRest();
	// console.log(rest);
	return (
		<main>
			<Header />
			<div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
				{rest.map((ele) => (
					<ResturantCard resturant={ele} />
				))}
			</div>
		</main>
	);
}
