import Stars from "../../../component/Stars";
import { calculateReiviewRatingAverage } from "../../../../utils/calculateReiviewRatingAverage";
import React from "react";

const Rating = ({ reviews }) => {
	return (
		<div className="flex items-end">
			<div className="ratings mt-2 flex items-center">
				<Stars reviews={reviews} />
				<p className="text-reg ml-3">
					{calculateReiviewRatingAverage(reviews).toFixed(1)}
				</p>
			</div>
			<div>
				<p className="text-reg ml-4">
					{reviews.length} Review{reviews.length === 1 ? "" : "s"}
				</p>
			</div>
		</div>
	);
};

export default Rating;
