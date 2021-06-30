import Lexeme from './Lexeme';

export default class AstNode {
  value: string | Lexeme;
  children: AstNode[] = [];

  constructor(value: string | Lexeme) {
    this.value = value;
  }

  addChild(node: AstNode) {
    console.dir(
      { value: this.value, children: this.children },
      { depth: null, indent: 1 }
    );

    this.children.push(node);
  }
}
