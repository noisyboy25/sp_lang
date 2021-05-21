import fs from 'fs';
import path from 'path';
import Lexer from './lang/Lexer';

const main = async () => {
  try {
    const raw = await fs.promises.readFile(
      path.join(__dirname, '..', 'test.txt'),
      'utf8'
    );
    if (!raw) throw new Error('No input');

    console.log('Raw: \n', raw, '\n');

    const lexemes = Lexer.extractLexemes(raw);
    console.log('Tokens: \n', lexemes, '\n');
  } catch (error) {
    return console.log(error);
  }
};

main();
