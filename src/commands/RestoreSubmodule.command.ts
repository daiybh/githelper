'use strict';

import { ExtensionContext } from 'vscode';
import Logger from '../UI/Logger';
import Command from './Command';

/**
 * this class registers a Command to show the Output of the Logger
 */
export default class RestoreSubmodule extends Command {
	static registerCommand(context: ExtensionContext): void {
		Command.register(context, 'restoreSubmodule', RestoreSubmodule.executeCommand);
	}

	static registerDummyCommand(context: ExtensionContext): void {
		Command.register(
			context,
			'restoreSubmodule',
			Logger.showMessage.bind(null, 'you must open a git-repository in your workspace root', true),
		);
	}
	/*
https://stackoverflow.com/questions/11258737/restore-git-submodules-from-gitmodules

git config -f .gitmodules --get-regexp '^submodule\..*\.path$' |
	while read path_key path
	do
		url_key=$(echo $path_key | sed 's/\.path/.url/')
		url=$(git config -f .gitmodules --get "$url_key")
		git submodule add $url $path
	done
	/**/
	
	static  restoreCMD = `"git config -f .gitmodules --get-regexp '^submodule\..*\.path$' |
	while read path_key path
	do
		url_key=$(echo $path_key | sed 's/\.path/.url/')
		url=$(git config -f .gitmodules --get "$url_key")
		git submodule add $url $path
	done"`;

	static executeCommand(): void {
		Logger.showOutput();
		Command.exeCommand(RestoreSubmodule.restoreCMD);
	}
}
