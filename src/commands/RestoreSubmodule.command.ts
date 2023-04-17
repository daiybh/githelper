'use strict';

import { ExtensionContext } from 'vscode';
import Logger from '../UI/Logger';
import Command from './Command';
import { readFile } from 'fs';
import { getWorkspacePath } from '../application/Helper';
import { join } from 'path';

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
		let aFile=join(getWorkspacePath(), '/.gitmodules');
		readFile(aFile, 'utf8', (err, data: string) => {
			if (!data) {
				return ;
			}
			
			const lines = data.match(/[^\r\n]+/g) || ([] as unknown as RegExpMatchArray);
			let foundSubmodule = false;
			let curPath='';
			lines.forEach((line) => {
				/**
[submodule "submodule/VideoFrameGPUModule"]
	path = submodule/VideoFrameGPUModule
url=git@bitbucket.org:id4tv/videoframegpumodule.git
					 */				
				if (line.includes('[submodule')) {
					foundSubmodule = true;
				} else if (foundSubmodule) {
					let a = line.replace(' ', '');
					if (a.includes("path=")) {
						curPath = a.replace('path=', '').trim();
					}
					else if (a.includes('url=')) {
						let curUrl = a.replace('url=', '').trim();
						foundSubmodule = false;						
						console.warn(curPath);
						console.warn(curUrl);
						let fCmd=`git submodule add ${curUrl} ${curPath}`;

						Command.exeCommand(fCmd);
					}
				}
			});

		});
	}
}
