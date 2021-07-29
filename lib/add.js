var inquirer = require("inquirer");
var mysql = require("mysql2");
var index = require("../index");
var view = require("./view");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ilove2code!",
    database: "business_db"
});

exports.addDept = () => {
    var questions = [
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'dept'
        }
    ];

    inquirer.prompt(questions)
        .then((answers) => {
            var sql = "INSERT INTO department (dept_name) VALUES (?)";

            connection.query(sql, [answers.dept], function (err, result) {
                if (err) throw err;
                console.info("Added " + answers.dept + " to the database");
            });

            index.begin();
        });
};

exports.addRole = () => {

    connection.query("SELECT * FROM department", function (err, results) {
        if (err) {
            throw err;
        } 
        
        let depts = [];

        for (var i = 0; i < results.length; i++) {
            depts.push(results[i].dept_name);
        }
        
        var questions = [
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'salary'
            },
            {
                type: "list",
                message: "Which department does the role belong to?",
                name: "dept",
                choices: depts
            }
        ];
    
        inquirer.prompt(questions)
            .then((answers) => {
                var sql = "INSERT INTO emp_role (title, salary, department_id) VALUES (?, ?, ?)";
                let dept_id = 1;
                
                if (answers.dept === "Finance") dept_id = 2;
                if (answers.dept === "Legal") dept_id = 3;
                if (answers.dept === "Sales") dept_id = 4;
    
                connection.query(sql, [answers.role, answers.salary, answers.dept], function (err, result) {
                    if (err) throw err;
                    console.info("Added " + answers.role + " to the database");
                });
    
                index.begin();
            });
    });
    
};

exports.addEmployee = () => {
    var questions = [
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName"
        },
        {
            type: "input",
            message: "What is the employee's role?",
            name: "role"
        },
        {
            type: "input",
            message: "What is the employee's manager's first name?",
            name: "managerFirst"
        },
        {
            type: "input",
            message: "What is the employee's manager's last name?",
            name: "managerLast"
        }
    ];

    inquirer.prompt(questions)
        .then((answers) => {
            var sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            connection.query(sql, [answers.firstName, answers.lastName, answers.role,], function (err, results) {
                if (err) throw err;

                console.log("Added " + answers.firstName + " " + answers.lastName + " to the database");
                index.begin();
            });
        });
};
