import fs from 'fs';
import path from 'path';
import Lexer from './lang/Lexer';
import Parser from './lang/Parser';

const logTree = require('console-log-tree');

export const main = async () => {
  try {
    const raw = await fs.promises.readFile(
      path.join(__dirname, '..', 'test.txt'),
      'utf8'
    );
    if (!raw) throw new Error('No input');

    console.log('Raw: \n', raw, '\n');

    const lexemes = Lexer.extractLexemes(raw);
    lexemes.forEach((token) =>
      console.log(`${token.type.name}  \t${token.value}`)
    );
    console.log('');

    const parser = new Parser(lexemes);
    const tree = parser.lang();
    console.dir(tree, { depth: null });

    console.log('\nTree:');
    logTree.log(tree);
  } catch (error) {
    return console.log(error);
  }
};

main();
