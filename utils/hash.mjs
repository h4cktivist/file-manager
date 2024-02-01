import fs from 'fs';
import crypto from 'crypto';

export const calculateHash = async (filePath) => {
    const readStream = fs.createReadStream(filePath);
    readStream.on('readable', () => {
        let content = readStream.read();
        if (content) {
            const hash = crypto.createHash('sha256').update(content).digest('hex');
            console.log(hash);
        }
    });
    readStream.on('error', () => {
        console.log('Operation failed');
    });
};
