import { loadEnvFile } from 'node:process';
loadEnvFile();

console.log(process.env.TEST_VAR); // 123