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
					let res_margin = document.createElement('div');
					res_margin.className = "resume_margin";
					els.forEach(el=>{res_margin.appendChild(el);});
					r.appendChild(res_margin);
				}
			})
	})

