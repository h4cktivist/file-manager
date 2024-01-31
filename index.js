import readline from 'readline';

const args = process.argv.slice(2);
const username = args.find(arg => arg.startsWith('--username=')).split('=')[1];
console.log(`Welcome to the File Manager, ${username}!`);

const readlineStream = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

readlineStream.setPrompt('> ');
readlineStream.prompt();
