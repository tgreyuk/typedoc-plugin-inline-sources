import { CommentDisplayPart, CommentTag, Context, Reflection } from 'typedoc';
import ts from 'typescript';
import { TAG_NAME } from './constants';

export function parseTag(tag: CommentTag, valueDeclaration: ts.Declaration) {
  const commentParts: CommentDisplayPart[] = [];
  if (tag.content[0]?.text) {
    commentParts.push({
      kind: 'text',
      text: tag.content[0].text,
    });
  }
  commentParts.push({
    kind: 'code',
    text: `\n\n\`\`\`ts\n${getCode(valueDeclaration)}\n\`\`\`\n\n`,
  });
  return new CommentTag(TAG_NAME, commentParts);
}

export function getValueDeclaration(
  context: Context,
  reflection: Reflection,
  sig?: ts.SignatureDeclaration,
) {
  // get symbol
  const sym = sig
    ? context.project.getSymbolFromReflection(reflection.parent!)
    : context.project.getSymbolFromReflection(reflection);

  if (!sym) return;

  // get value declaration
  const valueDeclaration = (sym.declarations || [])[
    sym.declarations ? sym.declarations.length - 1 : 0
  ];

  return valueDeclaration;
}

function getCode(valueDeclaration: ts.Declaration) {
  const getStartPos = ts.getLineAndCharacterOfPosition(
    valueDeclaration.getSourceFile(),
    getLocationNode(valueDeclaration).getStart(),
  );
  const getEndPos = ts.getLineAndCharacterOfPosition(
    valueDeclaration.getSourceFile(),
    getLocationNode(valueDeclaration).getEnd(),
  );
  const fileSource = valueDeclaration?.getSourceFile().getFullText();
  const lines = fileSource?.split('\n');
  const lineOut = lines?.slice(getStartPos.line, getEndPos.line + 1).join('\n');
  return lineOut;
}

function getLocationNode(valueDeclaration: ts.Declaration) {
  if (ts.isVariableDeclaration(valueDeclaration)) {
    return valueDeclaration.parent;
  }
  return valueDeclaration;
}
