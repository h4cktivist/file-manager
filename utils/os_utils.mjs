import os from 'os';
import * as util from 'util';

export const getEOL = () => {
    try {
        console.log(`The system EOL is ${util.inspect(os.EOL)}`);
    }
    catch {
        console.log('Operation failed');
    }
};

export const getCPUs = () => {
    try {
        const cpus = os.cpus();
        console.log(`Overall amount of CPUs is ${cpus.length}`);
        for (let i = 0; i < cpus.length; i++) {
            console.log(`${cpus[i].model}`);
        }
    }
    catch {
        console.log('Operation failed');
    }
};

export const getHome = () => {
    try {
        console.log(`Home directory is ${os.homedir()}`);
    }
    catch {
        console.log('Operation failed');
    }
};

export const getUsername = () => {
    try {
        console.log(`Current system user name is ${os.userInfo().username}`);
    }
    catch {
        console.log('Operation failed');
    }
};

export const getArchitecture = () => {
    try {
        console.log(`CPU architecture is ${os.arch()}`);
    }
    catch {
        console.log('Operation failed');
    }
};
