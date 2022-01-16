import gort from './bot/gort';
import { logging } from './core/logging';

logging
	.configure({
		minLevels: {
			'': 'trace',
		},
	})
	.registerConsoleLogger();

const bot = new gort();
