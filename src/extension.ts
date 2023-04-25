// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import Commands from './application/Commands';
import Logger from './UI/Logger';

import StatusBar from './UI/StatusBar';
import GitRepository2 from './application/GitRepository2';
import path = require('path');

const { spawn } = require('child_process');
var ex = require('child_process').execSync;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let context: vscode.ExtensionContext;

let myStatusBarItem: vscode.StatusBarItem;

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
	// all Command both use  'getWorkspacePath()' to set the command worksapce.
	// list currentFolder  
	// check if have .git folder.
	// if currentFolder have .git  , then it is singleFolder put the folder(with .git) into listFolders
	// else   list his sencond childFolders. put the folder(with .git) into listFolders

	// when exe command, we can  foreach the listFolders.

	

	Commands.registerCommands(context);

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = "gitHelper.updateSubmodule";


	StatusBar.initStatusBar(context);

	ctx.subscriptions.push(myStatusBarItem);
	init();
	updateStatusBarItem();

};
async function init():Promise<void>{

	await GitRepository2.init();
}
function updateStatusBarItem(): void {
	const n = 1;
	if (n > 0) {
		myStatusBarItem.text = `$(megaphone) ${n} gitHelper`;
		myStatusBarItem.show();
	} else {
		//myStatusBarItem.hide();
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
