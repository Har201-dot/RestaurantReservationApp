import Link from "next/link";
import React from "react";
import Price from "./Price";
import Stars from "./Stars";

const ResturantCard = (props) => {
	return (
		<div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
			<Link href={`/resturant/${props.resturant.slug}`}>
				<img src={props.resturant.main_image} alt="" className="w-full h-36" />
				<div className="p-1">
					<h3 className="font-bold text-2xl mb-2">{props.resturant.name}</h3>
					<div className="flex items-start">
						<Stars reviews={props.resturant.reviews} />
						<p className="ml-2">
							{props.resturant.reviews.length} review
							{props.resturant.reviews.length === 1 ? "" : "s"}
						</p>
					</div>
					<div className="flex text-reg font-light capitalize">
						<p className=" mr-3">{props.resturant.cusine.name}</p>
						<Price price={props.resturant.price} />
						<p>{props.resturant.location.name}</p>
					</div>
					<p className="text-sm mt-1 font-bold">Booked 3 times today</p>
				</div>
			</Link>
		</div>
	);
};

export default ResturantCard;
