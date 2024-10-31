import express from 'express';
import path from 'path';
import { get_experience_data, get_json, start_app, valid_resume_dir } from './src/backend/util.mjs';
import { fileURLToPath } from 'url';

let __dirname = path.dirname(fileURLToPath(import.meta.url));
let __cwd = process.cwd();

let app = express();

if(valid_resume_dir(__cwd)){
	try {
		start_app(app,__cwd,__dirname);
	}
	catch(error){
		console.log(error)
	}
}
else console.log("Invalid Resume Directory!");
