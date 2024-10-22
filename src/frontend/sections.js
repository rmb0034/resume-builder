import * as elements from './elements.js'

export const Header = async (contact) => {
	let header = document.createElement('header');
	header.appendChild(elements.Title('R. Michael Butts','header_element'));
	header.appendChild(elements.Contact(contact,'header_element'));
	document.body.appendChild(header);
}

export const Body = async (experience_type,header_promise) => {
	let body = document.createElement('div');
	let map = new Map();
	body.className = "experience_body";
	experience_type.forEach(name => {
		if(name) map.set(name,elements.ExperienceSection(name));
	});
	await get_json_data()
		.then(data => {
			data.forEach(item => {
				if(map.has(item.type)){
					map.get(item.type).appendChild(elements.Experience(item));
				}
			})
		})
	map.forEach((value) => body.appendChild(value));
	await header_promise.then(()=>{document.body.appendChild(body)});
}

export const Footer = async (body_promise) => {
	let footer = document.createElement('footer');
	footer.innerHTML = "FOOTER";
	document.body.appendChild(footer);
	await body_promise.then(()=>{document.body.appendChild(footer)});
}

const get_json_data = async () => {
	return fetch('/experiences').then(response => {
				if(response.ok) return response.json()
			})
};
