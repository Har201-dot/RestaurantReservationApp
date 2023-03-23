import { PRICE } from "@prisma/client";
import React from "react";

const Price = (props) => {
	const renderPrice = () => {
		if (props.price === PRICE.CHEAP) {
			return (
				<>
					<span>$$</span> <span className="text-gray-400">$$</span>
				</>
			);
		} else if (props.price === PRICE.REGULAR) {
			return (
				<>
					<span>$$$</span> <span className="text-gray-400">$</span>
				</>
			);
		} else {
			return (
				<>
					<span>$$$$</span>
				</>
			);
		}
	};
	return <p className="text-reg font-light flex mr-3">{renderPrice()}</p>;
};

export default Price;
