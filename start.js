const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname,'resume.html'));
});

const required_files = [
	'resume.css',
	'resume.js',
	'elements.js',
	'template.json'
];

required_files.forEach( file_name => {
	app.get('/'+file_name,(req,res) =>{
		res.sendFile(path.join(__dirname,file_name))
	})
});

app.get('/experiences',(req,res) => {
	res.send('lolz');
})

app.listen(3000)
