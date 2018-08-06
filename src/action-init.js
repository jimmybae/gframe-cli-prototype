const inquirer = require('inquirer');
const promptProjectName = require('./prompt-project-name');
const generateProject = require('./generate-project');
const Question = require('./question-class');

module.exports = async (options) => {
  const result = {};
  result['project-name'] = options.projectName ? options.projectName : await promptProjectName(options);
  
  const question = new Question(result['project-name']);
  let qArray = [];
  if(!options.mavenGroupId) {
    qArray.push(question.queryMavenGroupId);
  }

  if(!options.mavenArtifactId) {
    qArray.push(question.queryMavenArtifactId);
  }

  if(!options.mavenVersion) {
    qArray.push(question.queryMavenVersion);
  }

  if(!options.mavenModuleNames) {
    qArray.push(question.queryMavenModuleNames);
  } else {
    if(!options.mavenModuleNames.includes('domain')) {
      console.log(options.mavenModuleNames);
      options.mavenModuleNames += ', domain';
    }
    if(!options.mavenModuleNames.includes('service')) {
      console.log(options.mavenModuleNames);
      options.mavenModuleNames += ', service';
    }
    console.log(options.mavenModuleNames);
  }
  
  inquirer.prompt(qArray)
  .then(answers => {
    result['maven-group-id'] = answers['maven-group-id'] ? answers['maven-group-id'] : options.mavenGroupId;
    result['maven-artifact-id'] = answers['maven-artifact-id'] ? answers['maven-artifact-id'] : options.mavenArtifactId;
    result['maven-version'] = answers['maven-version'] ? answers['maven-version'] : options.mavenVersion;
    result['maven-module-names'] = answers['maven-module-names'] ? answers['maven-module-names'] : options.mavenModuleNames;

    qArray = [];
    question.mavenGroupId = result['maven-group-id'];
    question.mavenArtifactId = result['maven-artifact-id'];

    if(!options.javaBasePackage) {
      qArray.push(question.queryJavaBasePackage);
    }

    if(!options.springBootAppName) {
      qArray.push(question.querySpringBootAppName);
    }

    inquirer.prompt(qArray)
    .then(answers => {
      result['java-base-package'] = answers['java-base-package'] ? answers['java-base-package'] : options.javaBasePackage;
      result['spring-boot-app-name'] = answers['spring-boot-app-name'] ? answers['spring-boot-app-name'] : options.springBootAppName;
      generateProject(result);
    });
  });
};