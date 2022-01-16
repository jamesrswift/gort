"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const action_class_1 = __importDefault(require("../action.class"));
const logging_1 = require("../logging");
const usernotes_provider_1 = __importDefault(require("../providers/usernotes.provider"));
const logger = logging_1.logging.getLogger('core.action.usernote');
/**
 * Usernote Action
 *
 * @category Actions
 */
class usernoteAction extends action_class_1.default {
    /**
     * @param message  Static message to be added to user's usernotes
     */
    constructor(message) {
        super();
        this._message = message;
    }
    /**
     * @param args  Structured information regarding the user, comment,
     *              submission and other factors relating to the pipeline
     * @returns Dynamic message to be added to the user's usernotes
     */
    usernoteGenerator(args) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = this._message) !== null && _a !== void 0 ? _a : 'No Message Provided!';
        });
    }
    /**
     * @param args  Structured information regarding the user, comment,
     *              submission and other factors relating to the pipeline
     */
    execute(args) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`Executing lock action on ${args.target.id}`);
            usernotes_provider_1.default.Instance.addUsernoteByName(args.user.name, yield this.usernoteGenerator(args));
        });
    }
}
exports.default = usernoteAction;
