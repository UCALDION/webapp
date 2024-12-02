const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});
module.exports = db;


// Get all users from the database
exports.getAllUsers = (callback) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// Add a new user to the database
exports.addUser  = (name, description, callback) => {
  const sql = 'INSERT INTO users (name, description) VALUES (?, ?)';
  db.run(sql, [name, description], function(err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { id: this.lastID, name, description }); // Return the new user
    }
  });
};

// Close the database connection when the application is terminated
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database ' + err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});