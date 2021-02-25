// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('convert-newline-list-to-array.convertNewLineToArray', function () {
		const editor = vscode.window.activeTextEditor;
		const selection = editor.selection;
		convertNewLineToArray(editor, selection)
	});

	context.subscriptions.push(disposable);
}

function convertNewLineToArray(editor, selection) {
	const repl = [];

	for (let i = selection.start.line; i <= selection.end.line; i++) {
		const tempLine = editor.document.lineAt(i).text

		if (tempLine !== '') {
			repl.push(tempLine)
		} else {
			repl.push("''")
		}
	}

	const strRepl = "[" + repl.toString() + "]";

	editor.edit((e) => {
		e.replace(selection.active, strRepl.replace(/,/g, ", "));
		e.delete(selection)
	});
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
