import Discord from 'discord.js';
import fs from 'fs';

import { logging } from './logging';
const logger = logging.getLogger('core.command');

export default abstract class commandBase {
    abstract name: string;
    abstract description: string;
    abstract usage: string;
}

export class commandHandler {

    private _commandsDirectory : string = "./dist/commands";
    private _commandArray: Map<string,commandBase> = new Map<string,commandBase>();

    private static _instance?: commandHandler;
    public static get Instance(): commandHandler { return this._instance || (this._instance = new commandHandler()) }

    private constructor() {
        this.loadCommands()
    }

    private loadCommands(){
        logger.info("Loading commands ...")
        const ruleFiles = fs.readdirSync(this._commandsDirectory).filter(file => file.endsWith('.js'));
        for ( const file of ruleFiles){
            this.loadCommand(file);
        }
    }

    private loadCommand(filename: string){
        const commands : commandBase[] = ((require(`../rules/${filename}`)) as {default:{commands:commandBase[]}}).default.commands;
        
        commands.forEach( (command) => {
            if ( this._commandArray.has(command.name) ){
                return logger.error(`Attempting to redefine rule ${command.name}`)
            }
            logger.info(`Loading rule: ${command.name}`)
            this._commandArray.set(command.name,command);
        })
    
    }

    private onMessage( message: Discord.Message) : void {

    }

    private handleCommandInvoke( ){

    }
}