import * as elements from './elements.js'

export const Header = async (contact) => {
	let header = document.createElement('header');
	header.appendChild(elements.Text('R. Michael Butts','header_title'));
	header.appendChild(elements.Contact(contact,'header_element'));
	return header;
}

export const Body = async (experience_type) => {
	let body = document.createElement('div');
	let education_map = new Map();
	body.className = "experience_body";
	experience_type.forEach(name => {
		if(name) education_map.set(name,elements.ExperienceSection(name));
	});
	get_json_data('experiences')
		.then(data => {
			data.forEach(item => {
				if(education_map.has(item.type)){
					education_map.get(item.type).appendChild(elements.Experience(item));
				}
			})
		})
	await get_json_data('education')
		.then(data => {
			let education_section = elements.ExperienceSection("education",false);
			data.forEach(item => {education_section.appendChild(elements.Education(item))});
			body.appendChild(education_section)
		});
	education_map.forEach((value) => body.appendChild(value));
	return body;
}

export const Footer = async (skills) => {
	let footer = document.createElement('footer');
	footer.appendChild(elements.Text('Skills','experience_title'));
	footer.appendChild(elements.Text(skills.join(' | ')));
	return footer;
}

const get_json_data = async (type) => {
	return fetch('/' + type).then(response => {
				if(response.ok) return response.json()
			})
};
