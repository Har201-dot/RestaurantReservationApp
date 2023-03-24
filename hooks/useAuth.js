import { AuthenticationContext } from "../app/context/AuthContext";
import axios from "axios";
import { useContext } from "react";
import { deleteCookie, getCookie, removeCookies } from "cookies-next";

const useAuth = () => {
	const { setAuthState } = useContext(AuthenticationContext);

	const signin = async ({ email, password }, handleClose) => {
		setAuthState({
			data: null,
			loading: true,
			err: null,
		});
		try {
			const resp = await axios.post("/api/auth/signin", {
				email: email,
				password: password,
			});
			// console.log(resp);
			setAuthState({
				data: resp.data,
				loading: false,
				err: resp.data.errorMessage,
			});
			handleClose();
		} catch (err) {
			setAuthState({
				data: null,
				loading: true,
				err: "Email or Password is Invalid",
			});
		}
	};

	const signup = async (
		{ email, password, firstName, lastName, city, phone },
		handleClose
	) => {
		setAuthState({
			data: null,
			err: null,
			loading: true,
		});
		try {
			const response = await axios.post("/api/auth/signup", {
				email,
				password,
				firstName,
				lastName,
				city,
				phone,
			});
			setAuthState({
				data: response.data,
				error: null,
				loading: false,
			});
			handleClose();
		} catch (err) {
			setAuthState({
				data: null,
				error: "Email or Password is Invalid",
				loading: false,
			});
		}
	};

	// const fetchUser = async () => {
	// 	try {
	// 		const jwt = getCookie("jwt");
	// 		if (!jwt) {
	// 			return setAuthState({
	// 				data: null,
	// 				err: null,
	// 				loading: false,
	// 			});
	// 		}

	// 		const response = await axios.get("/api/auth/me", {
	// 			headers: {
	// 				authorization: `Bearer ${jwt}`,
	// 			},
	// 		});

	// 		axios.defaults.headers.common["authorization"] = `Bearer ${jwt}`;
	// 		setAuthState({
	// 			data: response.data,
	// 			error: null,
	// 			loading: false,
	// 		});
	// 	} catch (err) {
	// 		setAuthState({
	// 			data: null,
	// 			error: "Session expired or doesnt exist",
	// 			loading: false,
	// 		});
	// 	}
	// };

	const signout = () => {
		deleteCookie("jwt");
		setAuthState({
			data: null,
			error: null,
			loading: false,
		});
	};

	return {
		signin,
		signup,
		// fetchUser,
		signout,
	};
};

export default useAuth;
