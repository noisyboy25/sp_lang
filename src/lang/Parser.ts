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

    while (this.getCurrentToken()) {
      node.addChild(this.expr());
    }

    return node;
  }

  private expr() {
    const node = new AstNode('expr');

    if (this.match([TerminalType.Identifier])) {
      node.addChild(this.assignExpr());
    }

    if (this.match([TerminalType.Semicolon])) {
      this.addTerminal(node);
    }

    return node;
  }

  private assignExpr() {
    const node = new AstNode('assignExpr');

    if (this.match([TerminalType.Identifier])) {
      this.addTerminal(node);
    }

    if (this.match([TerminalType.Assign])) {
      this.addTerminal(node);
    }

    if (this.match([TerminalType.Identifier, TerminalType.Int])) {
      node.addChild(this.mathExpr());
    }

    return node;
  }

  private mathExpr() {
    const node = new AstNode('mathExpr');

    if (this.match([TerminalType.Identifier, TerminalType.Int])) {
      this.addTerminal(node);
    }

    if (this.match([TerminalType.Operator])) {
      this.addTerminal(node);

      if (this.match([TerminalType.Identifier, TerminalType.Int])) {
        node.addChild(this.mathExpr());
      }
    }

    return node;
  }

  private match(terminals: TerminalType[]) {
    return !!(
      this.getCurrentToken() &&
      terminals.includes(this.getCurrentToken()!.type.name)
    );
  }

  private addTerminal(node: AstNode) {
    const terminal = this.getCurrentToken();
    if (terminal) {
      node.addChild(new AstNode(terminal));
      this.index++;
    }
  }
}
