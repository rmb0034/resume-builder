import fs from 'fs';

export const get_experience_data = (dir) => {
	let all_data = [];
	let files_names = fs.readdirSync(dir);
	files_names.forEach(name => {
		let cur_dir = dir+'/'+name;
		if (name.slice(name.lastIndexOf(".")) == '.json'){
			try{
				all_data.push(JSON.parse(fs.readFileSync(cur_dir)))
			} catch(error){
				console.error(`Invalid json at ${cur_dir}`)
			}
		} else console.warn(`Non-JSON file at ${cur_dir}`);
	})
	return all_data;
};

const validate_data = (data) => {
	if(!data instanceof Map) return false;
	return true;
}
