const express = require("express");
const mysql = require("mysql");
// Create DB

app.get("/createdb", (req, res) => {
let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err) => {
  if (err) {
  throw err;
  }
  res.send("Database created");
  });
  });

  // Create table

app.get("/createdonor", (req, res) => {
let sql =
  "CREATE TABLE donor(id int, name VARCHAR(255), bloodGrroup VARCHAR(255),District varchar(255) PRIMARY KEY(id))";
  db.query(sql, (err) => {
  if (err) {
  throw err;
  }
  res.send(" Done");
  });
  
  });

  // Insert 

app.get("/donor1", (req, res) => {
let post = { name: "Jake Smith", bloodGroup: "AB+",District:"Rajshahi" };
  let sql = "INSERT INTO donor SET ?";
  let query = db.query(sql, post, (err) => {
  if (err) {
  throw err;
  }
  res.send("added");
  });
  });

