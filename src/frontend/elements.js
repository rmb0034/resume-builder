
function Element(type,className=null){
	let title = document.createElement(type);
	if(className) title.className = className;
	return title;
}

export const Text = (string,className = null) =>{
	let text = Element('div',className);
	text.innerHTML = string;
	return text;
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

export const ExperienceSection = (type) => {
	let section = document.createElement('div');
	section.appendChild(
		Text(type.replace(/^./,type[0].toUpperCase()) + ' Experience',
		'experience_title')
	);
	return section;
};

export const Education = (info) => {
	let education = Element('div');
	let header = Element('div','education_header');
	header.appendChild(Text(info.degree,'education_title'));
	header.appendChild(Text('<b>Graduation: </b>'+ info.graduation));

	let body = Element('div','education_body');
	body.appendChild(Text(info.school));
	body.appendChild(Text('<b>GPA:</b> '+info.gpa));

	education.appendChild(header);
	education.appendChild(body);
	if(info.additional) education.appendChild(Text(info.additional));
	return education 
}

export const Experience = (info) => {
	let experience = document.createElement('div');
	experience.className = "experience";

	let experience_header = document.createElement('div');
	experience_header.className = "experience_header";
	experience_header.appendChild(Text(info.title + ' | ' + info.location));
	experience_header.appendChild(Text(info.date,'date'));

	experience.appendChild(experience_header);
	experience.appendChild(List(info.experience,'experience_list'));
	return experience;
} 


export const Contact = (contact_items,className = null) => {
	let contact = Element('div',className);
	let notFirst = false;
	contact_items.forEach(c =>{
		if(notFirst) contact.innerHTML += " | " 
		else notFirst = !notFirst;
		contact.innerHTML += c;
	})
	return contact;
}

