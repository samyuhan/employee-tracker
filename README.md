# employee-tracker
![license](https://img.shields.io/badge/license-MIT-blue)
## Table of Contents 
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Questions](#questions)
## Description
This command-line application was created to manage a company's employee database. In the command-line, you will be prompted to click through a menu where you can: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role. You are then presented with a formatted table of the data accordingly or given the chance to input new data or update existing data.
## Installation
To install this generator, please download this repo onto your local computer. Then, make sure to:
- Install npm packages with ```npm i```
- Source the sql files in `cd db` with
```
mysql -u root -p
source schema.sql
source seeds.sql
```
- Get out of mysql with ```quit```
## Usage
To use this application: 
- Open Terminal
- Type ```node index.js```
- View and interact with the database
![Demo Walkthrough](demo.gif)
## License
MIT License - A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.
## Contribution
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](code_of_conduct.md)
## Questions
- Github: [samyuhan](https://github.com/samyuhan)
- Email: syuhan@berkeley.edu
