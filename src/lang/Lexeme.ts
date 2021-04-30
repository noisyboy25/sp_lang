import LexemeType from './Terminal';

export default class Lexeme {
  constructor(type: LexemeType, value: any) {
    this.type = type;
    this.value = value;
  }

  type: LexemeType;
  value: any;
}
