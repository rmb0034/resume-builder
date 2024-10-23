import express from 'express';
import path from 'path';
import { get_experience_data, get_json } from './src/backend/util.mjs';
import { fileURLToPath } from 'url';

let __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname,'resume.html'));
});

const required_files = {
	'resume.css':'',
	'resume.js':'src/frontend',
	'elements.js':'src/frontend',
	'sections.js':'src/frontend',
	'template.json':''
}

for(let file_name in required_files){
	app.get('/'+file_name,(req,res) => {
		res.sendFile(path.join(__dirname,required_files[file_name],file_name))
	})
}

app.get('/experiences', async (req,res) => {
	res.send(await get_experience_data(path.join(__dirname,'experiences')));
})

app.get('/education', async (req,res) => {
	res.send(await get_json(path.join(__dirname,'education.json'),'education') ?? []);
})

app.listen(3000)
