import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando-ptbr';

type Args = {
	member: object;
};
export default class KickCommand extends Command {
	constructor(client: CommandoClient) {
		super(client, {
			name: 'kick',
			memberName: 'kick',
			group: 'admin',
			description: 'Expulsa um usuário por um determinado número de dias.',
			aliases: ['expulsar'],
			userPermissions: ['BAN_MEMBERS'],
			argsCount: 2,
			args: [
				{
					key: 'member',
					prompt: 'Identifique o usuário a ser expulso',
					label: 'usuário',
					type: 'member',
					error: 'Marque o membro a ser excluído.',
				},
			],
		});
	}

	async run(msg: CommandoMessage, args: Args) {
		try {
			const target = msg.guild.members.cache.get(
				msg.mentions.users.first().id
			);
			await target.kick();
		} catch (e) {
			return msg.reply('Não consigo banir este usuário.');
		}
	}
};
