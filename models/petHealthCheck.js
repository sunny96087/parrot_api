const mongoose = require("mongoose");
const { Member } = require("./member");

// 定義 PetHealthCheck Schema
const petHealthCheckSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      // 會員 ID，若為訪客則為空
    },
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
      // 寵物 ID
    },
    checkDate: {
      type: Date,
      required: true,
      // 檢查日期
    },
    weight: {
      type: Number,
      required: true,
      // 體重（克）
    },
    healthStatus: {
      type: String,
      required: true,
      enum: ["excellent", "good", "fair", "poor"],
      // 健康狀態（優、良、中、差）
    },
    notes: {
      type: String,
      // 備註
    },
  },
  { timestamps: true }
); // 自動生成 createdAt 和 updatedAt 欄位

// 創建 Model
const PetHealthCheck = mongoose.model("PetHealthCheck", petHealthCheckSchema);

module.exports = PetHealthCheck;
