import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando-ptbr';
import music from '../../music/Music';

export default class PlayCommand extends Command {
	constructor(client: CommandoClient) {
		super(client, {
			name: 'skip',
			description:
				'Para a música atual e começa a próxima da fila, se houver alguma',
			group: 'music',
			memberName: 'skip',
			aliases: ['s', 'fs'],
		});
	}
	async run(msg: CommandoMessage) {
		const guildId = msg.guild.id;

		if (music.queues[guildId].length == 0)
			return msg.channel.send('`Nenhuma música está sendo tocada.`');

		const { skipedMusic, hasAnother } = await music.skip(msg, guildId);
		if (!hasAnother) {
			setTimeout(() => {
				if (this.client.voice.connections.first())
					this.client.voice.connections.first().disconnect();
			}, 1000 * 60 * 2);
		}

		const embed = new MessageEmbed()
			.setColor('RED')
			.setFooter(msg.author.username + ':')
			.addFields({
				name: 'Parando música:',
				value: skipedMusic.title,
			});

		return await msg.channel.send(embed);
	}
}
