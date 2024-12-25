import {
    Body,
    Footer,
    Header
} from './sections.js';

fetch('template')
	.then(response=>{
			if (!response.ok) throw new Error('Invalid template!');
			return response.json();
		})
	.then(data =>{
		let resumes = document.getElementsByClassName('resume');
		Promise
			.all([Header(data.contact),
						Body(data.experiences),
						Footer(data.skills)])
			.then((els)=>{
				for(let r of resumes){
					els.forEach(el=>{r.appendChild(el);});
				}
			})
	})

