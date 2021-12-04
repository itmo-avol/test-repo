import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import Express from 'express';
import { engine } from 'express-handlebars';
import BodyParser from 'body-parser';

const rootPath = resolve( dirname( fileURLToPath( import.meta.url ) ), '..' );

process.chdir( rootPath );

const app = Express();

app.listen( 8080 );

app.get(
	'/hi',
	( _request, response ) =>
	{
		response.send( String( new Date() ) );
	},
);

app.use( Express.static( resolve( rootPath, 'public' ) ) );

app.engine(
	'.hbs',
	engine(
		{
			defaultLayout: 'main',
			extname: '.hbs',
		},
	),
);
app.set( 'view engine', '.hbs' );

app.get(
	'/',
	( _request, response ) =>
	{
		response.render(
			'index',
			{
				message: 'Привет, Мир!',
				title: 'Главная страница',
			},
		);
	},
);

app.get(
	'/about',
	( _request, response ) =>
	{
		response.render(
			'about',
			{
				title: 'О сайте',
			},
		);
	},
);

const jsonParser = BodyParser.json();
const feedbacksFile = resolve( rootPath, 'feedback.json' );

/**
 * @typedef {Object} FormFeedbackData
 * @property {string} name
 * @property {string} message
 */

app.post(
	'/api/form/feedback',
	jsonParser,
	async ( request, response ) =>
	{
		/** @type {FormFeedbackData} */
		const data = request.body;
		/** @type {FormFeedbackData[]} */
		let feedbacks;
		
		try
		{
			const content = await readFile( feedbacksFile, 'utf8' );
			
			feedbacks = JSON.parse( content );
		}
		catch ( _error )
		{
			feedbacks = [];
		}
		
		feedbacks.push( data );
		
		await writeFile(
			feedbacksFile,
			JSON.stringify( feedbacks ),
			'utf8',
		);
		
		response.send( 'OK' );
	},
);
