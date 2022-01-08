import action from "../core/action.class";
import { notify } from "../core/actions";
import { conditional, countable } from "../core/condition.class";
import { lessThanOrEquals } from "../core/conditionals/relational";
import { comment_karma } from "../core/properties/user";
import ruleBase, { targetType } from "../core/rule.class";

export default class negativeKarmaRule extends ruleBase{
    name: string = "Test Rule";
    targetType: targetType = 'Both';
    Condition: conditional = new lessThanOrEquals(new comment_karma(), new countable(5))
    Action: action = new notify( {message: "User has low comment karma", color: '#a363d9'} )
}