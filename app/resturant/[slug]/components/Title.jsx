import React from "react";

const Title = (props) => {
	return (
		<div className="mt-4 border-b pb-6">
			<h1 className="font-bold text-6xl">{props.name}</h1>
		</div>
	);
};

export default Title;
