const { exec } = require("child_process");

function executeFileJs(filepath) {
  return new Promise((resolve, reject) => {
    exec(`node ${filepath} `, (error, stdout, stderr) => {
      //error && reject(error, stderr);
      stderr && reject(stderr);
      resolve(stdout);
    });
  });
}

module.exports = { executeFileJs };
