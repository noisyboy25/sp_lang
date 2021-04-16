export default abstract class Lexer {
  static tokenize(text: string): Array<string | null> {
    let tokens: (string | null)[] = [];
    const strings = text.split(';').filter((str) => {
      return str.length;
    });
    tokens = strings.map((token) => {
      const match = token?.match(/(.+)/);
      if (!match) return null;
      return match[1];
    });

    return tokens;
  }

  static extractLexemes(token: string | null): Array<string> {
    let lexemes: Array<string> = [];

    if (!token) return lexemes;

    let words = token.split(/\s+/);
    words.forEach((word) => {
      lexemes.push(word);
    });

    return lexemes;
  }
}
