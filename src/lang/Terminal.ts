export enum TerminalType {
  While = 'WHILE_KEYWORD',
  Assign = 'ASSIGN',
  Operator = 'OPERATOR',
  Int = 'LITERAL_INT',
  Identifier = 'IDENTIFIER',
  Space = 'SPACE',
  ParenthesisL = 'PARENTHESIS_L',
  ParenthesisR = 'PARENTHESIS_R',
  Semicolon = 'SEMICOLON',
  NewLine = 'NEWLINE',
  Comma = 'COMMA',
  If = 'IF_KEYWORD',
}

export default class Terminal {
  name: TerminalType;
  pattern: RegExp;

  constructor(name: TerminalType, pattern: RegExp) {
    this.name = name;
    this.pattern = pattern;
  }

  matches(text: string): boolean {
    return !!text.match(this.pattern);
  }
}
