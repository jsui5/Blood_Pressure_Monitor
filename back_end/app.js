const express = require("express");
const mysql = require("mysql");
const app = express();
const PORT = process.env.PORT || 8888;

const endPointRoot = "/4537/termproject/API/V1";

const connection = mysql.createConnection({
    host: "localhost",
    user: "littlefa_root",
    password: "Root-0327",
    database: "littlefa_4537_term_project"
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With")
    next();
});

app.use(express.json());

increment = (id) => {
    connection.query(`UPDATE endpoints SET count = count + 1 WHERE id = ${id}`,
        (err, result) => {
            if (err) {
                throw err;
            }
            console.log(result);
    });
};

app.post(endPointRoot + "/user/signup", (req, res) => {
    connection.query(`INSERT INTO users (user, password) VALUES ("${req.body.username}", "${req.body.password}")`,
        (err, result) => {
        if (err) {
            throw err;
        }
        increment(0);
        res.status(202).send("Account Created");
        console.log(result);
    });
});

app.delete(endPointRoot + "/user", (req, res) => {
    connection.query(`DELETE FROM users WHERE user="${req.body.username}"`,
        (err, result) => {
       if (err) {
           throw err;
       }
       increment(1);
       console.log(result);
       res.status(202).send("Account Deleted")
    });
});

app.get(endPointRoot + "/admin", (req, res) => {
    connection.query(`SELECT * FROM endpoints`,
        (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Listening to port", PORT);
});
