import Lexeme from './Lexeme';

export default class AstNode {
  name: string | Lexeme;
  children: AstNode[] = [];

  constructor(value: string | Lexeme) {
    this.name = value;
  }

  addChild(node: AstNode) {
    this.children.push(node);
  }
}
