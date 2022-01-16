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
const helper_lib_1 = require("../lib/helper.lib");
const logging_1 = require("../logging");
const logger = logging_1.logging.getLogger('core.action.reply');
/**
 * Reply Action
 *
 * @category Actions
 */
class replyAction extends action_class_1.default {
    constructor(options, text) {
        super();
        this._sOpts = {
            distinguish: (0, helper_lib_1.OrDefault)(options.distinguish, false),
            lock: (0, helper_lib_1.OrDefault)(options.lock, false),
            sticky: (0, helper_lib_1.OrDefault)(options.sticky, false),
        };
        this._replyText = text;
    }
    execute(args) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info(`Executing reply action on ${args.target.id}`);
            // Comment: Not sure I like the below type casting, but from what I can tell from the documentation,
            //          Snoowrap.Comment.reply and Snoowrap.Submission.reply should both return a Promise<Snoowrap.Comment>
            (args.target.reply(this._replyText(args.user, args.target))).then((comment) => {
                if (this._sOpts.distinguish || this._sOpts.sticky) {
                    comment.distinguish({
                        status: this._sOpts.distinguish,
                        sticky: this._sOpts.sticky,
                    });
                }
                if (this._sOpts.lock) {
                    // @ts-ignore
                    comment.lock();
                }
            });
        });
    }
}
exports.default = replyAction;
