import action from "../core/action.class";
import { notify } from "../core/actions";
import condition from "../core/condition.class";
import { lessThanOrEquals } from "../core/conditionals/arithmetic";
import { countable } from "../core/properties.class";
import { comment_karma } from "../core/properties/user";
import ruleBase from "../core/rule.class";

export default class negativeKarmaRule extends ruleBase{
    name: string = "Test Rule";
    target: 'Submissions' | 'Comments' | 'Both' = 'Both';
    Condition: condition = new lessThanOrEquals(new comment_karma(), new countable(5))
    Action: action = new notify( {message: "User has low comment karma", color: '#a363d9'} )
}