export function sum( ...rest )
{
	return rest.reduce( ( result, current ) => result + current );
}
