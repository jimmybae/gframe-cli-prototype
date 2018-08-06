const fs = require('fs-extra');
const path = require('path');

const deleteDirectoryRecursive = (dir) => {
  if(fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(function(file, index){
      const currentDir = path.join(dir, file);
      if(fs.lstatSync(currentDir).isDirectory()) {
        deleteDirectoryRecursive(currentDir);
      } else {
        fs.unlinkSync(currentDir);
      }
    });
    fs.rmdirSync(dir);
  }
};

exports.deleteDirectoryRecursive = deleteDirectoryRecursive;