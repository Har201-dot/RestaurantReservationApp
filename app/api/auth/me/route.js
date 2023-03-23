import { NextResponse } from "next/server";
import { headers } from "next/headers";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, res) {
	const { searchParams } = new URL(req.url);
	const bearerToken = searchParams.get("authorization");
	// const headersList = headers();
	// const bearerToken = headersList.get("authorization");
	// console.log(bearerToken);
	const token = bearerToken.split(" ")[1];
	// console.log(token);
	const payload = jwt.decode(token);
	if (!payload.email) {
		return NextResponse.json({ errorMessage: "Unauthorised request" });
	}

	const user = await prisma.user.findUnique({
		where: {
			email: payload.email,
		},
		select: {
			id: true,
			first_name: true,
			last_name: true,
			email: true,
			city: true,
			phone: true,
		},
	});

	if (!user) {
		return NextResponse({
			errorMessage: "User not found !!!",
		});
	}

	return NextResponse.json({
		id: user.id,
		first_name: user.last_name,
		last_name: user.last_name,
		email: user.email,
		city: user.city,
		phone: user.phone,
	});

	// return NextResponse.json({ me: payload });
}
