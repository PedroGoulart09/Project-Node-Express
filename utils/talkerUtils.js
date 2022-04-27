const fs = require('fs').promises;

const archiveName = './talker.json';
const getTalkers = () =>
    fs.readFile('./talker.json', 'utf-8')
        .then((fileContent) => JSON.parse(fileContent));
const setTalkers = (newTalker) =>
    fs.writeFile(archiveName, JSON.stringify(newTalker));
module.exports = { getTalkers, setTalkers };