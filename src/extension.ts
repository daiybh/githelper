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
var ex=require('child_process').execSync;
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
	access(getWorkspacePath() + '/.git', constants.F_OK, (err) => {
		console.log(`${getWorkspacePath() + '/.git'} ${err ? 'does not exist' : 'exists'}`);
		if (err) { return; }

		ctx.subscriptions.push(listSubModulesCommand());
		ctx.subscriptions.push(restoreSubModule());
		ctx.subscriptions.push(pullALLCommand());
	});

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = "githelper.restoreSubModule";
	

	StatusBar.initStatusBar(context);

	ctx.subscriptions.push(myStatusBarItem);


	updateStatusBarItem();

};

function updateStatusBarItem(): void {
	const n = 1;
	if (n > 0) {
		myStatusBarItem.text = `$(megaphone) ${n} line(s) selected`;
		myStatusBarItem.show();
	} else {
		//myStatusBarItem.hide();
	}
}

const util = require('util');
const execA = util.promisify(require('child_process').exec);

async function runCommand(cmd: any) {
  try {
    const { stdout, stderr } = await execA(cmd);
    console.log('stdout:', stdout);
    console.error('stderr:', stderr);
  } catch (err) {
    console.error(err);
  }
}

function ExeCCommand(command:any):void{
	exec(command, { cwd: getWorkspacePath() }, (error: any, stdout: any, _stderr: any) => {
		if (error !== null) {
			Logger.showError(error);
		}
		//异步调用 结果会晚于 pullALLCommand22222222
		Logger.showMessage(stdout.trim());
	});

}

const restoreSubModule = (): vscode.Disposable => {
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

	const restoreCMD=`"git config -f .gitmodules --get-regexp '^submodule\..*\.path$' |
	while read path_key path
	do
		url_key=$(echo $path_key | sed 's/\.path/.url/')
		url=$(git config -f .gitmodules --get "$url_key")
		git submodule add $url $path
	done"`;
	return vscode.commands.registerCommand('githelper.restoreSubModule', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		Logger.showOutput();
		Logger.showMessage("githelper.restoreSubModule");
		
		access(getWorkspacePath() + '/.gitmodules', constants.F_OK, async (err) => {

			Logger.showMessage(`'restoreSubModule ! ${getWorkspacePath() + '/.gitmodules'} ${err ? 'does not exist' : 'exists'}`, true);

			if (err) { return; }
			//await CMD.executeCommand('git submodule update --init');
			ExeCCommand(restoreCMD);

			Logger.showMessage("restore done");
		});
	});
};
const listSubModulesCommand = (): vscode.Disposable => {
	return vscode.commands.registerCommand('githelper.ListSubModules', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		Logger.showOutput();
		Logger.showMessage("githelper.ListSubModules");
		


		access(getWorkspacePath() + '/.gitmodules', constants.F_OK, (err) => {

			Logger.showMessage(`'ListSubModules ! ${getWorkspacePath() + '/.gitmodules'} ${err ? 'does not exist' : 'exists'}`, true);

			if (err) { return; }
			//await CMD.executeCommand('git submodule update --init')
		});

	});
};

const pullALLCommand = (): vscode.Disposable => {
	return vscode.commands.registerCommand('githelper.pullALLCommand', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		Logger.showOutput();
		Logger.showMessage("githelper.pullALLCommand");

		const status = Status.startingExtension();
	StatusBar.addStatus(status);

		exec('git pull', { cwd: getWorkspacePath() }, (error: any, stdout: any, _stderr: any) => {
			if (error !== null) {
				Logger.showError(error);
			}
			//异步调用 结果会晚于 pullALLCommand22222222
			Logger.showMessage(stdout.trim());
			
	StatusBar.removeStatus(status);
		});

		// 同步调用
		//await CMD.executeCommand('git pull');
		Logger.showMessage("githelper.pullALLCommand22222222");
	});
};


// This method is called when your extension is deactivated
export function deactivate() { }
