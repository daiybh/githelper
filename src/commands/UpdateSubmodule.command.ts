'use strict';

import { ExtensionContext } from 'vscode';
import Logger from '../UI/Logger';
import Command from './Command';
import QuickPick from '../UI/QuickPick';
import QuickPickOption from '../UI/QuickPickOption';

import { getWorkspacePath } from '../application/Helper';
const fs = require('fs');
/**
 * this class registers a Command to show the Output of the Logger
 */
export default class UpdateSubmodule extends Command {
	static registerCommand(context: ExtensionContext): void {
		Command.register(context, 'updateSubmodule', UpdateSubmodule.executeCommand);
	}

	static registerDummyCommand(context: ExtensionContext): void {
		Command.register(
			context,
			'updateSubmodule',
			Logger.showMessage.bind(null, 'you must open a git-repository in your workspace root', true),
		);
	}

	static async executeCommand(): Promise<void> {
		Logger.showOutput();
		Command.exeCommand('git submodule foreach -q --recursive "git switch $(git config -f $toplevel/.gitmodules submodule.$name.branch || echo master)"');
		Command.exeCommand('git submodule foreach "(git pull)&"');
	}	
}
