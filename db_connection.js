var mysql = require('mysql');

var db_host = process.env.MSTEST_DB_HOST;

var connection = mysql.createConnection({
	host: db_host,
	user: "sqluser",
	password: "1234",
	database: "awsnodedb"
});

exports.getHost=function(){
	return db_host;
}

exports.connectDB=function(){
	connection.connect(function(err) {
		if(err) throw err;
		console.log("Connected");
	});
}

exports.createDatabase = function(){
	connection.query("CREATE DATABASE IF NOT EXISTS awsnodedb", function(err, result){
		if(err) throw err;
		console.log("Created Database");
	});
}

exports.createTable = function(){
	connection.query("CREATE TABLE IF NOT EXISTS somedata(col1 NVARCHAR(255),  col2 NVARCHAR(255))", function(err, result){
		if(err) throw err;
		console.log("Created Table");
	});
}

exports.writeToDB = function(){
	var date = new Date();
	var curDate = date.getDate();
	curDate += " " + date.getMonth();
	var curTime = date.getHours() + ":"+ date.getMinutes() +  ":" + date.getSeconds();
	connection.query("INSERT INTO somedata(col1,col2) VALUES ('" + curDate+ "','" +  curTime+ "')", function(err, result){
		if(err) throw err;
		console.log("Wrote Data");
	});
}

exports.readFromDB = function(){
	connection.query("SELECT * FROM somedata ORDER BY col1 DESC LIMIT 5",function(err, result, fields){
		if(err) throw err;
		console.log("Read Data");
		console.log(result);
	});
}
