const chalk = require('chalk');

module.exports = class Question {
  constructor(projectName) {
    this._projectName = projectName;
  }

  set projectName(projectName) {
    this._projectName = projectName;
  }

  set mavenGroupId(mavenGroupId) {
    this._mavenGroupId = mavenGroupId;
  }

  set mavenArtifactId(mavenArtifactId) {
    this._mavenArtifactId = mavenArtifactId;
  }

  get queryCreateProjectFolder() {
    return {
      name: 'answer',
      message: `Directory ${chalk.yellow(this._projectName)} is not exist. Create the directory?`,
      type: 'confirm'
    };
  }

  get queryReplaceProjectFolder() {
    return {
      name: 'answer',
      message: `Directory ${chalk.yellow(this._projectName)} is not empty. Replace the contents?`,
      type: 'confirm'
    };
  }

  get queryMavenGroupId() {
    return {
      type: 'input',
      name: 'maven-group-id',
      message: `[${this._projectName}] 프로젝트의 group-id를 입력하세요.`,
      validate: function(value) {
        if(!value) {
          return '필수';
        } else if(!value.match(/^[A-za-z]/g)) {
          return '영어, .만';
        }
        return true;
      },
      default: function() {
        return 'com.company.biz';
      }
    }
  }

  get queryMavenArtifactId() {
    return {
      type: 'input',
      name: 'maven-artifact-id',
      message: `[${this._projectName}] 프로젝트의 artifact-id를 입력하세요.`,
      validate: function(value) {
        if(!value) {
          return '필수';
        }
        return true;
      },
      default: function() {
        return 'biz';
      }
    }
  }

  get queryMavenVersion() {
    return {
      type: 'input',
      name: 'maven-version',
      message: `[${this._projectName}] 프로젝트의 version을 입력하세요.`,
      default: function() {
        return '0.0.1-SNAPSHOT';
      }
    }
  }

  get queryMavenModuleNames() {
    /* return {
      type: 'list',
      name: 'maven-module-names',
      message: `[${this._projectName}] 프로젝트의 module names를 선택하세요.`,
      choices: ['domain, service', 'domain, service, adapter', 'domain, service, adapter, ui, api', 'domain, service, ui, api']
    } */
    return {
      type: 'checkbox',
      name: 'maven-module-names',
      message: `[${this._projectName}] 프로젝트의 module names를 선택하세요.`,
      choices: [{
        name: 'domain',
        checked: true
      }, {
        name: 'service',
        checked: true
      }, {
        name: 'adapter'
      }, {
        name: 'ui'
      }, {
        name: 'api'
      }],
      default: () => {
        const reValue = ['domain', 'service'];
        return reValue;
      },
      transformer: function(value) {
        const reValue = ['domain', 'service'];
        // reValue.push(value);
        return reValue;
      },
      validate: function(values) {
        if(!values.includes('domain') || !values.includes('service')) {
          return 'domain, service는 선택해야해.'
        }
        return true;
      }
    }
  }

  get queryJavaBasePackage() {
    return {
      type: 'input',
      name: 'java-base-package',
      message: `[${this._projectName}] 프로젝트의 java package를 입력하세요.`,
      default: () => {
        return this._mavenGroupId;
      }
    }
  }

  get querySpringBootAppName() {
    return {
      type: 'input',
      name: 'spring-boot-app-name',
      message: `[${this._projectName}] 프로젝트의 application 명을 입력하세요.`,
      default: () => {
        return this._mavenArtifactId.charAt(0).toUpperCase() + this._mavenArtifactId.slice(1);
      }
    }
  }
}