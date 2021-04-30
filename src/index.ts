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
    console.log(`Raw: \n"${raw}"\n`);

    const tokens = Lexer.tokenize(raw);
    console.log(`Tokens: \n${tokens}\n`);

    const lexemes = tokens.map((token) => Lexer.extractLexemes(token));
    console.log(
      `Lexemes: \n${util.inspect(lexemes, { depth: null, colors: true })}\n`
    );
  } catch (error) {
    return console.log(error);
  }
};

main();
