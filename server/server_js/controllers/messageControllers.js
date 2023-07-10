const pool = require("../config/dbConfig");

// Tao bang CSDL
pool.query(
  `CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        sender_id TEXT NOT NULL,
        receiver_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
  (error, results) => {
    if (error) {
      console.error("Error creating table", error);
    } else {
      console.log('Table "messages" created successfully');
    }
  }
);

// Lấy danh sách tin nhắn từ cơ sở dữ liệu

const getMessages = (req, res) => {
  pool.query("SELECT * FROM messages", (error, results) => {
    if (error) {
      console.error("Error retrieving messages", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving messages" });
    } else {
      const messages = results.rows.map((row) => row.content);
      res.json(messages);
    }
  });
};

module.exports = { getMessages };
