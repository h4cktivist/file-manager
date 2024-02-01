import readline from 'readline';
import os from 'os';
import { getUser } from './utils/user.mjs';
import { listDir, changeDir, goUp } from './utils/nwd_utils.mjs';
import { readFile, createFile, renameFile, copyFile, moveFile, removeFile } from './utils/files_utils.mjs';
import { getEOL, getCPUs, getHome, getUsername, getArchitecture } from './utils/os_utils.mjs';
import { calculateHash } from './utils/hash.mjs'
import { compressFile, decompressFile } from './utils/archive_utils.mjs';

const username = await getUser();
console.log(`Welcome to the File Manager, ${username}!`);

process.chdir(os.homedir());
console.log(`You are currently in ${process.cwd()}`);

const readlineStream = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
readlineStream.setPrompt('> ');
readlineStream.prompt();

readlineStream.on('line', async (input) => {
    const args = input.split(' ');
    const operation = args[0];

    switch (operation) {
        case 'up':
            await goUp();
            break;
        case 'cd':
            await changeDir(args[1]);
            break;
        case 'ls':
            await listDir(process.cwd());
            break;
        case 'cat':
            await readFile(args[1]);
            break;
        case 'add':
            await createFile(args[1]);
            break;
        case 'rn':
            await renameFile(args[1], args[2]);
            break;
        case 'cp':
            await copyFile(args[1], args[2]);
            break;
        case 'mv':
            await moveFile(args[1], args[2]);
            break;
        case 'rm':
            await removeFile(args[1], args[2]);
            break;
        case 'os':
            switch (args[1]) {
                case '--EOL':
                    await getEOL();
                    break;
                case '--cpus':
                    await getCPUs();
                    break;
                case '--homedir':
                    await getHome();
                    break;
                case '--username':
                    await getUsername();
                    break;
                case '--architecture':
                    await getArchitecture();
                    break;
                default:
                    console.log('Invalid input');
            }
            break;
        case 'hash':
            await calculateHash(args[1]);
            break;
        case 'compress':
            await compressFile(args[1], args[2]);
            break;
        case 'decompress':
            await decompressFile(args[1], args[2]);
            break;
        case '.exit':
            readlineStream.close();
            break
        default:
            console.log('Invalid input');
    }
    console.log('----------------');
    console.log(`You are currently in ${process.cwd()}`);
    readlineStream.prompt();
});

readlineStream.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});
