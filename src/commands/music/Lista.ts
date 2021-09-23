import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando-ptbr';
import music, { Item } from '../../music/Music';

export default class ListaCommand extends Command {
	constructor(client: CommandoClient) {
		super(client, {
			name: 'lista',
			memberName: 'lista',
			group: 'music',
			aliases: ['list', 'playlist'],
			description: 'Mostra as músicas na playlist atual.',
		});
	}

	async run(msg: CommandoMessage) {
		const guildId = msg.guild.id;

		if (music.queues[guildId].length == 0) return msg.channel.send('`A fila está vazia.`');
		
		const { thumbnailUrl, title, url } = music.queues[guildId][0];
		const noFirstMusic: Item[] = [].concat(music.queues[guildId]);
		noFirstMusic.shift();

		const embed = new MessageEmbed()
			.setTitle(`Tocando agora [0]:\n \`${title}\``)
			.setAuthor('Playlist atual')
			.setURL(url)
			.setColor('RED')
			.setThumbnail(thumbnailUrl);
		if (noFirstMusic.length > 0)
			noFirstMusic.forEach((item, index) => {
				embed.addFields({
					name: `[${index + 1}]:`,
					value: `\`${item.title}\``,
					inline: true,
				});
			});

		return await msg.channel.send(embed);
	}
}
