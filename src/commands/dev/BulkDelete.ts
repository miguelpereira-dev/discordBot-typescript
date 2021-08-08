// const Commando = require('discord.js-commando-ptbr');

// module.exports = class BulkDeleteCommand extends Commando.Command {
// 	constructor(client) {
// 		super(client, {
// 			name: 'bulkdel',
// 			memberName: 'bulkdel',
// 			group: 'dev',
// 			args: [
// 				{
// 					key: 'confirm',
// 					label: 'confirm',
// 					prompt: 'Tem certeza que deseja apagar todas as mensagens enviadas nos últimos 14 dias deste canal? [s/n]',
// 					type: 'boolean',
// 				},
// 			],
// 			guarded: true,
// 			description: 'Delete all messages of the channel the command is called.',
// 		});
// 	}

// 	async run(msg) {
// 		msg.channel.bulkDelete(100);
// 	}
// };
