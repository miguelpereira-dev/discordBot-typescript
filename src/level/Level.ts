import { CommandoClient, CommandoMessage } from 'discord.js-commando-ptbr';
import mongo from '../database/mongo';
import userSchema from '../database/schemas/user';

type Cache = {
	[index: string]: any;
};

class Level {
	public cache: Cache = {};

	constructor() {}

	async setExperience(guildId: string, userId: string, experience: number) {
		try {
			const result = await userSchema.findOneAndUpdate(
				{
					guildId,
					userId,
				},
				{
					guildId,
					userId,
					$inc: {
						experience,
					},
				},
				{
					upsert: true,
					new: true,
					useFindAndModify: true,
				}
			);

			this.cache[`${guildId}-${userId}`] = result.experience;
			return result.experience;
		} finally {
			mongo.connection.close();
		}
	}

	async getExperience(guildId: string, userId: string): Promise<number> {
		const cachedValue = this.cache[`${guildId}-${userId}`];
		if (cachedValue) {
			return cachedValue;
		}

		try {
			const result = await userSchema.findOne({
				guildId,
				userId,
			});

			let experience = 0;
			if (result) {
				experience = result.experience;
			} else {
				await new userSchema({
					guildId,
					userId,
					experience,
				}).save();
			}

			this.cache[`${guildId}-${userId}`] = result.experience;
			return experience;
		} finally {
			mongo.connection.close();
		}
	}
}

const level = new Level();
export default level;
