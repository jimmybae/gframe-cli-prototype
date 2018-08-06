const inquirer = require('inquirer');

module.exports = () => {
  return new Promise(resolve => {
    const question = [];
    question.push({
      type: 'input',
      name: 'project-name',
      message: '프로젝트 이름을 입력하세요.',
      validate: function(value) {
        if(!value) {
          return '필수';
        } else if(!value.match("^[A-Za-z]{1}[a-zA-Z0-9-_]*[a-zA-Z0-9]$")) {
          return '영어시작, 2~5자리';
        }
        return true;
      },
      default: function() {
        return 'biz';
      }
    });
    inquirer.prompt(question)
    .then(answers => {
      resolve(answers['project-name']);
    });
  });
};