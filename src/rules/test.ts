import Snoowrap from 'snoowrap'
import action from '../core/action.class';
import { ban } from '../core/actions';
import { conditional, listable, countable } from "../core/condition.class";
import { greaterThan } from '../core/conditionals/arithmetic';
import { and, or } from '../core/conditionals/logic';
import { arrayIncludes } from '../core/conditionals/stringArray';
import ruleBase from '../core/rule.class';

export default class testRule extends ruleBase {

    name: string = "Test Rule";
    target: 'Submissions' | 'Comments' | 'Both' = 'Both';

    Condition = new and(
        new or(
            new arrayIncludes(
                new listable(["hello", "world"]),
                new listable(["world"])
            ),

            new greaterThan(
                new countable(1),
                new countable(2)
            )

        )
    )

    Action: action = new ban({});

}