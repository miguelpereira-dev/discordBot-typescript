import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando-ptbr';
import music from '../../music/Music';

type Args = {
	music: string;
};

export default class PlayCommand extends Command {
	constructor(client: CommandoClient) {
		super(client, {
			name: 'skip',
			description:
				'Para a música atual e começa a próxima da fila, se houver alguma',
			group: 'music',
			memberName: 'skip',
			aliases: ['s'],
		});
	}
	async run(msg: CommandoMessage) {
		if (music.queue.length == 0)
			return msg.channel.send('`Nenhuma música está sendo tocada.`');

		const { skipedMusic, hasAnother } = await music.skip(msg);
		if (!hasAnother) {
			setTimeout(() => {
				this.client.voice.connections.first().disconnect();
			}, 5000);
		}
		this.client;

		return await msg.channel.send(`Parando música \` ${skipedMusic.title} \` `);
	}
};
