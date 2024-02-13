import {
  Application,
  CommentTag,
  Context,
  Converter,
  Reflection,
  ReflectionKind,
} from 'typedoc';

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


  if (reflection.comment?.blockTags) {
    reflection.comment.blockTags = reflection.comment.blockTags.map((tag) => {
      if (tag.tag === '@source') {

        console.log(ReflectionKind[reflection.kind])
        console.log(reflection.getFullName())

        const sym = context.project.getSymbolFromReflection(reflection)

        // console.log(sym?.valueDeclaration)
        const vd = sym?.valueDeclaration
        console.log(vd?.getText())
        // let code: string | undefined = undefined
        // if(reflection.isDeclaration()) {
        //   const parent = sym?.valueDeclaration?.parent
        //   if(!parent) return
        //   code = parent.getText()
        // } else {
          // code = sym?.valueDeclaration?.getText()
        // }


        const code = ""

        const newTag = mapSourceTag(tag, code);
        return newTag
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
      text: `${tag.content[0].text}\n\`\`\`typescript\n${stripBlockComments(
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
