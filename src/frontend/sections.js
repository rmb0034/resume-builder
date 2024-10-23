import * as elements from './elements.js'

export const Header = async (contact) => {
	let header = document.createElement('header');
	header.appendChild(elements.Title('R. Michael Butts','header_element'));
	header.appendChild(elements.Contact(contact,'header_element'));
	document.body.appendChild(header);
}

export const Body = async (experience_type,header_promise) => {
	let body = document.createElement('div');
	let education_map = new Map();
	body.className = "experience_body";
	experience_type.forEach(name => {
		if(name) education_map.set(name,elements.ExperienceSection(name));
	});
	await get_json_data('experiences')
		.then(data => {
			data.forEach(item => {
				if(education_map.has(item.type)){
					education_map.get(item.type).appendChild(elements.Experience(item));
				}
			})
		})
	await get_json_data('education')
		.then(data => {
			let education_section = elements.ExperienceSection("education");
			data.forEach(item => {education_section.appendChild(elements.Education(item))});
			body.appendChild(education_section)
		});
	education_map.forEach((value) => body.appendChild(value));
	await header_promise.then(()=>{document.body.appendChild(body)});
}

export const Footer = async (body_promise) => {
	let footer = document.createElement('footer');
	footer.innerHTML = "FOOTER";
	document.body.appendChild(footer);
	await body_promise.then(()=>{document.body.appendChild(footer)});
}

const get_json_data = async (type) => {
	return fetch('/' + type).then(response => {
		console.log(response)
				if(response.ok) return response.json()
			})
};
