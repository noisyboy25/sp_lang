export default class LexemeType {
  constructor(name: string, pattern: RegExp) {
    this.name = name;
    this.pattern = pattern;
  }

  name: string;
  pattern: RegExp;
}
