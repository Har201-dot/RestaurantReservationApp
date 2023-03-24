import { times } from "../../../../data/times";
import { PrismaClient } from "@prisma/client";
import { findAvailableTables } from "../../../../services/restaurant/findAvailableTables";

const prisma = new PrismaClient();

export default async function handler(req, res) {
	if (req.method === "GET") {
		const { slug, day, time, partySize } = req.query;

		if (!day || !time || !partySize) {
			return res.status(400).json({
				errorMessage: "Invalid data provided",
			});
		}

		const restaurant = await prisma.restaurant.findUnique({
			where: {
				slug,
			},
			select: {
				tables: true,
				open_time: true,
				close_time: true,
			},
		});
		if (!restaurant) {
			return res.status(400).json({
				errorMessage: "Invalid data provided",
			});
		}

		const searchTimesWithTables = await findAvailableTables({
			day,
			time,
			res,
			restaurant,
		});

		if (!searchTimesWithTables) {
			return res.status(400).json({
				errorMessage: "Invalid data provided",
			});
		}

		const availabilities = searchTimesWithTables
			.map((t) => {
				const sumSeats = t.tables.reduce((sum, table) => {
					return sum + table.seats;
				}, 0);

				return {
					time: t.time,
					available: sumSeats >= parseInt(partySize),
				};
			})
			.filter((availability) => {
				const timeIsAFterOpeningHour =
					new Date(`${day}T${availability.time}`) >=
					new Date(`${day}T${restaurant.open_time}`);
				const timeIsBeforeCLosingHour = new Date(
					`${day}T${restaurant.close_time}`
				);

				return timeIsBeforeCLosingHour && timeIsAFterOpeningHour;
			});

		return res.json(availabilities);
	}
}
