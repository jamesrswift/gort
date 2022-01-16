"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const helper_lib_1 = require("../lib/helper.lib");
const logging_1 = require("../logging");
const logger = logging_1.logging.getLogger('core.provider.databaseProvider');
dotenv_1.default.config();
let _mongoURI = 'mongodb://' + (0, helper_lib_1.OrFail)(process.env.DATABASE_URI) + '?authSource=admin';
mongoose_1.default
    .connect(_mongoURI)
    .then(() => {
    logger.debug(`MongoDB connected ${_mongoURI}`);
})
    .catch(logger.error.bind(logger));
exports.default = mongoose_1.default;
