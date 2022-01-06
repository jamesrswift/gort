import action from '../action.class'
import Snoowrap from 'snoowrap'
import Discord from 'discord.js';
import {OrDefault, textEllipsis} from '../lib/helper.lib'
import DiscordProvider from "../providers/discord.provider"

interface notifyActionOptions{
    message: string;
    color?: string,
    description?: string,
    channelID?: string
}

export default class notifyAction extends action {

    private _sOpts: notifyActionOptions

    constructor(options: notifyActionOptions) {
        super();
        this._sOpts = options;
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Gort Notification")
            .setURL("http://reddit.com" + target.permalink + "?context=2")
            .setDescription( OrDefault(this._sOpts.description, "A user has commented on r/CoronavirusUK and has triggered this warning!"))
            .setTimestamp()
            .addField( 'username', user.name)
            
            // Below relies on undefined behind as false
            .addField( 'Content Body', textEllipsis(  (<Snoowrap.Comment>target).body || (<Snoowrap.Submission>target).selftext, 500))

            .addField( 'Account Age (days)', (Math.ceil(((Date.now() / 1000) - user.created) / (60 * 60 * 24))).toString(), true)
            .addField( 'Link Karma', user.link_karma.toString(), true)
            .addField( 'Comment Karma', user.comment_karma.toString(), true)
            .addField( 'Trigger Reason', this._sOpts.message)
            .setFooter({ text: "Provided by CensorshipCo" });

        DiscordProvider.Instance.sendMessage({embeds: [embed]}, this._sOpts.channelID)
    }

}
