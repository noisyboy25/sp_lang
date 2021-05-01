import Lexeme from './Lexeme';

export default class Token {
  type: Lexeme;
  value: any;

  constructor(type: Lexeme, value: any) {
    this.type = type;
    this.value = value;
  }
}
