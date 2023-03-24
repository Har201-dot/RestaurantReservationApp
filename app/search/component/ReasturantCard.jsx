import Price from "../../component/Price";
import Stars from "../../component/Stars";
import { calculateReiviewRatingAverage } from "../../../utils/calculateReiviewRatingAverage";
import Link from "next/link";
import React from "react";

const ReasturantCard = (props) => {
	const rest = props.rest;
	const renderRatingText = () => {
		const rating = calculateReiviewRatingAverage(rest.reviews);
		console.log(rating);
		if (rating > 4) return "Awesome";
		else if (rating <= 4 && rating > 3) {
			return "Good";
		} else if (rating <= 3 && rating > 0) {
			return "Average";
		} else "";
	};

	return (
		<div className="border-b flex pb-5 ml-4">
			<img src={rest.main_image} alt="" className="w-44 h-36 rounded" />
			<div className="pl-5">
				<h2 className="text-3xl">{rest.name}</h2>
				<div className="flex items-start">
					<div className="flex mb-2">
						<Stars reviews={rest.reviews} />
					</div>
					<p className="ml-2 text-sm">{renderRatingText()}</p>
				</div>
				<div className="mb-9">
					<div className="font-light flex text-reg">
						<Price price={rest.price} />

						<p className="mr-4">{rest.cusine.name}</p>
						<p className="mr-4">{rest.location.name}</p>
					</div>
				</div>
				<div className="text-red-600">
					<Link href={`/resturant/${rest.slug}`}>View more information</Link>
				</div>
			</div>
		</div>
	);
};

export default ReasturantCard;
