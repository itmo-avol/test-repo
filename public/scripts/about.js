'use strict';

/** @type {HTMLFormElement} */
const form = document.forms.namedItem( 'feedback' );
form.addEventListener(
	'submit',
	async ( event ) =>
	{
		event.preventDefault();
		
		const nameField = form.elements.namedItem( 'name' );
		const messageField = form.elements.namedItem( 'message' );
		
		const data = {
			name: nameField.value,
			message: messageField.value,
		};
		
		await fetch(
			form.action,
			{
				method: form.method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( data ),
			},
		);
		
		nameField.value = '';
		messageField.value = '';
	}
);
