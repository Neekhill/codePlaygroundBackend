const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname + "../../codes");
console.log(dirCodes);
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = function async(format, code) {
  jobId = uuid();
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCodes, filename);
  fs.writeFileSync(filepath, code);
  return filepath;
};

module.exports = {
  generateFile: generateFile,
};