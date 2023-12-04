const fs = require('fs');
const csv = require('fast-csv');
const mssql = require('mssql');

const uploadCsv = async (filePath, tableName, columnNames, connectToDatabase) => {
  try {
    const pool = connectToDatabase instanceof mssql.ConnectionPool ? connectToDatabase : await connectToDatabase();
    const connection = await pool.connect();
    const transaction = new mssql.Transaction(connection);

    await transaction.begin();

    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let fileStream = csv
      .parse()
      .on('data', function (data) {
        csvData.push(data);
      })
      .on('end', async function () {
        csvData.shift();
        try {
          const request = new mssql.Request(transaction);
          let query = `INSERT INTO ${tableName} (${columnNames.join(', ')}) VALUES `;
          const values = csvData.map(row => `(${row.map(value => `'${value}'`).join(', ')})`);
          query += values.join(', ');

          await request.query(query);
          await transaction.commit();

          console.log('Inserted rows:', csvData.length);
        } catch (error) {
          console.error('Error executing SQL query:', error.message);
          await transaction.rollback();
          throw error;
        } finally {
          await connection.close();
        }
      });

    stream.pipe(fileStream);
  } catch (error) {
    console.error('Error processing CSV file:', error.message);
    throw error;
  }
};

module.exports = { uploadCsv };
