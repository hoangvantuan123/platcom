
const { Pool } = require('pg');

const pool = new Pool({
  user: 'tuanhoang',
  host: 'localhost',
  database: 'box',
  password: 'your_password',
  port: 5432, // Thay đổi cổng nếu cần thiết
});

module.exports = pool;
