'use strict';

import { ExtensionContext } from 'vscode';
import Logger from '../UI/Logger';
import Command from './Command';

/**
 * this class registers a Command to show the Output of the Logger
 */
export default class PullAll extends Command {
	static registerCommand(context: ExtensionContext): void {
		Command.register(context, 'PullAll', PullAll.executeCommand);
	}

	static registerDummyCommand(context: ExtensionContext): void {
		Command.register(
			context,
			'PullAll',
			Logger.showMessage.bind(null, 'you must open a git-repository in your workspace root', true),
		);
	}

	static executeCommand(): void {
		Logger.showOutput();
		Command.exeCommand('git pull');
	}
}
