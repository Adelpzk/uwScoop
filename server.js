let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post("/api/registerUser", (req, res) => {
	// let connection = mysql.createConnection(config);
	// const firstName = req.body.firstName;
	// const lastName = req.body.lastName;
	// const email = req.body.email;
	// const pass = req.body.password;
	// const program = req.body.program;
	// const year = req.body.year;
	// let sql = `INSERT INTO users (first_name, email, last_name, password, school_year, program) values (?, ?, ?, ?, ?, ?);`;

	// let data = [firstName, email, lastName, pass, year, program];

	// connection.query(sql, data, (error, results, fields) => {
	//   if (error) {
	// 	return console.error(error.message);
	//   }
	//   console.log(results);
	//   let string = JSON.stringify(results);
	//   res.send({ express: string });
	// });
	// connection.end();

	let connection = mysql.createConnection(config);
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const pass = req.body.password;
	const program = req.body.program;
	const year = req.body.year;
	const birthday = req.body.birthday;
	const phoneNumber = req.body.phoneNumber;
	const music = req.body.music;
	let sql = `INSERT INTO users (first_name, email, last_name, password, school_year, program, birthday, phone_number, music_prefrence) values 
  (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
	let data = [firstName, email, lastName, pass, year, program, birthday, phoneNumber, music];
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		console.log(results);
		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
