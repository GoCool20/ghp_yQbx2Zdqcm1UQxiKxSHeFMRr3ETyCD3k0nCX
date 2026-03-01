import mysql from 'mysql2/promise';

/**
 * Creates a MySQL connection pool using server-side environment variables.
 * Note: For AWS RDS, we use SSL with rejectUnauthorized: false to allow 
 * connection without managing custom CA bundles in the server environment.
 */
export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'bhavcopy-mysql-db.c70kaw8mu0rx.eu-north-1.rds.amazonaws.com',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  database: process.env.MYSQL_DATABASE || 'csvdb',
  user: process.env.MYSQL_USER || 'admin',
  password: process.env.MYSQL_PASSWORD || '7841904266',
  ssl: {
    // Setting to false allows the connection to use SSL encryption
    // without requiring the specific AWS CA certificate bundle locally.
    rejectUnauthorized: false,
  },
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 10000, // 10 second timeout
});
