// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "convert-newline-list-to-array.convertNewLineToArray",
    function () {
      const editor = vscode.window?.activeTextEditor;

      if (editor) {
        const selection = editor?.selection;
        // Check if there is a selection
        if (!selection.isEmpty) {
          convertNewLineToArray(editor, selection);
        } else {
          // If there is no selection, show an error message
          vscode.window.showInformationMessage(
            "Please select some text to convert."
          );
        }
      } else {
        // If there is no active text editor, show an error message
        vscode.window.showErrorMessage(
          "No active text editor found for conversion."
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

function convertNewLineToArray(editor, selection) {
  const repl = [];
  for (let i = selection.start.line; i <= selection.end.line; i++) {
    const tempLine = editor.document.lineAt(i).text;

    if (tempLine !== "") {
      // check if checked line is a number
      const isNumber = !isNaN(parseFloat(tempLine)) && isFinite(tempLine);
      if (isNumber) {
        repl.push(tempLine);
      } else {
        repl.push(`"${tempLine}"`);
      }
    } else {
      repl.push("''");
    }
  }

  const strRepl = "[" + repl.join(", ") + "]";

  editor.edit((e) => {
    e.replace(selection, strRepl);
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
