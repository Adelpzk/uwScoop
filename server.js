let mysql = require("mysql");
let config = require("./config.js");
const fetch = require("node-fetch");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/loadUserSettings", (req, res) => {
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


app.post("/api/getRequests", (req, res) => {
  let connection = mysql.createConnection(config);
  const userEmail = req.body.users_email;
  let sql = `SELECT * FROM requested_trips Where users_email = (?);`;
  let data = [userEmail];
  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.delete("/api/deleteRequest", (req, res) => {
  let connection = mysql.createConnection(config);
  const postedTrip_id = req.body.postedTrip_id;
  let sql = `DELETE FROM requested_trips WHERE (postedtrips_id = ?);`;
  let data = [postedTrip_id];
  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});


app.post("/api/postRequest", (req, res) => {
  let connection = mysql.createConnection(config);
  const pickupLocation = req.body.pickupLocation;
  const dropoffLocation = req.body.dropoffLocation;
  const deaprtureDate = req.body.departureDate;
  const users_email = req.body.users_email;
  let sql = `INSERT INTO requested_trips (pickup_location, dropoff_location, departure_date, users_email) values 
  (?, ?, ?, ?)`;
  let data = [pickupLocation, dropoffLocation, deaprtureDate, users_email];
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


app.post("/api/getRides", (req, res) => {
  let connection = mysql.createConnection(config);
  const userEmail = req.body.users_email;
  let sql = `SELECT * FROM posted_trips Where users_email = (?);`;
  let data = [userEmail];
  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/getUserInfo", (req, res) => {
  let connection = mysql.createConnection(config);
  const userEmail = req.body.users_email;
  let sql = `SELECT * FROM users Where email = (?);`;
  let data = [userEmail];
  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    let obj = JSON.parse(string);
    res.send({ express: string }); //sending object instead of string for easy access
  });
  connection.end();
});

// app.post("/api/getRides", (req, res) => {
//   let connection = mysql.createConnection(config);
//   let sql = `SELECT * FROM posted_trips Where users_user_id = 1;`;
//   let data = [];
//   connection.query(sql, data, (error, results, fields) => {
//     if (error) {
//       return console.error(error.message);
//     }
//     let string = JSON.stringify(results);
//     let obj = JSON.parse(string);
//     res.send({ express: string });
//   });
//   connection.end();
// });

app.delete("/api/deleteRide", (req, res) => {
  let connection = mysql.createConnection(config);
  const postedTrip_id = req.body.postedTrip_id;
  let sql = `DELETE FROM posted_trips WHERE (postedtrips_id = ?);`;
  let data = [postedTrip_id];
  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});


app.post("/api/postRide", (req, res) => {
  let connection = mysql.createConnection(config);
  const pickupLocation = req.body.pickupLocation;
  const dropoffLocation = req.body.dropoffLocation;
  const deaprtureDate = req.body.departureDate;
  const payment = req.body.payment;
  const amount = req.body.amount;
  const carModel = req.body.carModel;
  const color = req.body.color;
  const departureTime = req.body.departureTime;
  const arrivalTime = req.body.arrivalTime;
  const users_email = req.body.users_email;
  let sql = `INSERT INTO posted_trips (pickup_location, dropoff_location, departure_date, departure_time, arrival_time, payment_method, amount, car_brand, car_color, users_email)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  let data = [pickupLocation, dropoffLocation, deaprtureDate, departureTime, arrivalTime,  payment, amount, carModel, color, users_email];
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
