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
exports.brigadeOrigin = void 0;
const condition_class_1 = require("../condition.class");
const brigade_manager_1 = __importDefault(require("../managers/brigade.manager"));
class brigadeOrigin extends condition_class_1.executable {
    execute(args) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get threadID
            if (args.targetType == 'Submission')
                return ''; // New threads can't be brigaded
            const threadID = args.target.link_id.slice(3);
            // Check if thread is on brigaded list
            if (yield brigade_manager_1.default.Instance.isTargetOnBrigadeList(threadID)) {
                const info = yield brigade_manager_1.default.Instance.getBrigadeEntryInfo(threadID);
                return info.origin;
            }
            return '';
        });
    }
}
exports.brigadeOrigin = brigadeOrigin;
