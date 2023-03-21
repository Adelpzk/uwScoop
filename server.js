let mysql = require("mysql");
let config = require("./config.js");
const multer = require("multer");
const fetch = require("node-fetch");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const { response } = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/", express.static(path.join(__dirname, "/")));

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
  let data = [
    firstName,
    email,
    lastName,
    pass,
    year,
    program,
    birthday,
    phoneNumber,
    music,
  ];
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
  let sql = `SELECT * FROM requested_trips Where users_email = (?) order by actual_date asc;`;
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
  let sql = `DELETE FROM requested_trips WHERE (requestedtrips_id = ?);`;
  let data = [postedTrip_id];
  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error("test" + error.message);
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
  const actual_date = req.body.departureDate.split("/").reverse().join("-");
  let sql = `INSERT INTO requested_trips (pickup_location, dropoff_location, departure_date, users_email, actual_date) values 
  (?, ?, ?, ?, ?)`;
  let data = [
    pickupLocation,
    dropoffLocation,
    deaprtureDate,
    users_email,
    actual_date,
  ];
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
  let sql = `SELECT * FROM posted_trips Where users_email = (?) order by actual_date asc;`;
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

// app.post("/api/getPendingRequests", (req, res) => {
//   let connection = mysql.createConnection(config);
//   let sql = `select requestedtrips_id, pending from requested_trips`;
//   connection.query(sql, (error, results, fields) => {
//     if (error) {
//       return console.error(error.message);
//     }
//     let string = JSON.stringify(results);
//     let obj = JSON.parse(string);
//     res.send({ express: string });
//   });
//   connection.end();
// });

// app.post("/api/postMatchedRide", (req, res) => {
//   let connection = mysql.createConnection(config);
//   const pendingId = req.body.id;
//   const pending = req.body.pending;
//   let sql = `I`;
//   let data = [pending, pendingId];
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

