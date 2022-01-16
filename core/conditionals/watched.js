"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWatched = void 0;
const condition_class_1 = require("../condition.class");
const watched_manager_1 = __importDefault(require("../managers/watched.manager"));
class isWatched extends condition_class_1.executable {
    execute(args) {
        return watched_manager_1.default.Instance.isUserWatched(args.user.name.toLowerCase());
    }
}
exports.isWatched = isWatched;
