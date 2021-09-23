import path from 'path';
import Commando from 'discord.js-commando-ptbr';
import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';
import dotenv from 'dotenv';
dotenv.config();

const client = new Commando.Client({
	owner: '401087598883504141',
	commandPrefix: process.env.PREFIX || '-',
});

client
	.setProvider(
		sqlite
			.open({ filename: 'database.db', driver: sqlite3.Database })
			.then((db) => new Commando.SQLiteProvider(db))
	)
	.catch(console.error);

client.on('commandRegister', (command) =>
	console.log(`Registered command: [${command.name}] of group {${command.group.name}}`)
);

client.registry
	.registerDefaultTypes()
	.registerGroups([
		{ id: 'geral', name: 'Gerais' },
		{ id: 'util', name: 'Utilitários' },
		{ id: 'admin', name: 'Moderação' },
		{ id: 'music', name: 'Música' },
	])
	.registerDefaultCommands({
		help: true,
		unknownCommand: true,
		commandState: false,
		eval: false,
		prefix: true,
		ping: true,
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', async () => {
	console.log('Client ready as ' + client.user?.tag);
});

client.login(process.env.TOKEN);
