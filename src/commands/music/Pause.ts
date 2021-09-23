import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando-ptbr';
import music from '../../music/Music';

type Args = {
	music: string;
};

export default class PauseCommand extends Command {
	constructor(client: CommandoClient) {
		super(client, {
			name: 'pause',
			memberName: 'pause',
			description: 'Pausa uma música, se houver alguma tocando.',
			group: 'music',
		});
	}
	async run(msg: CommandoMessage) {
		const guildId = msg.guild.id;

		if (music.queues[guildId].length > 0) {
			const { title } = music.queues[guildId][0];
			const paused = await music.pause(guildId);
			if (!paused) return msg.channel.send(`Iniciando \`${title}\``);
			return msg.channel.send(`Pausando \`${title}\``);
		}
		return msg.channel.send('Nenhuma música está tocando no momento.');
	}
}
