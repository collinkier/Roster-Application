#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs'); 

const collectInputs = async (inputs = []) => {
  const prompts = [
    
    {
      type: 'input',
      name: 'name',
      message: 'Name: '
 
    },

    {
      type: 'list',
      name: 'role',
      message: 'Role: ',
      choices: ['Manager', 'Engineer', 'Employee', 'Intern'], 
     },
    {
      type: 'input',
      name: 'id',
      message: 'ID: '
 
    },
    {
      type: 'input',
      name: 'email',
      message: 'Email: '
 
    },
    {
      type: 'input',
      name: 'github',
      message: 'Github: ',
      when: (answers) => answers.role === 'Engineer',
    },

    {
      type: 'input',
      name: 'office',
      message: 'Office number: ',
      when: (answers) => answers.role === 'Manager',
    },
    {
      type: 'input',
      name: 'college',
      message: 'College: ',
      when: (answers) => answers.role === 'Intern',
    },

    {
      type: 'confirm',
      name: 'again',
      message: 'Enter another input? ',
      default: true
    }
  ];
  const { again, ...answers } = await inquirer.prompt(prompts);
  const newInputs = [...inputs, answers];
  return again ? collectInputs(newInputs) : newInputs;
};
 const main = async () => {
 const inputs = await collectInputs();
 console.log(inputs)
 fs.writeFileSync('employee.json',JSON.stringify(inputs));     //this creates the stringified version
 console.log("Saved file 'employee.json'.");
 var rawdata = fs.readFileSync('employee.json');
 var empdata = JSON.parse(rawdata);
 //console.log(empdata);

 }
main();
