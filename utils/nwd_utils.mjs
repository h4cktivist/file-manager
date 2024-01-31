import os from 'os';
import fs from 'fs';

export const listDir = (path) => {
    let filesData = [];
    fs.readdir(path, { withFileTypes: true }, (err, files) => {
        if (err) console.log('Operation failed');
        else {
            files.forEach(file => {
                filesData.push({
                    Name: file.name,
                    Type: file.isDirectory() ? 'directory' : 'file'
                });
            });
            filesData.sort((x, y) => {
                if (x.Type === 'directory' && y.Type === 'file') return -1;
                else if (x.Type === 'file' && y.Type === 'directory') return 1;
                else return 0;
            });
            console.log(os.EOL);
            console.table(filesData);
        }
    });
};
