'use strict';

import { ExtensionContext } from 'vscode';
import Logger from '../UI/Logger';
import Command from './Command';
import { access } from 'fs';
import { getWorkspacePath } from '../application/Helper';
import constants = require('constants');

/**
 * this class registers a Command to show the Output of the Logger
 */
export default class ListSubModules extends Command {
	static registerCommand(context: ExtensionContext): void {
		Command.register(context, 'ListSubModules', ListSubModules.executeCommand);
	}

	static registerDummyCommand(context: ExtensionContext): void {
		Command.register(
			context,
			'ListSubModules',
			Logger.showMessage.bind(null, 'you must open a git-repository in your workspace root', true),
		);
	}

	static executeCommand(): void {
		Logger.showOutput();
		access(getWorkspacePath() + '/.gitmodules', constants.F_OK, (err) => {
			Logger.showMessage(`'ListSubModules ! ${getWorkspacePath() + '/.gitmodules'} ${err ? 'does not exist' : 'exists'}`, true);

			if (err) { return; }
			//await CMD.executeCommand('git submodule update --init')
		});

	}
}
