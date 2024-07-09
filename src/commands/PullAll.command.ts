'use strict';

import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
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
// 遍历当前目录的所有一级子目录
// 如果此子目录是git仓库，则执行git pull
		vscode.workspace.findFiles('**/.git').then((files) => {
			files.forEach((file) => {
				Logger.showMessage(`pulling ${file.fsPath}`);
				const uri = vscode.Uri.file(file.fsPath);
				const dir = uri.fsPath.substring(0, uri.fsPath.lastIndexOf('/'));
				Logger.showMessage(`pulling ${dir}`);
				Command.exeCommand2('git pull', dir);
			});
		});

		//vscode.commands.executeCommand('gitHelper.updateSubmodule');
	}
}
