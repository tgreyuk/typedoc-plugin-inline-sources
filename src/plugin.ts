import { Context, Reflection } from 'typedoc';
import ts from 'typescript';
import { getValueDeclaration, parseTag } from './helpers.js';
import { TAG_NAME } from './constants.js';

export default (
  context: Context,
  reflection: Reflection,
  sig?: ts.SignatureDeclaration,
) => {

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
