import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando-ptbr';
import level from '../../level/Level';

export default class LevelCommand extends Command {
	constructor(client: CommandoClient) {
		super(client, {
			name: 'level',
			memberName: 'level',
			group: 'level',
			description: 'Mostra o nível do jogador marcado ou de si mesmo.',
			argsCount: 1,
			args: [
				{
					key: 'member',
					type: 'string',
					default: '',
					prompt: 'Indique um usuário para ver seu nível.',
				},
			],
		});
	}

	async run(msg: CommandoMessage) {
		const target = msg.mentions.users.first() || msg.author;

		let currentLevel = 0;
		let requiredExperience = 20;
		let experience = await level.getExperience(msg.guild.id, target.id);
		while (experience > 0) {
			experience -= requiredExperience;
			requiredExperience *= 1.1;
			currentLevel++;
		}
		return msg.reply(`O nível de ${target.tag} é ${currentLevel}`);
	}
}