app.post("/api/postPendingRequests", (req, res) => {
  let connection = mysql.createConnection(config);
  const pendingId = req.body.id;
  const pending = req.body.pending;
  let sql = `UPDATE posted_trips set pendingPosts = ? where postedtrips_id = ?`;
  let data = [pending, pendingId];
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

app.post("/api/postPendingPosts", (req, res) => {
  let connection = mysql.createConnection(config);
  const pendingId = req.body.id;
  const pending = req.body.pending;
  let sql = `UPDATE requested_trips set pending = ? where requestedtrips_id = ?`;
  let data = [pending, pendingId];
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

app.post("/api/sendNotification", (req, res) => {
  let connection = mysql.createConnection(config);
  const requestId = req.body.requestId;
  const postId = req.body.postId;
  const senderEmail = req.body.senderEmail;
  const receiverEmail = req.body.receiverEmail;
  const status = req.body.status;
  const id = 1
  let sql = `INSERT into notification (requestedtrips_id, postedtrips_id, senderEmail, receiverEmail, status)
  values (?, ?, ?, ?, ?)`;
  let data = [requestId, postId, senderEmail, receiverEmail, status];
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

app.post("/api/unsedNotif", (req, res) => {
  let connection = mysql.createConnection(config);
  const requestId = req.body.requestId;
  const postId = req.body.postId;
  const status = req.body.status;
  const id = 1
  let sql = `DELETE FROM notification WHERE (requestedtrips_id = (?) and postedtrips_id = (?) and status = (?));`;
  let data = [requestId, postId, status];
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

app.post("/api/getNotifs", (req, res) => {
  let connection = mysql.createConnection(config);
  const userEmail = req.body.users_email;

  let sql = `select apazokit.notification.idnotification, apazokit.notification .requestedtrips_id, 
  apazokit.notification.postedtrips_id, apazokit.notification.senderEmail,
  apazokit.notification.receiverEmail, apazokit.notification.status, 
  apazokit.posted_trips.pendingPosts, apazokit.requested_trips.pending, 
  apazokit.posted_trips.departure_date 
  from apazokit.notification inner join apazokit.posted_trips
  on apazokit.notification.postedtrips_id =  apazokit.posted_trips.postedtrips_id inner join 
  apazokit.requested_trips on apazokit.notification.requestedtrips_id =  apazokit.requested_trips.requestedtrips_id
  Where apazokit.notification.receiverEmail = (?)`;
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

app.post("/api/getReqHistory", (req, res) => {
  let connection = mysql.createConnection(config);
  const userEmail = req.body.users_email;

  let sql = `SELECT * FROM apazokit.trip_history inner join apazokit.posted_trips on
  apazokit.trip_history.posted_trips_id = apazokit.posted_trips.postedtrips_id
  inner join apazokit.users on  apazokit.posted_trips.users_email = apazokit.users.email
  where requested_trips_users_email = (?)`;
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


app.post("/api/getPostHistory", (req, res) => {
  let connection = mysql.createConnection(config);
  const userEmail = req.body.users_email;

  let sql = `SELECT * FROM apazokit.trip_history inner join apazokit.requested_trips on
  apazokit.trip_history.requested_trips_id = apazokit.requested_trips.requestedtrips_id
  inner join apazokit.users on  apazokit.requested_trips.users_email = apazokit.users.email
  where posted_trips_users_email = (?)`;
  
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
  let sql = `SELECT * FROM users WHERE email = (?);`;
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

//! Use of Multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/imageUploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  let connection = mysql.createConnection(config);
  const userEmail = req.body.users_email;
  if (!req.file) {
    console.log("No file upload");
  } else {
    console.log(req.file.filename);
    var imgsrc = "client/imageUploads/" + req.file.filename;
    var insertData = "UPDATE users SET image = ? WHERE email = ?;";
    connection.query(insertData, [imgsrc, userEmail], (err, result) => {
      if (err) throw err;
      console.log("file uploaded");
    });
  }
});

var upload = multer({
  storage: storage,
});

app.post("/api/updateUserProfile", (req, res) => {
  let connection = mysql.createConnection(config);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const birthday = req.body.birthday;
  const schoolYear = req.body.year;
  const program = req.body.program;
  const music = req.body.music;
  const userEmail = req.body.email;

  let sql = `UPDATE users SET 
  first_name = ?, 
  last_name = ?, 
  password = ?,
  phone_number = ?, 
  school_year = ?, 
  program = ?, 
  birthday = ?, 
  music_prefrence = ?
  WHERE email = ?;`;
  let data = [
    firstName,
    lastName,
    password,
    phoneNumber,
    schoolYear,
    program,
    birthday,
    music,
    userEmail,
  ];
  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    let obj = JSON.parse(string);
    res.send({ express: obj });
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

app.delete("/api/deleteHistoryPost", (req, res) => {
  let connection = mysql.createConnection(config);
  const postedTrip_id = req.body.postedTrip_id;
  let sql = `DELETE FROM trip_history WHERE (posted_trips_id = ?);`;
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

app.delete("/api/deleteHistoryRequest", (req, res) => {
  let connection = mysql.createConnection(config);
  const postedTrip_id = req.body.postedTrip_id;
  let sql = `DELETE FROM trip_history WHERE (requested_trips_id = ?);`;
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
  const actual_date = req.body.departureDate.split("/").reverse().join("-");
  let sql = `INSERT INTO posted_trips (pickup_location, dropoff_location, departure_date, departure_time, arrival_time, payment_method, amount, car_brand, car_color, users_email, actual_date)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  let data = [
    pickupLocation,
    dropoffLocation,
    deaprtureDate,
    departureTime,
    arrivalTime,
    payment,
    amount,
    carModel,
    color,
    users_email,
    actual_date,
  ];
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

app.post("/api/getMatchesFromRequests", (req, res) => {
  let connection = mysql.createConnection(config);
  const userEmail = req.body.users_email;
  let sql = `select * from apazokit.posted_trips inner join apazokit.users on apazokit.users.email = apazokit.posted_trips.users_email inner join apazokit.requested_trips on apazokit.requested_trips.users_email = (?) && 
  apazokit.posted_trips.pickup_location = apazokit.requested_trips.pickup_location && apazokit.posted_trips.dropoff_location = apazokit.requested_trips.dropoff_location &&  apazokit.posted_trips.departure_date = apazokit.requested_trips.departure_date WHERE exists 
  (Select t2.* from apazokit.requested_trips t2 WHERE users_email = (?) and apazokit.posted_trips.pickup_location Like t2.pickup_location and 
  apazokit.posted_trips.dropoff_location Like t2.dropoff_location and apazokit.posted_trips.departure_date Like t2.departure_date and apazokit.posted_trips.users_email != (?))
  `;
  let data = [userEmail, userEmail, userEmail];
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

app.post("/api/getMatchesFromPosts", (req, res) => {
  let connection = mysql.createConnection(config);
  const userEmail = req.body.users_email;
  let sql = `select * from apazokit.requested_trips inner join apazokit.users on apazokit.users.email = apazokit.requested_trips.users_email inner join apazokit.posted_trips on apazokit.posted_trips.users_email = (?) && 
  apazokit.posted_trips.pickup_location = apazokit.requested_trips.pickup_location && apazokit.posted_trips.dropoff_location = apazokit.requested_trips.dropoff_location &&  apazokit.posted_trips.departure_date = apazokit.requested_trips.departure_date WHERE exists 
  (Select t2.* from apazokit.posted_trips t2 WHERE users_email = (?) and apazokit.requested_trips.pickup_location Like t2.pickup_location and 
  apazokit.requested_trips.dropoff_location Like t2.dropoff_location and apazokit.requested_trips.departure_date Like t2.departure_date and apazokit.requested_trips.users_email != (?))
  `;
  let data = [userEmail, userEmail, userEmail];
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

app.post("/api/acceptNotification", (req, res) => {
  let connection = mysql.createConnection(config);
  const posted_trips_id = req.body.posted_trips_id;
  const posted_trips_users_email = req.body.posted_trips_users_email;
  const requested_trips_id = req.body.requested_trips_id;
  const requested_trips_users_email = req.body.requested_trips_users_email;
  let sql = `INSERT INTO trip_history (posted_trips_id, posted_trips_users_email, requested_trips_id, requested_trips_users_email) values 
  (?, ?, ?, ?);`;
  let data = [
    posted_trips_id,
    posted_trips_users_email,
    requested_trips_id,
    requested_trips_users_email,
  ];
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

