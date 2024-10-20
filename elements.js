export const Header = (contact) => {
	let header = document.createElement('header');
	header.appendChild(Title('R. Michael Butts','header_element'));
	header.appendChild(Contact(contact,'header_element'));
	document.body.appendChild(header);
}

export const Body = (experience_type) => {
	let titles = new Array();
	let body = document.createElement('div');
	body.className = "experience_body";
	experience_type.forEach(name =>{
		if(name) titles.push(
			Title(name.replace(/^./,name[0].toUpperCase()) + ' Experience',
						'experience_title')
		);
	});
	titles.forEach(name => body.appendChild(name));
	document.body.appendChild(body);
}

export const Footer = () => {
	let footer = document.createElement('footer');
	footer.innerHTML = "FOOTER"
	document.body.appendChild(footer);
}

export const Title = (text,className=null) => {
	let title = document.createElement('div');
	title.textContent = text;
	if(className) title.className = className;
	return title;
}

export const Date = (text) => {
	let date = document.createElement('div');
	date.className = "date";
	date.textContent = text;
	return date;
}

export const Experience = (title,location,date) => {
	let experience = document.createElement('div');
	experience.className = "experience";

	let experience_header = document.createElement('div');
	experience_header.className = "experience_header";
	experience_header.appendChild(Title(title + ' | ' + location));
	experience_header.appendChild(Date(date));

	experience.appendChild(experience_header);
	document.body.appendChild(experience);
}

export const Contact = (contact_items,className = null) => {
	let contact = document.createElement('div');
	if(className) contact.className = className;
	let notFirst = false;
	contact_items.forEach(c =>{
		if(notFirst) contact.innerHTML += " | " 
		else notFirst = !notFirst;
		contact.innerHTML += c;
	})
	return contact;
}

