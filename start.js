const express = require('express');
const path = require('path');
const util = require('./src/backend/util');

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

app.get('/experiences',(req,res) => {
	res.send(util.get_experience_data(path.join(__dirname,'experiences')));
})

app.listen(3000)
