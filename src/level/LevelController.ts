import { CommandoClient, CommandoMessage } from 'discord.js-commando-ptbr';
import level from './Level';

export default class LevelController {
	constructor(client: CommandoClient) {
		// client.on('message', (msg: CommandoMessage) => {
		// 	if (msg.guild) level.setExperience(msg.guild.id, msg.member.id, 1);
		// });
	}
}
