import Link from "next/link";
import React from "react";
import { PRICE } from "@prisma/client";

const SearchSideBar = ({ locations, cusines, searchParams }) => {
	return (
		<div className="w-1/5">
			<div className="border-b pb-4 flex flex-col">
				<h1 className="mb-2">Region</h1>
				{locations.map((location) => (
					<Link
						href={{
							pathname: "/search",
							query: {
								...searchParams,
								city: location.name,
							},
						}}
						className="font-light text-reg capitalize"
						key={location.id}
					>
						{location.name}
					</Link>
				))}
			</div>
			<div className="border-b pb-4 mt-3 flex flex-col">
				<h1 className="mb-2">Cuisine</h1>
				{cusines.map((cusine) => (
					<Link
						href={{
							pathname: "/search",
							query: {
								...searchParams,
								cusine: cusine.name,
							},
						}}
						className="font-light text-reg capitalize"
						key={cusine.id}
					>
						{cusine.name}
					</Link>
				))}
			</div>
			<div className="mt-3 pb-4">
				<h1 className="mb-2">Price</h1>
				<div className="flex">
					<Link
						href={{
							pathname: "/search",
							query: {
								...searchParams,
								price: PRICE.CHEAP,
							},
						}}
						className="border w-full text-center text-reg font-light rounded-l p-2"
					>
						$
					</Link>
					<Link
						href={{
							pathname: "/search",
							query: {
								...searchParams,
								price: PRICE.REGULAR,
							},
						}}
						className="border-r border-t border-b w-full text-center text-reg font-light p-2"
					>
						$$
					</Link>
					<Link
						href={{
							pathname: "/search",
							query: {
								...searchParams,
								price: PRICE.EXPENSIVE,
							},
						}}
						className="border-r border-t border-b w-full text-center text-reg font-light p-2 rounded-r"
					>
						$$$
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SearchSideBar;
