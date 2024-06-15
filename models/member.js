const mongoose = require("mongoose");

// 定義會員 Schema
const memberSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    // 其他會員相關欄位
  },
  {
    timestamps: true,
  }
);

// 創建 Model
const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
