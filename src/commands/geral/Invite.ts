import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando-ptbr';

export default class PingCommand extends Command {
	constructor(client: CommandoClient) {
		super(client, {
			name: 'invite',
			memberName: 'invite',
			description: 'Gera um link de convite.',
			group: 'geral',
			argsType: 'single',
		});
	}

	async run(msg: CommandoMessage) {
		let message;
		this.client.generateInvite().then(async (link) => {
			message = await msg.reply(link);
		});
		return message;
	}
};
