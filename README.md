

# CSV Uploader

This is a simple Node.js package that facilitates the upload of CSV files to a Microsoft SQL Server (MS SQL) database. The package provides a user-friendly HTML interface for selecting and uploading CSV files through a web browser.


# Documentation

## Getting Started
Follow the steps below to set up the CSV Uploader in your project.

## Prerequisites
Before you begin, ensure that you have the following:

## Node.js installed on your machine.
An MS SQL Server instance with the necessary database and table set up.

## Installation
Install the package using npm:

```bash
npm install @shamigondal/csv-uploader

```
Also install all these packages

```bash
npm i fs path multer bodyparser express
```
## index.html:

Create the required HTML files:

```html 
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSV Uploader</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>

<body class="bg-light">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">CSV Uploader</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form action="/post-Csv-file" method="post" enctype="multipart/form-data" class="card p-4">
          <h3 class="text-center mb-4">Upload CSV File to MS SQL</h3>
          <div class="mb-3">
            <label for="file" class="form-label">Choose a CSV file:</label>
            <div class="input-group">
              <input type="file" class="form-control" id="file" name="file" accept=".csv" required>
              <button type="submit" class="btn btn-primary">Upload</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
    integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
    integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
    crossorigin="anonymous"></script>
</body>

</html>
```

## success.html

```html 
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>File Upload Success</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>

<body class="bg-light">
  <div class="container mt-5">
    <div class="alert alert-success" role="alert">
      File uploaded successfully!
    </div>
    <a href="./index.html" class="btn btn-primary">Back to Upload</a>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
    integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
    integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
    crossorigin="anonymous"></script>
</body>

</html>
```

## db.js 

create db.js file to connect with the ms sql Server.
Remember to to first authenticaiton at ms sql server, then you will get user and password. 

```node.js

const sql = require('mssql');

const config = {
  server: 'localhost',
  user: '',        // Your MS SQL Server username
  password: '',    // Your MS SQL Server password
  database: 'testing',  // Your database name
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
    trustedConnection: true,
    connectionTimeout: 30000,
  },
};

const pool = new sql.ConnectionPool(config);

const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database!');
    return pool;
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
};

module.exports = connectToDatabase;
```

## app.js

creat app .js file first install the package

```bash

npm install @shamigondal/csv-uploader
```
Now write the following connectToDatabase

```node.js

const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const multer = require('multer')
const {uploadCsv} = require('csv-uploader')
const connectToDatabase = require('./db');



const app = express();

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

const PORT = 4000 || 3000;
const localhost = `http://localhost:`

const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const uploads = multer({
    storage: storage
})


app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html')
})

app.post('/post-Csv-file', uploads.single('file'), async (req, res) => {
  try {
      console.log(req.file.path);
      const tableName = 'users'; // Replace with your table name
      const columnNames = ['userId', 'userName', 'userEmail', 'userPass']; // Replace with your column names
      await uploadCsv(path.join(__dirname, 'uploads', req.file.filename), tableName, columnNames, connectToDatabase);
      res.sendFile(__dirname + '/success.html');
  } catch (error) {
      console.error('Error processing CSV file:', error);
      res.status(500).send('Internal Server Error');
  }
});
  

app.listen(PORT, (req, res) => {

    console.log("CSV Faker listening at PORT " + localhost + PORT)
})

```

## Authors

- [@ShamiGondal](https://github.com/ShamiGondal)


## License

[MIT](https://choosealicense.com/licenses/mit/)

