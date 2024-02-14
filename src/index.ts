import {
  Application,
  CommentTag,
  Context,
  Converter,
  Reflection,
} from 'typedoc';
import * as ts from "typescript"

export function load(app: Application) {
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (context: Context, reflection: Reflection) => {
      injectSource(context, reflection);
    }
  );
  app.converter.on(
    Converter.EVENT_CREATE_SIGNATURE,
    (context: Context, reflection: Reflection) => {
      injectSource(context, reflection);
    }
  );
}

function injectSource(context: Context, reflection: Reflection) {
  // ignore project declaration
  if(reflection.isProject()) return

  // get code from the reflection
  const sym = reflection.variant == "signature" ? context.project.getSymbolFromReflection(reflection.parent!) : context.project.getSymbolFromReflection(reflection)
  if(!sym) return

  const valueDeclaration = (sym.declarations || [])[0]
  if(!valueDeclaration) return

  let code: string
  if(valueDeclaration.kind == ts.SyntaxKind.VariableDeclaration) {
    // the VariableDeclaration does not include the `const` keyword because this belongs to
    // the VariableDeclarationList
    code = `const${valueDeclaration.getFullText()}`
  } else {
    code = valueDeclaration.getFullText()
  }

  if (reflection.comment?.blockTags) {
    reflection.comment.blockTags = reflection.comment.blockTags.map((tag) => {
      if (tag.tag === '@source') {
        return mapSourceTag(tag, code);
      } else {
        return tag;
      }
    });
  }
}

function mapSourceTag(
  tag: CommentTag,
  code: string
) {

  return new CommentTag("@source", [
    {
      kind: "code",
      text: `${tag.content[0]?.text || ''}\n\`\`\`typescript\n${stripBlockComments(
        code
      )}\n\`\`\`\n\n`
    }
  ])
}

function stripBlockComments(code: string) {
  return code
    .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/, '$1')
    .replace(/^\s+|\s+$/g, '');
}
