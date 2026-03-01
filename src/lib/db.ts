import mysql from 'mysql2/promise';

/**
 * Creates a MySQL connection pool using server-side environment variables.
 * This file is executed only on the server, ensuring credentials are never exposed.
 */
export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  ssl: {
    // Required SSL certificate validation for RDS. 
    // rejectUnauthorized: true uses the system CA bundle by default.
    rejectUnauthorized: true,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
