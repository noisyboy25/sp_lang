import Terminal from './Terminal';

export default class Lexeme {
  type: Terminal;
  value: string;

  constructor(type: Terminal, value: string) {
    this.type = type;
    this.value = value;
  }
}
