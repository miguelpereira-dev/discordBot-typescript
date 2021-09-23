import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando-ptbr';
import { MessageEmbed } from 'discord.js';
import music from '../../music/Music';

type Args = {
	music: string;
};

export default class PlayCommand extends Command {
	constructor(client: CommandoClient) {
		super(client, {
			name: 'play',
			description: 'Toca uma música do youtube',
			group: 'music',
			memberName: 'play',
			aliases: ['p'],
			args: [
				{
					key: 'music',
					label: 'música',
					prompt: 'especifique uma música ou url do youtube',
					type: 'string',
					default: '',
				},
			],
		});
	}
	async run(msg: CommandoMessage, args: Args) {
		if (!args.music && !music.paused)
			return msg.channel.send('Especifique uma música ou url do youtube');

		if (msg.member.voice.channel) {
			if (music.paused) {
				
				await music.pause(msg.guild.id);
				return;
			}

			const { title, thumbnailUrl, author, url } = await music.addMusic(
				msg,
				args.music,
				msg.guild.id
			);

			const embed = new MessageEmbed()
				.setTitle(`Adicionando à fila: \n\`${title}\``)
				.setURL(url)
				.setAuthor('Nova música')
				.setColor('DARK_PURPLE')
				.setThumbnail(thumbnailUrl)
				.addFields({
					name: 'Posição na fila: ',
					value:
						music.queues[msg.guild.id].length == 1
							? '`Tocando agora!`'
							: `\` ${music.queues[msg.guild.id].length - 1} \``,
				})
				.setFooter(author.name, author.iconUrl);

			return await msg.channel.send(embed);
		}
		return msg.reply('Você não está em um canal de voz.');
	}
}
