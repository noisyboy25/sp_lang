import Lexeme from './Lexeme';
import Terminal from './Terminal';

export default abstract class Lexer {
  static TERMINALS: Terminal[] = [
    new Terminal('KEYWORD_WHILE', /^while$/),
    new Terminal('OPERATOR', /^[\+|\-|\*|\/]$/),
    new Terminal('LITERAL_INT', /^\d+$/),
    new Terminal('IDENTIFIER', /^[A-Z]+[A-Z0-9]*$/i),
    new Terminal('SPACE', /^\s+$/),
    new Terminal('PARENTHESIS_L', /^\($/),
    new Terminal('PARENTHESIS_R', /^\)$/),
    new Terminal('NEWLINE', /^\r?\n$/),
    new Terminal('COMMA', /^\,$/),
  ];

  static extractLexemes(raw: string): Lexeme[] {
    let lexemes: Lexeme[] = [];

    while (raw.charAt(0) != '$') {
      const lexeme = this.extractNextLexeme(raw);
      lexemes.push(lexeme);
      raw = raw.substr(lexeme.value.length);
    }

    return lexemes;
  }

  static extractNextLexeme(text: string): Lexeme {
    let buffer = text.charAt(0);

    if (!this.matchesAnyTerminal(buffer))
      throw Error('Unexpected symbol: "' + buffer + '" ' + buffer.length);

    while (this.matchesAnyTerminal(buffer) && buffer.length != text.length) {
      buffer += text.charAt(buffer.length);
    }

    buffer = buffer.substr(0, buffer.length - 1);
    console.log(buffer);

    for (const term of this.TERMINALS) {
      if (term.matches(buffer)) {
        return new Lexeme(term, buffer);
      }
    }

    throw Error('No terminal');
  }

  static matchesAnyTerminal(text: string): boolean {
    for (const terminal of this.TERMINALS) {
      if (terminal.matches(text)) return true;
    }

    return false;
  }
}
