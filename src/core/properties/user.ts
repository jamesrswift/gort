import Snoowrap from "snoowrap";
import condition from "../condition.class";
import { countable, legible, listable } from "../properties.class";

//
//  Properties made available through Snoowrap.RedditUser
//

export class comment_karma extends countable {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : number { return user.comment_karma }
}

export class has_mod_mail extends condition {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : boolean { return user.has_mod_mail }
}

export class has_subscribed extends condition {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : boolean { return user.has_subscribed }
}

export class has_verified_mail extends condition {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : boolean { return user.has_verified_mail }
}

export class hide_from_robots extends condition {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : boolean { return user.hide_from_robots }
}

export class is_employee extends condition {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : boolean { return user.is_employee }
}

export class is_gold extends condition {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : boolean { return user.is_gold }
}

export class is_mod extends condition {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : boolean { return user.is_mod }
}

export class link_karma extends countable {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : number { return user.link_karma }
}

export class pref_show_snoovatar extends condition {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : boolean { return user.pref_show_snoovatar }
}

export class verified extends condition {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : boolean { return user.verified }
}


//
//  Properties made available through Snoowrap.RedditContent<Snoowrap.RedditUser>
//

export class created_utc extends countable {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : number { return user.created_utc }
}

export class created extends countable {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : number { return user.created }
}

export class id extends legible {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : string { return user.id }
}

export class name extends legible {
    constructor(){super()}
    public override execute( user: Snoowrap.RedditUser) : string { return user.name }
}

//
//  Properties made available through more complicated functions
//

export class subredditHistory extends listable {

    constructor(){super()}

    public override execute(user: Snoowrap.RedditUser) : string[]{
        // TODO: Retrieving a user history is asynchronous. Not sure how I'm
        //       going to work this in.
        return []
    }
    
}