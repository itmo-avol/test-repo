import { createServer } from 'node:http';
import { URL } from 'node:url';

const server = createServer(
	( request, response ) =>
	{
		const url = new URL( request.url ?? '', `http://${request.headers.host}` );
		
		if (
			( request.method === 'GET' )
			&& ( url.pathname === '/hello' )
		)
		{
			response.statusCode = 200;
			response.setHeader( 'content-type', 'text/plain' );
			response.write( 'Hello world!' );
			response.end();
		}
		
		response.statusCode = 404;
		response.end( 'Not Found' );
	},
);

server.listen(
	8080,
	() =>
	{
		console.log( 'Server is listening on http://localhost:8080' );
	}
);
