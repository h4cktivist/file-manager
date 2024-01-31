import readline from 'readline';

const startArgs = process.argv.slice(2);
const username = startArgs.find(arg => arg.startsWith('--username=')).split('=')[1];
console.log(`Welcome to the File Manager, ${username}!`);

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
        case '.exit':
            readlineStream.close();
            break
        default:
            console.log('Invalid input');
    }
    readlineStream.prompt();
});

readlineStream.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});
