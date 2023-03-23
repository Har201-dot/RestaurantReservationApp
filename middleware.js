import { NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req) {
	const headersList = new Headers(req.headers);

	const bearerToken = headersList.get("authorization");

	if (!bearerToken) {
		return NextResponse.json({ errorMessage: "Unauthorised request" });
	}
	const token = bearerToken.split(" ")[1];
	if (!token) {
		return NextResponse.json({ errorMessage: "Unauthorised request" });
	}

	const secret = new TextEncoder().encode(process.env.JWT_SECRET);

	try {
		await jose.jwtVerify(token, secret);
	} catch (err) {
		return NextResponse.json({ errorMessage: "Unauthorised request" });
	}
}

export const config = {
	matcher: ["/api/auth/me"],
};
