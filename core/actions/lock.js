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
const logger = logging_1.logging.getLogger('core.action.lock');
/**
 * Lock Action
 *
 * @category Actions
 */
class lockAction extends action_class_1.default {
    constructor() {
        super();
    }
    execute(args) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`Executing lock action on ${args.target.id}`);
            // @ts-ignore
            if (!target.locked) {
                // @ts-ignore
                target.lock();
            }
        });
    }
}
exports.default = lockAction;