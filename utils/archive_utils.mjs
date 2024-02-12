import fs from 'fs';
import zlib from 'zlib';
import path from 'path';


export const compressFile = async (filePath, archivePath) => {
    const fileName = path.basename(filePath);
    const archiveName = fileName.concat('.gz');

    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(path.join(archivePath, archiveName));
    const compressStream = zlib.createBrotliCompress();

    readStream.pipe(compressStream).pipe(writeStream);
    writeStream.on('error', () => { console.log('Operation failed'); });
};


export const decompressFile = async (archivePath, destPath) => {
    const fileName = path.basename(archivePath, path.extname(archivePath));

    const readStream = fs.createReadStream(archivePath);
    const writeStream = fs.createWriteStream(path.join(destPath, fileName));
    const decompressStream = zlib.createBrotliDecompress();

    readStream.pipe(decompressStream).pipe(writeStream);
    writeStream.on('error', () => { console.log('Operation failed'); });
};
