import {
  Application,
  CommentTag,
  Context,
  Converter,
  Reflection,
} from 'typedoc';
import * as ts from 'typescript';

export function load(app: Application) {
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (context: Context, reflection: Reflection, node: ts.Node) => {
      injectSource(context, reflection, node);
    }
  );
  app.converter.on(
    Converter.EVENT_CREATE_SIGNATURE,
    (context: Context, reflection: Reflection, node: ts.Node) => {
      injectSource(context, reflection, node);
    }
  );
}

function injectSource(context: Context, reflection: Reflection, node: ts.Node) {
  if (node) {
    const sourceFile = node.getSourceFile();
    if (reflection.comment?.tags) {
      reflection.comment.tags = reflection.comment.tags.map((tag) => {
        if (tag.tagName === 'source') {
          return mapSourceTag(tag, node, sourceFile);
        }
        return tag;
      });
    }
  }
}

function mapSourceTag(
  tag: CommentTag,
  node: ts.Node,
  sourceFile: ts.SourceFile
) {
  const code = printNode(getNode(node), sourceFile);
  return {
    tagName: 'source',
    paramName: '',
    text: `${tag.text}\n\`\`\`typescript\n${stripBlockComments(
      code
    )}\n\`\`\`\n\n`,
  };
}

function getNode(node: ts.Node) {
  if (ts.isVariableDeclaration(node)) {
    return node.parent;
  }
  return node;
}

function printNode(node: ts.Node, sourceFile: ts.SourceFile) {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
}

function stripBlockComments(code: string) {
  return code
    .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/, '$1')
    .replace(/^\s+|\s+$/g, '');
}
