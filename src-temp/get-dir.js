const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const pmMkDirFile = (tempDir, destDir, project) => {
  var values = [];
  getDir(tempDir, destDir, project, values);
};

const getDir = (tempDir, destDir, project, values) => {
  const stats = fs.lstatSync(tempDir);
  const info = {
    path: tempDir,
    name: path.basename(tempDir)
  };
  if (stats.isDirectory()) {
    info.type = 'folder';
    if(info.name.startsWith('[')) {
      const idx1 = info.name.indexOf('[');
      const idx2 = info.name.lastIndexOf(']');
      const key = info.name.substring(idx1 + 1, idx2);
      const replaceStr = info.name.substring(idx1, idx2 + 1);
      let destFolderName = info.name.replace(replaceStr, project[key]);
      if(key == 'group_id') {
        destFolderName = destFolderName.replace(/\./gi, path.sep);
      }
      destDir = path.resolve(path.join(destDir, destFolderName));
    } else {
      destDir = path.resolve(path.join(destDir, info.name));
    }
    // console.log("Create Directory S: " + destDir);
    const pm = fs.ensureDir(destDir);
    
    pm.then(() => {
      console.log("Complete Create Directory -> " + destDir);
      info.children = fs.readdirSync(tempDir).map((child) => {
        return getDir(`${tempDir}${path.sep}${child}`, destDir, project);
      });
    });
  } else {
    // Assuming it's a file. In real life it could be a symlink or
    // something else!
    info.type = 'file';
    let destFileName = '';
    if(info.name.startsWith('{')) {
      const idx1 = info.name.indexOf('{');
      const idx2 = info.name.lastIndexOf('}');
      const key = info.name.substring(idx1 + 1, idx2);
      const replaceStr = info.name.substring(idx1, idx2 + 1);
      destFileName = info.name.replace(replaceStr, project[key]);
    } else {
      destFileName = info.name;
    }
    const contentString = fs.readFileSync(info.path, 'utf8');
    const contents = _.template(contentString);
    // console.log(`Create File      S: ${destDir}${path.sep}${destFileName}`);
    const pm = fs.writeFile(`${destDir}${path.sep}${destFileName}`, contents(project), 'utf8');
    pm.then(() => {
      console.log(`Complete Create File      -> ${destDir}${path.sep}${destFileName}`);
    });
  }
  return info;
};

const getDirTmp = (filename) => {
  //console.log(filename);
  var stats = fs.lstatSync(filename),
    info = {
      path: filename,
      name: path.basename(filename)
    };
  if (stats.isDirectory()) {
    info.type = 'folder';
    console.log(info);
    info.children = fs.readdirSync(filename).map((child) => {
      return getDir(filename + '/' + child);
    });
  } else {
    // Assuming it's a file. In real life it could be a symlink or
    // something else!
    info.type = 'file';
    console.log(info);
  }
  return info;
};

exports.pmMkDirFile = pmMkDirFile;