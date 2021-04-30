import Lexeme from './Lexeme';
import LexemeType from './Terminal';
import { Terminals } from './TerminalsEnum';

export default abstract class Lexer {
  static tokenize(text: string): Array<string> {
    const tokens = text.split(';').filter((token) => token);

    return tokens;
  }

  static extractLexemes(token: string): Array<Lexeme> {
    let lexemes: Array<Lexeme> = [];

    const words = token.split(/\s+/).filter((word) => word);

    lexemes = words.map((word) => {
      const terminal = Lexer.matchTerminal(word);
      if (terminal) return new Lexeme(terminal, word);
      throw new Error(`Invalid syntax: ${word} ${word.length}`);
    });

    return lexemes;
  }

  static matchTerminal(text: string): LexemeType | null {
    for (const term of Terminals) {
      const match = text.match(term.pattern);

      if (match) {
        console.log(` ${text} => ${term.name}`);
        return term;
      }
    }
    return null;
  }
}
