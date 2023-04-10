'use strict';

import { ExtensionContext } from 'vscode';
import ShowOutputCommand from '../commands/ShowOutput.command';
import ListSubmodules from '../commands/ListSubmodules.command';
import PullAll from '../commands/PullAll.command';
import UpdateSubmodule from '../commands/UpdateSubmodule.command';
import RestoreSubmodule from '../commands/RestoreSubmodule.command';


const COMMANDS = [PullAll,UpdateSubmodule,RestoreSubmodule,ListSubmodules, ShowOutputCommand];
/**
 * this class registers all commands displayed in the VS Code Command Pallette
 */
export default class Commands {
	/**
	 * registers all Commands as a Command in VS Code
	 * @param context VS Code ExtensionContext
	 */
	static registerCommands(context: ExtensionContext): void {
		COMMANDS.forEach((command) => {
			command.registerCommand(context);
		});
	}

	/**
	 * registers dummy Commands as a Command in VS Code so it will not throw an Exception when the Extension
	 * is not loaded
	 * @param context VS Code ExtensionContext
	 */
	static registerDummyCommands(context: ExtensionContext): void {
		COMMANDS.forEach((command) => {
			command.registerDummyCommand(context);
		});
	}
}
