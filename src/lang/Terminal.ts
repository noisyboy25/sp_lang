export default class Terminal {
  name: string;
  pattern: RegExp;

  constructor(name: string, pattern: RegExp) {
    this.name = name;
    this.pattern = pattern;
  }

  matches(text: string): boolean {
    return !!text.match(this.pattern);
  }
}
