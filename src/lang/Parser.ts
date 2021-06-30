import AstNode from './AstNode';
import Lexeme from './Lexeme';
import { TerminalType } from './Terminal';

export default class Parser {
  private lexemes: Lexeme[];
  private index = 0;

  constructor(lexemes: Lexeme[]) {
    this.lexemes = lexemes;
  }

  private getCurrentToken() {
    if (this.index < this.lexemes.length) {
      return this.lexemes[this.index];
    }
    return null;
  }

  lang(): AstNode {
    const node = new AstNode('lang');
    node.addChild(this.expr());
    while (
      this.getCurrentToken() &&
      [TerminalType.Identifier, TerminalType.If, TerminalType.While].includes(
        this.getCurrentToken()!.type.name
      )
    ) {
      node.addChild(this.expr());
    }
    if (
      this.getCurrentToken() &&
      ![TerminalType.Identifier].includes(this.getCurrentToken()!.type.name)
    ) {
      throw new Error('Invalid token');
    }
    return node;
  }

  private expr(): AstNode {
    const node = new AstNode('expr');
    if (this.getCurrentToken() && this.getCurrentToken()!.type.name) {
      node.addChild(this.assignExpr());
    }
    return node;
  }

  private assignExpr(): AstNode {
    const node = new AstNode('assignExpr');
    this.match([TerminalType.Identifier], node);
    this.match([TerminalType.Assign], node);

    node.addChild(this.mathExpr());

    this.match([TerminalType.Semicolon], node);

    return node;
  }

  private mathExpr(): AstNode {
    const node = new AstNode('mathExpr');
    if ([TerminalType.Identifier].includes(this.getCurrentToken()!.type.name)) {
      node.addChild(this.value());
    } else if (
      [TerminalType.Operator].includes(this.getCurrentToken()!.type.name)
    ) {
      this.match([TerminalType.Operator], node);
      if (
        [TerminalType.Identifier].includes(this.getCurrentToken()!.type.name)
      ) {
        node.addChild(this.mathExpr());
      } else {
        throw new Error('Invalid token');
      }
    }
    return node;
  }
  private value(): AstNode {
    const node = new AstNode('value');
    this.match([TerminalType.Int, TerminalType.Identifier], node);
    return node;
  }

  private match(types: TerminalType[], node: AstNode) {
    if (
      this.getCurrentToken() &&
      types.includes(this.getCurrentToken()!.type.name)
    ) {
      node.addChild(node);
      this.index++;
    } else {
      throw new Error(
        `Invalid token ${this.getCurrentToken()?.type.name} at index ${
          this.index
        }`
      );
    }
  }
}
