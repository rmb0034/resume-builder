import { response } from 'express';
import fs from 'fs';
import path from 'path';
import { arrayBuffer } from 'stream/consumers';

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
		case "template": break; 
		default: return false; 
	}
	return true;
}

export const valid_resume_dir = (dir) =>{
	let required_elements = ['education.json','template.json','experiences']
	let result = new Array(required_elements.length).fill(false);
	fs.readdirSync(dir).forEach( name => {
		for(let i in result){
			if(name == required_elements[i]) result[i] = true;
		}
	}
	);
	return result.every(element => element === true);
};

export const start_app = (app,cwd,dirname) => {
	app.get('/', (req, res) => {
		res.sendFile(path.join(dirname,'resume.html'));
	});

	app.get('/resume.css', (req, res) => {
		res.sendFile(path.join(dirname,'resume.css'));
	});

	for(let file_name of fs.readdirSync(dirname + '/src/frontend')){
		app.get('/'+file_name,(req,res) => {
			res.sendFile(path.join(dirname,'/src/frontend',file_name))
		})
	}

	app.get('/experiences', async (req,res) => {
		res.send(await get_experience_data(path.join(cwd,'experiences')));
	})

	app.get('/education', async (req,res) => {
		res.send(await get_json(path.join(cwd,'education.json'),'education') ?? []);
	})

	app.get('/template', async (req,res) => {
		res.send(await get_json(path.join(cwd,'template.json'),'template') ?? []);
	})

	app.listen(3000)
}
