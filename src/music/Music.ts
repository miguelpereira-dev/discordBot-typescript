import ytdl, { videoInfo } from 'ytdl-core';
import ytsr, { Video } from 'ytsr';
import { CommandoMessage } from 'discord.js-commando-ptbr';
import { StreamDispatcher, VoiceConnection } from 'discord.js';

export type Item = {
	title: string;
	url: string;
	author: { name: string; iconUrl: string };
	thumbnailUrl: string;
};

class Music {
	public queue: Item[] = [];
	private dispatcher: StreamDispatcher;
	public paused: boolean;

	async addMusic(msg: CommandoMessage, music: string) {
		let addedMusic: Item;
		await this.search(music).then(async (video: Video) => {
			addedMusic = {
				title: video.title,
				url: video.url,
				author: {
					name: video.author.name,
					iconUrl: video.author.bestAvatar.url,
				},
				thumbnailUrl: video.bestThumbnail.url,
			};
			this.queue.push(addedMusic);
			if (this.queue.length == 1) await this.play(msg, video.url);
		});

		return addedMusic;
	}

	async skip(msg: CommandoMessage) {
		const skipedMusic = this.queue.shift();
		this.dispatcher.destroy();
		let hasAnother: boolean;
		if (this.queue.length > 0) {
			const current = this.queue[0];
			hasAnother = true;
			await this.play(msg, current.url);
		}
		return { hasAnother, skipedMusic };
	}

	async pause() {
		if (this.dispatcher) {
			if (this.paused) {
				this.dispatcher.resume();
			} else {
				this.dispatcher.pause();
			}
			this.paused = !this.paused;
			return this.paused;
		}
		return null;
	}

	private validate(url: string) {
		return ytdl.validateURL(url);
	}

	private async play(msg: CommandoMessage, url: string) {
		if (msg.member.voice.channel && this.validate(url)) {
			const connection = await msg.member.voice.channel.join();
			this.dispatcher = await this.getDispatcher(connection, url, msg);
			return this.dispatcher != null;
		}
	}

	private async search(search: string) {
		const filters = (await ytsr.getFilters(search)).get('Type').get('Video');
		const searchResult = await ytsr(filters.url, { limit: 1 });
		return searchResult.items[0];
	}

	private async getDispatcher(
		connection: VoiceConnection,
		url: string,
		msg: CommandoMessage
	) {
		connection.voice.setDeaf(true);

		const info = await ytdl.getInfo(url);
		const format = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });

		const input = ytdl(url, {
			quality: 'highestaudio',
			format,
		});

		let dispatcher: StreamDispatcher;
		try {
			dispatcher = connection.play(input, {
				volume: 0.2,
				highWaterMark: 1 << 25,
			});
		} catch (err) {
			console.error(err);
		}

		const { title } = info.videoDetails;

		dispatcher.on('start', () => {
			console.log(title + ' is now playing!');
		});

		dispatcher.on('finish', () => {
			console.log(title + ' has finished playing!');
			this.queue.shift();
			dispatcher.destroy();

			if (this.queue.length > 0) {
				const current = this.queue[0];
				this.play(msg, current.url);
			} else {
				setTimeout(() => {
					msg.client.voice.connections.first().disconnect();
				}, 5000);
			}
		});

		dispatcher.on('error', console.error);

		this.paused = dispatcher.paused;
		return dispatcher;
	}
}

const music = new Music();
export default music;