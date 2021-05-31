import { Converter, Reflection } from 'typedoc';
import {
  Component,
  ConverterComponent,
} from 'typedoc/dist/lib/converter/components';
import { Context } from 'typedoc/dist/lib/converter/context';
import { CommentTag } from 'typedoc/dist/lib/models';
import * as ts from 'typescript';

@Component({ name: 'inline-sources' })
export class InlineSourcesPlugin extends ConverterComponent {
  program: ts.Program;
  initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_CREATE_DECLARATION]: this.injectSource,
      [Converter.EVENT_CREATE_SIGNATURE]: this.injectSource,
    });
  }

  injectSource(context: Context, reflection: Reflection, node: ts.Node) {
    if (node) {
      const sourceFile = node.getSourceFile();
      if (reflection.comment?.tags) {
        reflection.comment.tags = reflection.comment.tags.map((tag) => {
          if (tag.tagName === 'source') {
            return this.mapSourceTag(tag, node, sourceFile);
          }
          return tag;
        });
      }
    }
  }

  mapSourceTag = (
    tag: CommentTag,
    node: ts.Node,
    sourceFile: ts.SourceFile
  ) => {
    const code = this.printNode(this.getNode(node), sourceFile);
    return {
      tagName: 'source',
      paramName: '',
      text: `${tag.text}\n\`\`\`typescript\n${this.stripBlockComments(
        code
      )}\n\`\`\`\n\n`,
    };
  };

  getNode(node: ts.Node) {
    if (ts.isVariableDeclaration(node)) {
      return node.parent;
    }
    return node;
  }

  printNode(node: ts.Node, sourceFile: ts.SourceFile) {
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
  }

  stripBlockComments(code: string) {
    return code
      .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/, '$1')
      .replace(/^\s+|\s+$/g, '');
  }
}
