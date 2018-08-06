const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const _ = require('lodash');

const utils = require('./utils');
const templateDir = path.normalize(`${__dirname}${path.sep}.${path.sep}templates`);
const Question = require('./question-class');
const MakeDirFile = require('./make-dir-file-class');

module.exports = (project) => {
  const question = new Question(project['project-name']);
  const destDir = path.resolve(path.join(`.${path.sep}`, project['project-name'])); // 임시
  console.log();
  let existsFolder = false;
  if (fs.existsSync(destDir)) {
    existsFolder = true;
  }
  inquirer.prompt(existsFolder ? question.queryReplaceProjectFolder : question.queryCreateProjectFolder)
  .then(answers => {
    if(answers.answer) {
      if(existsFolder) {
        fs.removeSync(destDir);
      }
      console.log(project);

      const makeDirFile = new MakeDirFile(project);
      const pm = makeDirFile.generate(`${templateDir}${path.sep}[project-name]`, `.${path.sep}`)
      pm.then(() => {
        console.log();
        console.log(chalk.yellow(`# Directory: ${makeDirFile.dirCnt}`));
        console.log(chalk.blue(`# File     : ${makeDirFile.fileCnt}`));
        console.log();
        console.log(chalk.green('Project initialization succeeded.'));
      }).catch((error) => {
        console.log(error);
      });
    }
  });
};