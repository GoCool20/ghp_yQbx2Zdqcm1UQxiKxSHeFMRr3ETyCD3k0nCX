import mysql from 'mysql2/promise';

/**
 * Creates a MySQL connection pool using your specific RDS credentials.
 * The configuration is tuned for AWS RDS with appropriate timeouts and SSL settings.
 */
export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'bhavcopy-mysql-db.c70kaw8mu0rx.eu-north-1.rds.amazonaws.com',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  database: process.env.MYSQL_DATABASE || 'csvdb',
  user: process.env.MYSQL_USER || 'admin',
  password: process.env.MYSQL_PASSWORD || '7841904266',
  ssl: {
    // Required for AWS RDS connections from external environments
    rejectUnauthorized: false,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000, // 20 seconds timeout for initial connection
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});
