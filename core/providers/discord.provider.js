"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.DiscordProvider = void 0;
const discord_js_1 = __importStar(require("discord.js"));
const helper_lib_1 = require("../lib/helper.lib");
const dotenv_1 = __importDefault(require("dotenv"));
const stream_1 = require("stream");
class DiscordProvider extends stream_1.EventEmitter {
    constructor() {
        super();
        //
        // Channel Management
        //
        this._channelList = new Map();
        dotenv_1.default.config();
        this._client = new discord_js_1.default.Client({
            intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
        });
        this._client.on('ready', this.onConnection.bind(this));
        this._client.on('messageCreate', this.onMessage.bind(this));
        void this._client.login((0, helper_lib_1.OrFail)(process.env.DISCORD_TOKEN));
    }
    static get Instance() {
        return this._instance || (this._instance = new DiscordProvider());
    }
    //
    // Event Handling
    //
    onConnection() {
        this.emit('ready');
    }
    onMessage(message) {
        this.emit('message', message);
    }
    getChannel(channelID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._channelList.has(channelID))
                return this._channelList.get(channelID);
            return new Promise((resolve, reject) => {
                void this._client.channels.fetch(channelID).then((channel) => {
                    this._channelList.set(channelID, channel);
                    resolve(channel);
                });
            });
        });
    }
    sendMessage(options, channelID) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // Check if muted first
            return (_a = (yield this.getChannel((0, helper_lib_1.OrDefault)(channelID, (0, helper_lib_1.OrFail)(process.env.DISCORD_CHANNEL))))) === null || _a === void 0 ? void 0 : _a.send(options);
        });
    }
}
exports.DiscordProvider = DiscordProvider;
