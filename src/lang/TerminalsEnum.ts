import LexemeType from './Terminal';

export const Terminals = [
  new LexemeType('VAR', /^[A-Z]+[A-Z0-9]*$/i),
  new LexemeType('OPERATION', /^[\+|\-|\*|\/]$/),
  new LexemeType('STRING', /^\".*\"$/),
  new LexemeType('NUMBER', /\d+/),
];
