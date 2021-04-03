const express = require("express");
const mysql = require("mysql");
const app = express();
const PORT = process.env.PORT || 8888;
const endPointRoot = "/4537/termproject/API/V1";

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "littlefa_root",
//     password: "Root-0327",
//     database: "littlefa_4537_term_project"
// });

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With")
    next();
});

app.post(endPointRoot + "/user/signup", (req, res) => {
    let user = JSON.parse(req.body);
    let username = user["username"];
    let password = user["password"];
    // connection.query(`INSERT INTO users values "${username}", "${password}"`,
    //     (err, result) => {
    //         if (err) {
    //             throw err;
    //         }
    //         console.log(result);
    //         res.status(202).send("Account Created");
    //     });
    res.status(202).send("Account Created");
});

// app.delete(endPointRoot + "/user", (req, res) => {
//     let user = JSON.parse(req.body);
//     let username = user["username"];
//     connection.query(`DELETE FROM users WHERE user="${username}"`,
//         (err, result) => {
//             if (err) {
//                 throw err;
//             }
//             console.log(result);
//             res.status(202).send("Account Deleted")
//         });
// });

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Listening to port", PORT);
});