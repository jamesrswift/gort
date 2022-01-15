import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { OrFail } from '../lib/helper.lib';
import { logging } from '../logging';

const logger = logging.getLogger('core.provider.databaseProvider');

dotenv.config();
let _mongoURI =
	'mongodb://' + OrFail(process.env.DATABASE_URI) + '?authSource=admin';
mongoose
	.connect(_mongoURI)
	.then(() => {
		logger.debug(`MongoDB connected ${_mongoURI}`);
	})
	.catch(logger.error.bind(logger));

export default mongoose;
