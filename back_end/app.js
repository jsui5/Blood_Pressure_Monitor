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
    res.header("Access-Control-Allow-Origin", "https://jmajam.com");
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
    connection.query(`SELECT COUNT(user) AS numberOfUser FROM users WHERE user = "${req.body.username}"`,
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
                throw err;
            }
            if (result[0]["numberOfUser"] > 0) {
                res.status(403).send("User Name already Exists!")
            } else {
                connection.query(`INSERT INTO users (user, password) VALUES ("${req.body.username}", "${req.body.password}")`,
                    (err, result) => {
                        if (err) {
                            throw err;
                        }
                        console.log(result);
                        increment(0);
                        connection.query(`SELECT id FROM users WHERE user = "${req.body.username}" AND password = "${req.body.password}"`,
                            (err, result) => {
                                if (err) {
                                    res.status(500).send("Internal Server Error");
                                    throw err;
                                }
                                res.status(201).json(result);
                        })
                });
            }
        })
});

app.post(endPointRoot + "/user/login", (req, res) => {
    connection.query(`SELECT id FROM users WHERE user = "${req.body.username}" AND password = "${req.body.password}"`,
        (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
            throw err;
        }
        if (result.length === 0) {
            res.status(400).send("Something Went Wrong, Please Enter the Correct Credential!");
        } else {
            increment(1);
            res.status(202).json(result);
        }
    });
});

app.post(endPointRoot + "/user/admin", (req, res) => {
    connection.query(`SELECT isAdmin FROM users WHERE user = "${req.body.username}" AND password = "${req.body.password}"`,
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
                throw err;
            }
            if (result.length === 0) {
                res.status(401).send("Something Went Wrong, Please Enter the Correct Credential!");
            } else {
                increment(2);
                res.status(202).json(result);
            }
    });
});

app.post(endPointRoot + "/bloodPressure/advice", (req, res) => {
    connection.query(`INSERT INTO advice (message, source) VALUES ("${req.body.advice}", "${req.body.username}")`,
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
                throw err;
            }
            increment(3);
            res.status(202).send("Advice Stored.");
            console.log(result);
        });
});

app.post(endPointRoot + "/bloodPressure", (req, res) => {
    connection.query(`INSERT INTO blood_pressure (systolic, diastolic, uid) VALUES (${req.body.sys}, ${req.body.dia},
                        ${req.body.uid})`,
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
                throw err;
            }
            increment(11);
            res.status(202).send("Blood Pressure Stored.");
            console.log(result);
        });
});

app.delete(endPointRoot + "/user", (req, res) => {
    connection.query(`DELETE FROM users WHERE user="${req.body.username}"`,
        (err, result) => {
       if (err) {
           res.status(500).send("Internal Server Error");
           throw err;
       }
       increment(5);
       console.log(result);
       res.status(202).send("Account Deleted")
    });
});

app.delete(endPointRoot + "/bloodPressure", (req, res) => {
    connection.query(`DELETE FROM blood_pressure WHERE id="${req.body.id}"`,
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
                throw err;
            }
            increment(4);
            console.log(result);
            res.status(202).send("Record Deleted")
        });
});

app.get(endPointRoot + "/admin", (req, res) => {
    connection.query(`SELECT * FROM endpoints`,
        (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
            throw err;
        }
        increment(6);
        res.status(202).json(result);
    });
});

app.get(endPointRoot + "/bloodPressure/view", (req, res) => {
    connection.query(`SELECT blood_pressure.uid, blood_pressure.systolic, blood_pressure.diastolic, blood_pressure.id, DATE_FORMAT(date, "%Y %M %D %r") AS niceDate FROM blood_pressure INNER JOIN users ON users.id = blood_pressure.uid WHERE users.id = ${req.query.uid}`,
    (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
            throw err;
        }
        increment(7);
        res.status(202).json(result);
    });
});

app.get(endPointRoot + "/bloodPressure/advice", (req, res) => {
    connection.query(`SELECT * FROM advice`,
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
                throw err;
            }
            increment(8);
            res.status(200).json(result);
    });
});

app.put(endPointRoot + "/bloodPressure", (req, res) => {
    connection.query(`UPDATE blood_pressure SET systolic = ${req.body.newSys}, diastolic = ${req.body.newDia} WHERE id = ${req.body.id}`,
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
                throw err;
            }
            increment(9);
            res.status(202).json(result);
        });
});

app.put(endPointRoot + "/user", (req, res) => {
    connection.query(`UPDATE users SET password = "${req.body.newPass}" WHERE id = ${req.body.id}`,
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
                throw err;
            }
            increment(10);
            res.status(202).json(result);
        });
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Listening to port", PORT);
});
