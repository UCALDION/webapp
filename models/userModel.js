const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Function to get all users from the database
exports.getAllUsers = (callback) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

// Function to add a new user to the database
exports.addUser = (name, email, callback) => {
  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  stmt.run([name, email], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID, name, email });
  });
  stmt.finalize();
};
