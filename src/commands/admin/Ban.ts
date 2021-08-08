import Commando, { CommandoMessage } from 'discord.js-commando-ptbr';

type Args = {
	member: object;
	days: number;
	reason: string;
};

export default class KickCommand extends Commando.Command {
	constructor(client: Commando.CommandoClient) {
		super(client, {
			name: 'ban',
			memberName: 'ban',
			group: 'admin',
			description: 'Bane um usuário por um determinado número de dias.',
			aliases: ['banir'],
			userPermissions: ['BAN_MEMBERS'],
			argsCount: 2,
			argsType: '',
			args: [
				{
					key: 'member',
					prompt: 'Identifique o usuário a ser banido',
					label: 'usuário',
					type: 'member',
					error: 'Marque um membro válido a ser excluído.',
				},
				{
					key: 'days',
					prompt: 'Identifique o número de dias',
					label: 'dias',
					type: 'integer',
					error: 'Especifique um número válido de dias em que deseja que o usuário seja banido.',
					default: 7,
				},
				{
					key: 'reason',
					prompt: 'Identifique o motivo do banimento',
					label: 'motivo',
					type: 'string',
					error: 'Especifique um motivo válido.',
					default: 'Você foi banido por algum comportamento indevido',
				},
			],
		});
	}

	async run(msg: CommandoMessage, args: Args) {
		try {
			const target = msg.guild.members.cache.get(msg.mentions.users.first().id);
			await target.ban({ days: args.days, reason: args.reason });
		} catch (e) {
			return msg.reply('Não consigo banir este usuário este usuário.');
		}
	}
}
