const inquirer = require('inquirer');
const fs = require('fs');

const path = require('path');
const txtPath = path.join(__dirname, '../package.json');

const pkg = require('../package.json');
const packageName = pkg.package;
//读取目录
const catalogue = fs.readdirSync(path.join(__dirname, './'))
//过滤不需要的文件
const pages = catalogue.filter(t => !['shared', 'tmpl', 'README.md'].includes(t)).map(name => ({ name }))

const promptList = [
  {
    type: 'list',
    message: `上次启动的目录为${packageName}，是否继续使用？`,
    name: 'loop',
    when: () => !!packageName,
    choices: [
      {
        name: 'Yes',
        value: true,
      },
      {
        name: 'No',
        value: false,
      },
    ],
  },
  {
    type: 'list',
    message: '选择目录',
    name: 'package',
    loop: false,
    when: ({ loop }) => !loop,
    choices: pages,
  },
];
inquirer
  .prompt(promptList)
  .then(({ loop, package }) => {
    pkg.package = loop ? packageName : package
    // 写入文件
    fs.writeFileSync(txtPath, JSON.stringify(pkg));
  })
  .catch((error) => {
    console.log(error)
  });
