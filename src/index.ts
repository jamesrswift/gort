import gort from './bot/gort';
import { logging } from './core/logging';

console.log('Starting GORT, loading logger');

logging
	.configure({
		minLevels: {
			'': 'info',
		},
	})
	.registerConsoleLogger();

const bot = new gort();
