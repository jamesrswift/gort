import Snoowrap from "snoowrap";

export async function reportBanEvasion( user: Snoowrap.RedditUser ){
    return await (<any>user)._post( {
        uri: 'api/report?redditWebClient=desktop2x&app=desktop2x-client-production&raw_json=1&gilding_detail=1',
        form: {
            api_type: 'json',
            from_help_desk: true,
            reason: 'site_reason_selected',
            site_reason: "It's ban evasion",
            sr_name: 'CoronavirusUK',
            usernames: user.name
        }
    })
}