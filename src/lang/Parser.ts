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
      // console.log(this.getCurrentToken());

      node.addChild(this.expr());
    }

    return node;
  }

  private expr() {
    const node = new AstNode('expr');

    if (this.match([TerminalType.Identifier])) {
      node.addChild(this.assignExpr());
    } else if (this.match([TerminalType.If])) {
      node.addChild(this.ifBlock());
    } else if (this.match([TerminalType.While])) {
      node.addChild(this.whileBlock());
    }

    if (this.match([TerminalType.Semicolon])) {
      this.addTerminal(node);
    }

    return node;
  }

  private ifBlock(): AstNode {
    const node = new AstNode('ifBlock');

    if (this.match([TerminalType.If])) {
      this.addTerminal(node);
    }

    if (this.match([TerminalType.ParenthesisL])) {
      this.addTerminal(node);
    }

    node.addChild(this.boolExpr());

    if (this.match([TerminalType.ParenthesisR])) {
      this.addTerminal(node);
    }

    if (this.match([TerminalType.CurlyL])) {
      this.addTerminal(node);
    }

    while (this.match([TerminalType.Identifier])) {
      node.addChild(this.expr());
    }

    if (this.match([TerminalType.CurlyR])) {
      this.addTerminal(node);
    }

    return node;
  }

  private whileBlock(): AstNode {
    const node = new AstNode('whileBlock');

    if (this.match([TerminalType.While])) {
      this.addTerminal(node);
    }

    if (this.match([TerminalType.ParenthesisL])) {
      this.addTerminal(node);
    }

    node.addChild(this.boolExpr());

    if (this.match([TerminalType.ParenthesisR])) {
      this.addTerminal(node);
    }

    if (this.match([TerminalType.CurlyL])) {
      this.addTerminal(node);
    }

    while (this.match([TerminalType.Identifier])) {
      node.addChild(this.expr());
    }

    if (this.match([TerminalType.CurlyR])) {
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

  private boolExpr() {
    const node = new AstNode('mathExpr');

    if (this.match([TerminalType.Identifier, TerminalType.Int])) {
      this.addTerminal(node);
    }

    if (this.match([TerminalType.BoolOperator])) {
      this.addTerminal(node);

      node.addChild(this.mathExpr());
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
