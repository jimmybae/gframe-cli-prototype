const MakeDirFile = require('./make-dir-file-class');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const templateDir = path.normalize(`${__dirname}${path.sep}.${path.sep}templates`);
// const templates = getDir.getDir('./src/templates');
//const eachDir = null;
const project = {
  project_name: 'abcd',
  artifact_id: 'arti',
  app_name: 'AppName',
  maven_version: 'SNAPSHOT-1.0.0',
  group_id: 'com.example.po',
  module_names: ['service', 'adapter']
}
const destDir = path.resolve(path.join(`..${path.sep}project-init-test`, project.project_name));
if (fs.existsSync(destDir)) {
  fs.removeSync(destDir);
}
// console.log('# project: ', project);
// console.log();

const makeDirFile = new MakeDirFile(project);
const pm = makeDirFile.generate(`${templateDir}${path.sep}[project_name]`, `..${path.sep}project-init-test`)
pm.then(() => {
  console.log();
  console.log(chalk.red('# Complete all'));
  console.log(chalk.green('Project initialization succeeded.', new Date().getTime()));
  console.log('# dir count : ', makeDirFile.dirCnt);
  console.log('# file count : ', makeDirFile.fileCnt);
}).catch((error) => {
  console.log(error);
});




// console.log();
// console.log('###');
// console.log(makeDirFile.getFileDescendents(templateDir).then(() => { console.log(1); }).catch((error) => { console.log(2, error); }));


// makeDirFile.getFileDescendent(templateDir);
// console.log(1);




// Promise.all(Object.values(makeDirFile.values)).then(function (values) {
//   console.log();
//   console.log(chalk.red('# Complete all'));
//   console.log(chalk.green('Project initialization succeeded.', new Date().getTime()));
// });

// getDir.pmMkDirFile(templateDir, '../project-init-test', project);
