import fs from 'fs';

const json_reqs = [
	'type',
	'title',
	'location',
	'date',
	'experience'
] 

export const get_experience_data = (dir) => {
	let all_data = [];
	let files_names = fs.readdirSync(dir);
	files_names.forEach(name => {
		let cur_dir = dir+'/'+name;
		if (name.slice(name.lastIndexOf(".")) == '.json'){
			try{
				let json_data =JSON.parse(fs.readFileSync(cur_dir));
				if(valid_data(json_data)) all_data.push(json_data);
			} catch(error){
				console.error(`Invalid json at ${cur_dir}`)
			}
		} else console.warn(`Non-JSON file at ${cur_dir}`);
	})
	return all_data;
};

const valid_data = (data) => {
	if(!data instanceof Object) return false;
	for(let item of json_reqs){
		if(!data.hasOwnProperty(item)) return false;
	}
	return true;
}
