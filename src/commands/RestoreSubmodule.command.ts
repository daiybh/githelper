'use strict';

import { ExtensionContext } from 'vscode';
import Logger from '../UI/Logger';
import Command from './Command';
import Submodule from '../models/Submodule';
import { getWorkspacePath } from '../application/Helper';

const fs = require('fs');
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

	static restoreCMD = `"git config -f .gitmodules --get-regexp '^submodule\..*\.path$' |
	while read path_key path
	do
		url_key=$(echo $path_key | sed 's/\.path/.url/')
		url=$(git config -f .gitmodules --get "$url_key")
		git submodule add $url $path
	done"`;

	static executeCommand(): void {
		Logger.showOutput();
		fs.access(getWorkspacePath() + '/.gitmodules', fs.constants.F_OK, (err: any) => {
			Logger.showMessage(`'RestoreSubmodule ! ${getWorkspacePath() + '/.gitmodules'} ${err ? 'does not exist' : 'exists'}`, true);
			if (err) { return; }
			fs.readFile(getWorkspacePath() + '/.gitmodules', 'utf8', (err: any, gitmodulesContent: any) => {
				if (!gitmodulesContent) { return; }
				Logger.showMessage(gitmodulesContent);
				const submoduleUrls = gitmodulesContent.match(/url = (.+)/g).map((match: string) => match.substring(6).trim());
				const submodulePaths = gitmodulesContent.match(/path = (.+)/g).map((match: string) => match.substring(6).trim());

				submoduleUrls.forEach((url: any, index: string | number) => {
					const path = submodulePaths[index];
					Logger.showMessage(`git submodule add ${url} ${path}`);
					Command.exeCommand(`git submodule add ${url} ${path}`);
				});

			});
			
		});
	}
}
