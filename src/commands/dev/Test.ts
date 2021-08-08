import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando-ptbr';

type Args = {
	test: any;
};

export default class BulkDeleteCommand extends Command {
	constructor(client: CommandoClient) {
		super(client, {
			name: 'test',
			memberName: 'test',
			group: 'dev',
			args: [
				{
					key: 'test',
					label: 'teste',
					prompt: 'Teste',
					type: 'string',
				},
			],
			guarded: true,
			description: 'Teste',
		});
	}

	async run(msg: CommandoMessage, args: Args) {
		return msg.channel.send(`Teste: ${args.test}`);
	}
};
