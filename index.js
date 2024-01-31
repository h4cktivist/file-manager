import readline from 'readline';
import os from 'os';
import { getEOL, getCPUs, getHome, getUsername, getArchitecture } from './utils/os_utils.mjs';
import { listDir } from './utils/nwd_utils.mjs'

const startArgs = process.argv.slice(2);
const username = startArgs.find(arg => arg.startsWith('--username=')).split('=')[1];
console.log(`Welcome to the File Manager, ${username}!`);

const workingDir = os.homedir();
console.log(`You are currently in ${workingDir}`);

const readlineStream = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
readlineStream.setPrompt('> ');
readlineStream.prompt();

readlineStream.on('line', (input) => {
    const args = input.split(' ');
    const operation = args[0];

    switch (operation) {
        case 'ls':
            listDir(workingDir);
            break;
        case 'os':
            switch (args[1]) {
                case '--EOL':
                    getEOL();
                    break;
                case '--cpus':
                    getCPUs();
                    break;
                case '--homedir':
                    getHome();
                    break;
                case '--username':
                    getUsername();
                    break;
                case '--architecture':
                    getArchitecture();
                    break;
                default:
                    console.log('Invalid input');
            }
            break;
        case '.exit':
            readlineStream.close();
            break
        default:
            console.log('Invalid input');
    }
    console.log('----------------');
    console.log(`You are currently in ${workingDir}`);
    readlineStream.prompt();
});

readlineStream.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});
