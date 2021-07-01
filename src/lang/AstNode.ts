import Lexeme from './Lexeme';

export default class AstNode {
  name: String;
  children: AstNode[] = [];

  constructor(value: string | Lexeme) {
    switch (typeof value) {
      case 'string':
        this.name = value;
        break;
      case 'object':
        this.name = `${value.type.name} '${value.value}'`;
    }
  }

  addChild(node: AstNode) {
    this.children.push(node);
  }
}
