import database from "sqlite3";
import logger from "./logger.mjs";

const sqlite3 = database.verbose();
const DBSOURCE = "db.sqlite";

let db;

function initialize() {
    db = new sqlite3.Database(DBSOURCE, err => {
    if (err) {
        // Cannot open database
        logger.error(err.message);
        throw err;
    } else {
        logger.info("Connected to the SQLite database");
        db.run(
        `CREATE TABLE todo (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text, 
                description text,
                category text,
                duedate integer, 
                completed integer
                )`,
        err => {
            if (err) {
            // Table already created
            logger.info("Table already exists");  
            } else {
            // Table just created, creating some rows
            logger.info("New table created");
            var insert = "INSERT INTO todo (name, description, category, duedate, completed) VALUES (?,?,?,?,0)";
            db.run(insert, ["vacuum house", "vacuum the entire house", "house chores", 0]);
            db.run(insert, ["pay credit card bill", "pay bill for mastercard", "financial", 0]);
            }
        }
        );
    }
    });
}

function close() {
    db.close(err => {
        if (err) {
            logger.error(err.message);
        } else {
            logger.info("Close the database connection.");
        }
    });
}

function getAllTodos() {
    const sql = 'SELECT * FROM todo ORDER BY id';
    
    return new Promise(function(resolve, reject) {
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

function getTodoById(id) {
  const sql = 'SELECT * FROM todo WHERE id=?';

  return new Promise(function(resolve, reject) {
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
}

export  { initialize, close, getAllTodos, getTodoById };





