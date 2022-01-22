import commandBase from '../core/command.class';
import { logging } from '../core/logging';
import Discord from 'discord.js';
import {exec} from 'child_process'

abstract class ExecuteConsoleCommand extends commandBase{

    abstract _command : string;

    override async execute(
		args: string[],
		cmd: string,
		discordMessage: Discord.Message
	): Promise<string | undefined | null> {

        return new Promise<string | undefined | null>( (resolve, reject) => {
            exec( this._command, (error, stdout, stderr) => {
                if ( error ) return resolve(`error: ${error.message}`);
                if ( stderr ) return resolve(`error: ${stderr}`);
                resolve(`stdout: ${stdout}`)
            })
        })

    }
}

class updateCommand extends ExecuteConsoleCommand {
    name = 'server_update';
	description = 'syncs local repository and compiles';
	usage = 'server_update';
    _command = 'git pull && npm run build';
}

class killCommand extends commandBase {
    name = 'server_kill';
	description = 'kills the gort instance. Should be rebooted by PM2';
	usage = 'server_kill';
    
    override async execute(
		args: string[],
		cmd: string,
		discordMessage: Discord.Message
	): Promise<string | undefined | null> {
        process.exit()
        return undefined
    }
}

export default { commands : [new updateCommand(), new killCommand()]}