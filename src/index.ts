import fs from 'fs';
import path from 'path';
import util from 'util';
import Lexer from './lang/Lexer';

const main = async () => {
  try {
    const raw = await fs.promises.readFile(
      path.join(__dirname, '..', 'test.txt'),
      'utf8'
    );
    console.log('Raw: ', raw, '\n');

    const words = Lexer.extractWords(raw);
    console.log('Words');

    const tokens = Lexer.extractTokens(words);
    console.log('Tokens: ', tokens);
  } catch (error) {
    return console.log(error);
  }
};

main();
