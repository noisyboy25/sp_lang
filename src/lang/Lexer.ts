import Lexeme from './Lexeme';
import Terminal, { TerminalType } from './Terminal';

export default abstract class Lexer {
  static TERMINALS: Terminal[] = [
    new Terminal(TerminalType.If, /^if$/),
    new Terminal(TerminalType.While, /^while$/),
    new Terminal(TerminalType.Operator, /^[\+|\-|\*|\/]$/),
    new Terminal(TerminalType.BoolOperator, /^[=|<|>]$/),
    new Terminal(TerminalType.Assign, /^\->$/),
    new Terminal(TerminalType.Int, /^\d+$/),
    new Terminal(TerminalType.Identifier, /^[A-Z]+[A-Z0-9]*$/i),
    new Terminal(TerminalType.Space, /^\s+$/),
    new Terminal(TerminalType.ParenthesisL, /^\($/),
    new Terminal(TerminalType.ParenthesisR, /^\)$/),
    new Terminal(TerminalType.CurlyL, /^\{$/),
    new Terminal(TerminalType.CurlyR, /^\}$/),
    new Terminal(TerminalType.Semicolon, /^;$/),
    new Terminal(TerminalType.NewLine, /^\r?\n$/),
    new Terminal(TerminalType.Comma, /^\,$/),
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
