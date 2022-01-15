import { logging, LogEntry } from './core/logging';

logging
	.configure({
		minLevels: {
			'': 'trace',
		},
	})
	.registerConsoleLogger();

import gort from './bot/gort';
const bot = new gort();
