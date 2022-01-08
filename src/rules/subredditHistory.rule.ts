import { notify } from "../core/actions";
import { conditional, listable } from "../core/condition.class";
import { arrayIncludes } from "../core/conditionals/stringArray";
import { subredditHistory } from "../core/properties/user";
import ruleBase, { targetType } from "../core/rule.class";

export default class subredditHistoryRule extends ruleBase{

    name: string = "UserSubredditHistory";
    targetType: targetType = 'Both';

    badSubreddits: Array<string> = [
        'nonewnormal',
        'lockdownskepticism',
        'lockdowncriticalleft',
        'coronaviruscirclejerk',
        'ukantilockdown',
        'ivermectin',
        'nolockdownsnomasks',
        'greenandpleasant',
        'latestagecapitalism',
        'communism',
        'genzedong',
        'leopardsatemyface',
        'badunitedkingdom',
        'newcoronavirusuk',
        'coronavirusuk2',
        'coronavirusukarchive',
        'lockdownsceptics',
        'coronavirusfos',
        'debatevaccines',
        'churchofcovid',
        'covidrebellionuk',
        'antiwork'
    ];

    Condition = new arrayIncludes (
        new subredditHistory(),
        new listable( this.badSubreddits )
    )

    Action = new notify( {color: '#db3838', message: 'User contributed to "bad" subreddits'} )

}