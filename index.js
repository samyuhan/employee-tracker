var inquirer = require("inquirer");
var mysql = require("mysql2");
var tbl = require("console.table");
var view = require("./lib/view");
var add = require("./lib/add");
var update = require("./lib/update");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ilove2code!",
  database: "business_db"
});

connection.connect(function(err) {
  if (err) {
      throw err;
  }
  exports.begin();
});

exports.begin = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Role",
                "Quit"                
            ]
        }
    ])
    .then(function(answer) {
      if(answer.choice === "View All Departments") {
        view.viewDepts();
      }
      else if(answer.choice === "View All Roles") {
        view.viewRoles();
      }
      else if(answer.choice === "View All Employees") {
        view.viewEmployees();
      }
      else if(answer.choice === "Add Department") {
        add.addDept();
      }
      else if(answer.choice === "Add Role") {
        // add.addRole();
      }
      else if(answer.choice === "Add Employee") {
        // add.();
      }
      else if(answer.choice === "Update Role") {
        // update.();
      }
      else if(answer.choice === "Quit") {
        connection.end();
        return ;
      }
    });
};