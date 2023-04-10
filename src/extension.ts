// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { ExtensionContext } from 'vscode';
import Commands from './application/Commands';
import Logger from './UI/Logger';
import { access, constants } from 'fs';
import { getWorkspacePath } from './application/Helper';
import CMD from './application/CMD';

import { exec } from 'child_process';
import StatusBar from './UI/StatusBar';
import Status from './UI/Status';

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
	Commands.registerCommands(context);

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = "gitHelper.updateSubmodule";


	StatusBar.initStatusBar(context);

	ctx.subscriptions.push(myStatusBarItem);


	updateStatusBarItem();

};

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
