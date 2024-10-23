import {
    Body,
    Footer,
    Header
} from './sections.js';

fetch('template.json')
	.then(response=>{
			if (!response.ok) throw new Error('Invalid template!');
			return response.json();
		})
	.then(data =>{
		let header_promise = Header(data.contact);
		let body_promise = Body(data.experiences,header_promise);
		Footer(body_promise);
	})

