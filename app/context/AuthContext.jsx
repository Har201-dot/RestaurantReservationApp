"use client";

import useAuth from "@/hooks/useAuth";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";

export const AuthenticationContext = createContext({
	loading: false,
	data: null,
	err: null,
	setAuthState: () => {},
});

const AuthContext = ({ children }) => {
	const [authState, setAuthState] = useState({
		loading: true,
		data: null,
		err: null,
	});
	// const { fetchUser } = useAuth();

	const fetchUser = async () => {
		try {
			const jwt = getCookie("jwt");
			if (!jwt) {
				return setAuthState({
					data: null,
					err: null,
					loading: false,
				});
			}

			const response = await axios.get("/api/auth/me", {
				headers: {
					authorization: `Bearer ${jwt}`,
				},
			});

			axios.defaults.headers.common["authorization"] = `Bearer ${jwt}`;
			setAuthState({
				data: response.data,
				error: null,
				loading: false,
			});
		} catch (err) {
			setAuthState({
				data: null,
				error: "Session expired or doesnt exist",
				loading: false,
			});
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);
	return (
		<AuthenticationContext.Provider
			value={{
				...authState,
				setAuthState,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};

export default AuthContext;
