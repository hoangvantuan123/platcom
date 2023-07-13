const pool = require("../config/dbConfig");

// Tạo Bảng CSDL group
pool.query(
  `CREATE TABLE IF NOT EXISTS groups (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    members JSON
  )`,
  (error, results) => {
    if (error) {
      console.error("Error creating table", error);
    } else {
      console.log('Table "groups" created successfully');
    }
  }
);

// Tao bang CSDL tin nhắn Group
pool.query(
  `CREATE TABLE IF NOT EXISTS group_messages (
        id UUID PRIMARY KEY,
        content TEXT NOT NULL,
        sender_id TEXT NOT NULL,
        receiver_group_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
  (error, results) => {
    if (error) {
      console.error("Error creating table", error);
    } else {
      console.log('Table "Group Messages" created successfully');
    }
  }
);

// Lấy danh sách nhóm chat trong cơ sở dữ liệu

const getGroups = (req, res) => {
  pool.query("SELECT * FROM groups", (error, results) => {
    if (error) {
      console.error("Error retrieving groups", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving groups" });
    } else {
      // Lấy toàn bộ dự liệu
      const groups = results.rows;
      // Lấy dữ liệu ở cột content
      //const groups = results.rows.map((row) => row.content);
      res.json(groups);
    }
  });
};

const getGroupMessages = (req, res) => {
  pool.query("SELECT * FROM group_messages", (error, results) => {
    if (error) {
      console.error("Error retrieving group_messages", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving group_messages" });
    } else {
      // Lấy toàn bộ dự liệu
      const group_messages = results.rows;
      // Lấy dữ liệu ở cột content
      //const group_messages = results.rows.map((row) => row.content);
      res.json(group_messages);
    }
  });
};

module.exports = { getGroups , getGroupMessages };
