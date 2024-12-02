import {
  Application,
  Context,
  Converter,
  DeclarationReflection,
  ReflectionKind,
  SignatureReflection,
} from 'typedoc';
import ts from 'typescript';
import plugin from './plugin.js';

export function load(app: Application) {
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (context: Context, reflection: DeclarationReflection) => {
      if (shouldParseDeclaration(context, reflection)) {
        plugin(context, reflection);
      }
    },
  );
  app.converter.on(
    Converter.EVENT_CREATE_SIGNATURE,
    (
      context: Context,
      reflection: SignatureReflection,
      sig?: ts.SignatureDeclaration,
    ) => {
      if (shouldParseSignature(context, reflection)) {
        plugin(context, reflection, sig);
      }
    },
  );
}

function shouldParseDeclaration(
  context: Context,
  reflection: DeclarationReflection,
) {
  const ALLOWED_KINDS = [
    ReflectionKind.Enum,
    ReflectionKind.Variable,
    ReflectionKind.Class,
    ReflectionKind.Interface,
    ReflectionKind.TypeAlias,
  ];
  const sym = context.project.getSymbolFromReflection(reflection);
  if (ALLOWED_KINDS.includes(reflection.kind)) {
    return true;
  }
  if (sym?.valueDeclaration?.kind !== ts.SyntaxKind.FunctionDeclaration) {
    return true;
  }
  return (sym?.declarations?.length ?? 0) > 1;
}

function shouldParseSignature(
  context: Context,
  reflection: SignatureReflection,
) {
  const sym = context.project.getSymbolFromReflection(reflection?.parent);
  return sym?.valueDeclaration?.kind === ts.SyntaxKind.FunctionDeclaration;
}
