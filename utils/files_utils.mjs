import fs from 'fs';
import path from 'path';

export const readFile = async (path) => {
    const readStream = fs.createReadStream(path);
    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });
    readStream.on('error', () => {
        console.log('Operation failed');
    });
};

export const createFile = async (filename) => {
    const filePath = path.join(process.cwd(), filename);
    fs.writeFile(filePath, '', (err) => {
        if (err) console.log('Operation failed');
        else console.log('File was successfully created!');
    });
};

export const renameFile = async (path, newFilename) => {
    fs.rename(path, newFilename, (err) => {
        if (err) console.log('Operation failed');
    });
};

export const copyFile = async (filePath, destPath) => {
    const fileName = path.basename(filePath);
    const newFilePath = path.join(destPath, fileName);
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(newFilePath);

    readStream.pipe(writeStream);
    readStream.on('error', () => { console.log('Operation failed'); });
    writeStream.on('error', () => { console.log('Operation failed'); });
};

export const removeFile = async (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) console.log('Operation failed');
    });
};

export const moveFile = async (filePath, destPath) => {
    await copyFile(filePath, destPath);
    await removeFile(filePath);
};
