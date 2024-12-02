import { Context, Reflection } from 'typedoc';
import ts from 'typescript';
import { getValueDeclaration, parseTag } from './helpers.js';

export default (
  context: Context,
  reflection: Reflection,
  sig?: ts.SignatureDeclaration,
) => {
  const TAG_NAME = '@source';

  // ignore projects
  if (reflection.isProject()) return;

  // get value declaration
  const valueDeclaration = sig || getValueDeclaration(context, reflection);

  if (!valueDeclaration) return;

  // map comment blocks
  if (reflection.comment?.blockTags) {
    reflection.comment.blockTags = reflection.comment.blockTags.map((tag) => {
      if (tag.tag === TAG_NAME) {
        return parseTag(tag, sig || valueDeclaration);
      } else {
        return tag;
      }
    });
  }
};
