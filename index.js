const express = require('express');
var mysql = require('mysql');
var http = require ('http');
var dt = require('./mydatetimemodule');
var  dbase = require('./db_connection');

const app =  express();
const port =  3000;

app.get('/',  (req,  res) =>  {
//	dbase.connectDB();

	res.send("The date and time is currently: "+ dt.myDateTime());
});

app.get('/db',  (req,  res) =>  {
	dbase.connectDB();
	dbase.createDatabase();
	dbase.createTable();
	console.log('The database is setup');
	res.send("The app is initialised!");
});


app.get('/write',  (req,  res) =>  {
//	dbase.connectDB();
	dbase.writeToDB();
	res.send("Wrote to DB on: "+ dt.myDateTime());
});

app.get('/read',  (req,  res) =>  {
//	dbase.connectDB();
	dbase.readFromDB();
	res.send("Read from DB on: "+ dt.myDateTime());
});

app.listen(port, () => console.log(`app is listening on port ${port}!`));
