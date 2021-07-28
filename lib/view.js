var mysql = require("mysql2");
var index = require("../index");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ilove2code!",
    database: "business_db"
});

exports.viewDepts = () => {
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) {
            throw err;
        } 

        console.table(results);
        index.begin();
    });
}

exports.viewRoles = () => {
    connection.query("SELECT * FROM emp_role", function (err, results) {
        if (err) {
            throw err;
        } 

        console.table(results);
        index.begin();
    });
}

exports.viewEmployees = () => {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, title, dept_name, salary, " +
        "emp_manager.first_name AS manager_first, emp_manager.last_name AS manager_last " +
        "FROM employee " +
        "INNER JOIN emp_role AS r ON employee.role_id = r.id " +
        "INNER JOIN department AS d ON r.department_id = d.id " +
        "LEFT JOIN employee AS emp_manager ON employee.manager_id = emp_manager.id;";

    connection.query(query, function (err, results) {
        if (err) { 
            throw err; 
        }

        console.table(results);
        index.begin();
    });
};