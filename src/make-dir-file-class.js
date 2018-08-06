const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const chalk = require('chalk');

module.exports = class MakeDirFile {
  constructor(projectInfo) {
    this._projectInfo = projectInfo;
    this._values = [];
    this._dirCnt = 0;
    this._fileCnt = 0;
    this._mavenModuleNames = projectInfo['maven-module-names'] || [];
    this._modulePare = {
      '-domain': 'domain',
      '-service': 'service',
      '-adapter-skeleton': 'adapter',
      '-adapter-stub': 'adapter',
      '-client': 'adapter',
      '-front': 'ui',
      '-spring-boot': 'api'
    };
    console.log();
  }
  get values() {
    return this._values;
  }
  get dirCnt() {
    return this._dirCnt;
  }
  get fileCnt() {
    return this._fileCnt;
  }
  getDestName(srcName) {
    const result = [];
    const idx1 = srcName.indexOf('[');
    const idx2 = srcName.lastIndexOf(']');
    const key = srcName.substring(idx1 + 1, idx2);
    const replaceStr = srcName.substring(idx1, idx2 + 1);
    result.push(key);
    result.push(srcName.replace(replaceStr, this._projectInfo[key]));
    return result;
  }
  async generate(srcDir, destDir) {
    const stats = fs.lstatSync(srcDir);
    const info = {
      path: srcDir,
      name: path.basename(srcDir)
    };
    if (stats.isDirectory()) {
      info.type = 'folder';
      let ensureDirFlag = true;
      if(info.name.startsWith('[')) {
        let destName = this.getDestName(info.name);
        if(destName[0] == 'java-base-package') {
          destName[1] = destName[1].replace(/\./gi, path.sep);
        } else if(destName[0] == 'maven-artifact-id') {
          const module = info.name.replace('[maven-artifact-id]', '');
          const mo = this._modulePare[module];
          if(!this._mavenModuleNames.includes(mo)) {
            ensureDirFlag = false;
          }
        }
        destDir = path.resolve(path.join(destDir, destName[1]));
      } else {
        destDir = path.resolve(path.join(destDir, info.name));
      }
      if(ensureDirFlag) {
        fs.ensureDirSync(destDir);
        this._dirCnt++;
        console.log(`${chalk.yellow('Created Directory')} -> ${destDir}`);
        const readDir = fs.readdirSync(srcDir);
        this._values = readDir.map((child) => {
          return this.generate(`${srcDir}${path.sep}${child}`, destDir);
        });
      }
    } else {
      info.type = 'file';
      let destName = [];
      if(info.name.startsWith('[')) {
        destName = this.getDestName(info.name);
      } else {
        destName[1] = info.name;
      }
      const contentString = fs.readFileSync(info.path, 'utf8');
      const contents = _.template(contentString, { 'interpolate': /<%=([\s\S]+?)%>/g });
      fs.writeFile(`${destDir}${path.sep}${destName[1]}`, contents({data: this._projectInfo}), 'utf8');
      this._fileCnt++;
      console.log(`${chalk.blue('Created File')}      -> ${destDir}${path.sep}${destName[1]}`);
      return `${destDir}${path.sep}${destName[1]}`;
    }
    return Array.prototype.concat(...Array(await Promise.all(this._values)));
  }

  async getFileDescendents(dir) {
    let files = await fs.readdir(dir);
    let result = files.map(file => {
      let p = path.join(dir,file);
      console.log(p);
      return fs.stat(p).then(stat => stat.isDirectory() ? this.getFileDescendents(p) : p);
    });
    return Array.prototype.concat(...(await Promise.all(result))); // flatten
  }
}