import Lexeme from './Lexeme';
import Token from './Token';

export default abstract class Lexer {
  Terminals = [
    new Lexeme('IDENTIFIER', /^[A-Z]+[A-Z0-9]*$/i),
    new Lexeme('OPERATOR', /^[\+|\-|\*|\/]$/),
    new Lexeme('LITERAL_STR', /^\".*\"$/),
    new Lexeme('LITERAL_INT', /\d+/),
  ];

  static extractWords(raw: string): string[] {
    let words: string[] = [];

    words = raw.split(/\s+/);

    return words;
  }

  static extractTokens(words: string[]): Token[] {
    let tokens: Token[] = [];

    return tokens;
  }
}
