const fs = require('fs');
const path = require('path');
const { path } = require("../app");

function getDirectoryContents(files, currentDir, query) {
    let data = [];
    files.forEach(file => {
        if (isDirectory(file)) {
            data.push({
                name: file,
                isDirectory: true,
                path: path.join(query, file)
            });
        } else {
            data.push({
                name: file,
                isDirectory: false,
                path: path.join(query, file, currentDir)
            });
        }
    });
    return data;
}

function isDirectory(currentDir, file) {
    const fileInfo = fs.statSync(path.join(currentDir, file));
    return fileInfo.isDirectory();
}

function readDir(currentDir, res, query) {
    fs.readdir(currentDir, (err, files) => {
        let directoryContents = [];
        if (!err) {
            directoryContents = getDirectoryContents(files, currentDir, query);
        }
        res.json(directoryContents);
    });
}

exports.get = (req, res) => {
};
