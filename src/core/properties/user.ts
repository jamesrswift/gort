import Snoowrap from "snoowrap";
import { conditional, countable, legible, listable } from "../condition.class";

//
//  Properties made available through Snoowrap.RedditUser
//

export class comment_karma extends countable {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<number> { return Promise.resolve(user.comment_karma) }
}

export class has_mod_mail extends conditional {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<boolean> { return Promise.resolve(user.has_mod_mail) }
}

export class has_subscribed extends conditional {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<boolean> { return Promise.resolve(user.has_subscribed) }
}

export class has_verified_mail extends conditional {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<boolean> { return Promise.resolve(user.has_verified_mail) }
}

export class hide_from_robots extends conditional {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<boolean> { return Promise.resolve(user.hide_from_robots) }
}

export class is_employee extends conditional {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<boolean> { return Promise.resolve(user.is_employee) }
}

export class is_gold extends conditional {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<boolean> { return Promise.resolve(user.is_gold) }
}

export class is_mod extends conditional {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<boolean> { return Promise.resolve(user.is_mod) }
}

export class link_karma extends countable {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<number> { return Promise.resolve(user.link_karma) }
}

export class pref_show_snoovatar extends conditional {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<boolean> { return Promise.resolve(user.pref_show_snoovatar) }
}

export class verified extends conditional {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<boolean> { return Promise.resolve(user.verified) }
}


//
//  Properties made available through Snoowrap.RedditContent<Snoowrap.RedditUser>
//

export class created_utc extends countable {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<number> { return Promise.resolve(user.created_utc) }
}

export class created extends countable {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<number> { return Promise.resolve(user.created) }
}

export class id extends legible {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<string> { return Promise.resolve(user.id) }
}

export class name extends legible {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : Promise<string> { return Promise.resolve(user.name) }
}

//
//  Properties made available through more complicated functions
//

export class subredditHistory extends listable {

    constructor(){super()}

    public override execute(user: Snoowrap.RedditUser) : Promise<string[]>{
        return new Promise<string[]>( (resolve, reject) => {
            user.getComments().then( (listing: Snoowrap.Listing<Snoowrap.Comment>) => {
                let subreddits: string[] = [];
                listing.forEach( comment => {
                    if ( !(subreddits.includes(comment.subreddit.display_name.toLowerCase()) ) ){
                        subreddits.push(comment.subreddit.display_name.toLowerCase())
                    }
                })
                resolve(subreddits)
            }).catch( (error) => {reject(error)}) // May cause issues if reddit connection is interrupted?
        })
    }
    
}