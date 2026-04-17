// .env
TEST_VAR=123

// new.js 
import { loadEnvFile } from 'node:process';
loadEnvFile();
console.log(process.env.TEST_VAR); // 123

// old.js
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.TEST_VAR); // 123