#!/usr/bin/env node
const path = require('path');

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

// Load our package.json, so that we can pass the version onto `commander`.
const { version } = require('../package.json');
const actionInit = require('./action-init');
const actionAdd = require('./action-add');

const versionStr = `
  ${chalk.blue(
    figlet.textSync('GFramework CLI', { horizontalLayout: 'default', font: 'banner' })
  )}
  Node: 9.4.0
  GFramework CLI: ${version}
`;

program
  .name('gframe')
  //.version(versionStr, '-v, --version')
  .version(versionStr)
  .description('GFramework CLI')
  .on('--help', function() {
    console.log();
    console.log('  Examples:');
    console.log();
    console.log('    $ gframe init [options]');
    console.log('    $ gframe init -P biz -g com.company.biz -a biz -v 0.0.1-SNAPSHOT -m "adapter, ui, api" -p com.company.biz -A Biz');
    console.log('    $ gframe init -h');
    console.log();
    console.log('    $ gframe add [options]');
    console.log('    $ gframe add -h');
    console.log();
  });

program
  .command('init')
  .description('Helps to initialize the GFramework project.')
  .option('-P, --project-name <project name>', chalk.yellow('-P biz'))
  .option('-g, --maven-group-id <maven group id>', chalk.yellow('-g com.company.biz'))
  .option('-a, --maven-artifact-id <maven artifact id>', chalk.yellow('-a biz'))
  .option('-v, --maven-version <maven version>', chalk.yellow('-v 0.0.1-SNAPSHOT'))
  .option('-m, --maven-module-names <maven module names>', chalk.yellow('-m "adapter, ui, api" ') + chalk.red('(adding automatically "domain, service")'))
  .option('-p, --java-base-package <java base package>', chalk.yellow('-p com.company.biz'))
  .option('-A, --spring-boot-app-name <spring boot app name>', chalk.yellow('-A Biz'))
  .action(actionInit);

program
  .command('add')
  .description('Helps to add files of the GFramework project.')
  .option('-t, --ftype <file type>',
    'file type (one of domain-entity, service, ms-proxy, jpa-store)',
    /^(domain-entity|service|ms-proxy|jpa-store)$/i)
  .option('-n, --fname <file name>', 'file name')
  .action(actionAdd);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);
