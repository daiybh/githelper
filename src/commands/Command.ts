'use strict';

import { ExtensionContext, commands } from 'vscode';
import Logger from '../UI/Logger';
import StatusBar from '../UI/StatusBar';
import { exec } from 'child_process';
import Status from '../UI/Status';
import { getWorkspacePath } from '../application/Helper';

/**
 * this class is the template for a Command
 */
export default abstract class Command {
	/**
	 * registers a Command in VS Code
	 * @param context VS Code ExtensionContext
	 * @param commandString name of the Command to register
	 * @param command command that should be executed
	 */
	protected static register(context: ExtensionContext, commandString: string, command: any): void {
		context.subscriptions.push(commands.registerCommand('gitHelper.' + commandString, command));
		Logger.showMessage(`[command] ${commandString} registered`);
	}

	/**
	 * this method is called when the Command should register
	 * @param context VS Code ExtensionContext
	 */
	static registerCommand(_context: ExtensionContext): void {
		throw new TypeError('Must override method');
	}

	/**
	 * this method is called when the dummy Command should register
	 * @param context VS Code ExtensionContext
	 */
	static registerDummyCommand(_context: ExtensionContext): void {
		throw new TypeError('Must override method');
	}

	

	static exeCommand(command: string): void {

		this.exeCommand2(command,getWorkspacePath());
	}
	static exeCommand2(command: string,workSpace:string): void {
		const status = Status.startingStatus(command.substring(0, 10));
		StatusBar.addStatus(status);
		exec(command, { cwd: getWorkspacePath() }, (error: any, stdout: any, _stderr: any) => {
			Logger.showMessage(command);
			if (error !== null) {
				Logger.showError(error);
			} else {
				Logger.showMessage(stdout.trim());
			}
			StatusBar.removeStatus(status);
		});
	}
}
