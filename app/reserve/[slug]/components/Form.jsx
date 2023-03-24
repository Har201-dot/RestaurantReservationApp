"use client";

import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import useReservation from "../../../../hooks/useReservation";

const Form = ({ slug, date, partySize }) => {
	const [inputs, setInputs] = useState({
		bookerFirstName: "",
		bookerLastName: "",
		bookerPhone: "",
		bookerEmail: "",
		bookerOccasion: "",
		bookerRequest: "",
	});

	const [day, time] = date.split("T");
	const [disabled, setDisabled] = useState(true);
	const [didBook, setDidBook] = useState(false);
	const { error, loading, createReservation } = useReservation();

	useEffect(() => {
		if (
			inputs.bookerFirstName &&
			inputs.bookerLastName &&
			inputs.bookerEmail &&
			inputs.bookerPhone
		) {
			return setDisabled(false);
		}
		return setDisabled(true);
	}, [inputs]);

	const handleChangeInput = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const handleClick = async () => {
		const booking = await createReservation({
			slug,
			partySize,
			time,
			day,
			bookerFirstName: inputs.bookerFirstName,
			bookerLastName: inputs.bookerLastName,
			bookerEmail: inputs.bookerEmail,
			bookerOccasion: inputs.bookerOccasion,
			bookerPhone: inputs.bookerPhone,
			bookerRequest: inputs.bookerRequest,
			setDidBook,
		});
	};

	return didBook ? (
		<div>
			<h1>You are all booked up</h1>
			<p>Enjoy your reservation !</p>
		</div>
	) : (
		<div className="mt-10 flex flex-wrap justify-between w-[660px]">
			<input
				type="text"
				className="border rounded p-3 w-80 mb-4"
				placeholder="First name"
				name="bookerFirstName"
				onChange={handleChangeInput}
				value={inputs.bookerFirstName}
			/>
			<input
				type="text"
				className="border rounded p-3 w-80 mb-4"
				placeholder="Last name"
				name="bookerLastName"
				value={inputs.bookerLastName}
				onChange={handleChangeInput}
			/>
			<input
				type="text"
				className="border rounded p-3 w-80 mb-4"
				placeholder="Phone number"
				name="bookerPhone"
				value={inputs.bookerPhone}
				onChange={handleChangeInput}
			/>
			<input
				type="text"
				className="border rounded p-3 w-80 mb-4"
				placeholder="Email"
				name="bookerEmail"
				value={inputs.bookerEmail}
				onChange={handleChangeInput}
			/>
			<input
				type="text"
				className="border rounded p-3 w-80 mb-4"
				placeholder="Occasion (optional)"
				name="bookerOccasion"
				value={inputs.bookerOccasion}
				onChange={handleChangeInput}
			/>
			<input
				type="text"
				className="border rounded p-3 w-80 mb-4"
				placeholder="Requests (optional)"
				name="bookerRequest"
				value={inputs.bookerRequest}
				onChange={handleChangeInput}
			/>
			<button
				onClick={handleClick}
				disabled={disabled || loading}
				className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
			>
				{loading ? (
					<CircularProgress color="inherit" />
				) : (
					"Complete Reservation"
				)}
			</button>
			<p className="mt-4 text-sm">
				By clicking “Complete reservation” you agree to the OpenTable Terms of
				Use and Privacy Policy. Standard text message rates may apply. You may
				opt out of receiving text messages at any time.
			</p>
		</div>
	);
};

export default Form;
