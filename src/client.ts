require('dotenv').config();
import path from 'path';
import Commando from 'discord.js-commando-ptbr';
import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';

import LevelController from './level/LevelController';

const client = new Commando.Client({
	owner: '401087598883504141',
	commandPrefix: '$',
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
		{ id: 'dev', name: 'Desenvolvimento', guarded: true },
		{ id: 'music', name: 'Música' },
		{ id: 'level', name: 'Nível (xp)' },
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

const levelController = new LevelController(client);

client.login(process.env.TOKEN);
