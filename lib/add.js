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
            choices: ['Engineering', 'Finance', 'Legal', 'Sales']
        }
    ];

    inquirer.prompt(questions)
        .then((answers) => {
            var sql = "INSERT INTO emp_role (title, salary, department_id) VALUES (?, ?, ?)";
            let dept_id = 1;

            if (answers.dept === "Finance") dept_id = 2;
            if (answers.dept === "Legal") dept_id = 3;
            if (answers.dept === "Sales") dept_id = 4;

            connection.query(sql, [answers.role, answers.salary, dept_id], function (err, result) {
                if (err) throw err;
                console.info("Added " + answers.role + " to the database");
            });
            
            index.begin();
        });    
};

exports.addEmployee = () => {
    view.viewEmployees(function (rolesResults) {
        var roles = [];
        for (var i = 0; i < rolesResults.length; i++) {
            roles.push(rolesResults[i].title);
        }
        console.log(roles);

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
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: roles
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "role",
                choices: roles
            }
        ];

        inquirer.prompt(questions)
            .then((answers) => {
                var roleId = null;
                for (var i = 0; i < rolesResults.length; i++) {
                    if (rolesResults[i].title === answers.role) {
                        roleId = rolesResults[i].role_id
                    }
                }
                connection.query("INSERT INTO employees SET ?",
                    {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        role_id: roleId
                    },
                    function (err, results) {
                        if (err) {
                            throw err;
                        }

                        console.log("Added " + answers.firstName + " " + answers.lastName + " to the database");
                        index.begin();
                    });
            });
    });
};
