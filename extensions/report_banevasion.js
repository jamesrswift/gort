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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportBanEvasion = void 0;
function reportBanEvasion(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user._post({
            uri: 'api/report?redditWebClient=desktop2x&app=desktop2x-client-production&raw_json=1&gilding_detail=1',
            form: {
                api_type: 'json',
                from_help_desk: true,
                reason: 'site_reason_selected',
                site_reason: "It's ban evasion",
                sr_name: 'CoronavirusUK',
                usernames: user.name
            }
        });
    });
}
exports.reportBanEvasion = reportBanEvasion;
