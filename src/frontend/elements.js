export const Title = (text,className=null) => {
	let title = document.createElement('div');
	title.textContent = text;
	if(className) title.className = className;
	return title;
}

export const ExperienceSection = (type) => {
	let section = document.createElement('div');
	section.appendChild(
		Title(type.replace(/^./,type[0].toUpperCase()) + ' Experience',
		'experience_title')
	);
	return section;
};

export const Education = (info) => {
	let education = document.createElement('div');
	education.appendChild(Title(info.school + " | location"));
	education.appendChild(Title(info.degree));
	console.log(info)
	if(info.additional) education.appendChild(Title(info.additional));
	return education 
}

export const Experience = (info) => {
	let experience = document.createElement('div');
	experience.className = "experience";

	let experience_header = document.createElement('div');
	experience_header.className = "experience_header";
	experience_header.appendChild(Title(info.title + ' | ' + info.location));
	experience_header.appendChild(Date(info.date));

	experience.appendChild(experience_header);
	experience.appendChild(List(info.experience,'experience_list'));
	return experience;
}

const Date = (text) => {
	let date = document.createElement('div');
	date.className = "date";
	date.textContent = text;
	return date;
}

const List = (items,className = null) => {
	let list = document.createElement('ul');
	if(className) list.className = className;
	items.forEach(text => {
		let li = document.createElement('li');
		li.innerHTML = text;
		list.appendChild(li)
	})
	return list;
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
