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

export const Experence = (title,location,date) => {
	let experience = document.createElement('div');
	experience.className = "experience";

	let experience_header = document.createElement('div');
	experience_header.className = "experience_header";
	experience_header.appendChild(Title(title + ' | ' + location));
	experience_header.appendChild(Date(date));


	experience.appendChild(experience_header);
	document.body.appendChild(experience);
}

export const Header = () => {
	let header = document.createElement('header');
	header.appendChild(Title("R. Michael Butts",'header_element'));
	let contact = document.createElement('p');
	contact.textContent = "(304)-218-4237 | ronaldmbutts@gmail.com";
	contact.className = 'header_element';
	header.appendChild(contact);
	document.body.appendChild(header);
}

