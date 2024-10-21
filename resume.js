import {
    Body,
    Footer,
		Header
} from './elements.js';

fetch('template.json')
	.then(response=>{
			if (!response.ok) throw new Error('Invalid template!');
			return response.json();
		})
	.then(data =>{
		Header(data.contact);
		Body(data.experiences);
		Footer()
		console.log(document);
	})
	.catch()
