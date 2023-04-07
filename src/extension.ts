// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { ExtensionContext } from 'vscode';
import Commands from './application/Commands';
import Logger from './UI/Logger';
import { access, constants } from 'fs';
import { getWorkspacePath } from './application/Helper';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let context: vscode.ExtensionContext;

export const activate = (ctx: vscode.ExtensionContext): void => {
	context = ctx;
	Logger.init();

	console.log('Congratulations, your extension "githelper" is now active!');
	{
		let disposable = vscode.commands.registerCommand('githelper.init', () => {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			vscode.window.showInformationMessage('Hello World from GitHelper!');
		});
		context.subscriptions.push(disposable);
	}
	access(getWorkspacePath() + '/.git', constants.F_OK, (err) => {
		console.log(`${getWorkspacePath() + '/.git'} ${err ? 'does not exist' : 'exists'}`);
		if (err) { return; }

		ctx.subscriptions.push(listSubModulesCommand());
		ctx.subscriptions.push(restoreSubModule());
	});
	
};
const restoreSubModule=():vscode.Disposable=>{
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
	return vscode.commands.registerCommand('githelper.restoreSubModule', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		Logger.showOutput();
		access(getWorkspacePath() + '/.gitmodules', constants.F_OK, (err) => {

			Logger.showMessage(`'restoreSubModule ! ${getWorkspacePath() + '/.gitmodules'} ${err ? 'does not exist' : 'exists'}`, true);

			if (err) { return; }
			//await CMD.executeCommand('git submodule update --init')
		});
	});
};
const listSubModulesCommand=():vscode.Disposable=> {	
	return vscode.commands.registerCommand('githelper.ListSubModules', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		Logger.showOutput();
		access(getWorkspacePath() + '/.gitmodules', constants.F_OK, (err) => {

			Logger.showMessage(`'ListSubModules ! ${getWorkspacePath() + '/.gitmodules'} ${err ? 'does not exist' : 'exists'}`, true);

			if (err) { return; }
			//await CMD.executeCommand('git submodule update --init')
		});
	});
};


// This method is called when your extension is deactivated
export function deactivate() { }
