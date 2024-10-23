import { response } from 'express';
import fs from 'fs';

const experience_json_reqs = [
	'type',
	'title',
	'location',
	'date',
	'experience'
] 

const education_json_reqs = [
	'school',
	'degree',
	'gpa',
	'graduation'
] 

export const get_experience_data = async (dir) => {
	let promises = [];
	let files_names = fs.readdirSync(dir);
	files_names.forEach(name => {
		let cur_dir = dir+'/'+name;
		if (name.slice(name.lastIndexOf(".")) == '.json'){
			promises.push(get_json(cur_dir,"experience"))
		} else console.warn(`Non-JSON file at ${cur_dir}`);
	})
	return (await Promise.all(promises)).filter(data => data != null);
};


export const get_json = async (dir,type) => {
	try {
		let json_data = JSON.parse(fs.readFileSync(dir));
		if(valid_data(json_data,type)) return json_data;
		
	} catch(error) { 
		console.error(`Invalid json at ${dir}`);
	}
	return null;
}

const valid_data = (data,type) => {
	switch(type){
		case "experience": {
			if(!data instanceof Object) return false;
			for(let item of experience_json_reqs){
				if(!data.hasOwnProperty(item)) return false;
			}
			break;
		}
		case "education": {
			if(!data instanceof Array) return false;
			for(let edu of data){
				if(!edu instanceof Object) return false; 
				for(let req of education_json_reqs){
					if(!edu.hasOwnProperty(req)) return false;
				}
			}
			break;
		}
		default: {

			return false;
		} 
	}
	return true;
}

