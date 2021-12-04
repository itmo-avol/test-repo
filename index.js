import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import stringReverse from 'string-reverse';
import { sum } from './sum.js';

const result = sum( 1, 2, 3, 4 );

console.log( result );

const currentDir = dirname( fileURLToPath( import.meta.url ) );

async function main()
{
	const inputFilePath = resolve( currentDir, 'files', 'hello.txt' );
	const outputFilePath = resolve( currentDir, 'files', 'output.txt' );
	
	const content = await readFile( inputFilePath, 'utf8' );
	const modifiedContent = stringReverse( content.toUpperCase() );
	
	await writeFile( outputFilePath, modifiedContent, 'utf8' );
}

main();
