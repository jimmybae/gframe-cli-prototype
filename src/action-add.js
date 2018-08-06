const inquirer = require('inquirer');

module.exports = (options) => {
  const result = {};
  const question = [];
  if(!options.ftype) {
    question.push({
      type: 'list',
      name: 'ftype',
      message: `파일 유형을 선택하세요.`,
      choices: ['domain entity', 'service', 'ms proxy', 'jpa store']
    });
  } else if(options.ftype == true) {
    console.log();
    console.log('  error: The file type (-t --ftype) should be one of domain-entity, service, ms-proxy, jpa-store.');
    console.log();
    process.exit(0);
  }
  if(!options.fname) {
    question.push({
      type: 'input',
      name: 'fname',
      message: `파일명을 입력하세요.`
    });
  }

  inquirer.prompt(question)
  .then(answers => {
    result.ftype = answers.ftype ? answers.ftype : options.ftype;
    result.fname = answers.fname ? answers.fname : options.fname;
    console.log('\n# gframe add:\n');
    console.log(result);
  });
};