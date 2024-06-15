const mongoose = require("mongoose");
const { Member } = require("./member");

// 定義 Schema
const feedCalculationSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      // 會員 ID，若為訪客則為空
    },
    weight: {
      type: Number,
      required: true,
      // 體重（克）
    },
    activity: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
      // 活動水平（低、中、高）
    },
    calories: {
      type: Number,
      required: true,
      // 每100克飼料的熱量（卡路里）
    },
    protein: {
      type: Number,
      required: true,
      // 每100克飼料中的蛋白質百分比
    },
    fat: {
      type: Number,
      required: true,
      // 每100克飼料中的脂肪百分比
    },
    carbs: {
      type: Number,
      required: true,
      // 每100克飼料中的碳水化合物百分比
    },
    BMR: {
      type: String,
      required: true,
      // 基礎代謝率（BMR，卡路里/天）
    },
    adjustedBMR: {
      type: String,
      required: true,
      // 調整後的基礎代謝率（卡路里/天）
    },
    dailyCalorieNeed: {
      type: String,
      required: true,
      // 每日所需熱量（卡路里/天）
    },
    dailyFeedAmount: {
      type: String,
      required: true,
      // 每日飼料量（克/天）
    },
    nutrientsProvided: {
      protein: {
        type: String,
        required: true,
        // 每日飼料提供的蛋白質（克/天）
      },
      fat: {
        type: String,
        required: true,
        // 每日飼料提供的脂肪（克/天）
      },
      carbs: {
        type: String,
        required: true,
        // 每日飼料提供的碳水化合物（克/天）
      },
    },
    caloriesProvided: {
      total: {
        type: String,
        required: true,
        // 每日飼料提供的總熱量（卡路里/天）
      },
      protein: {
        type: String,
        required: true,
        // 蛋白質提供的熱量（卡路里/天）
      },
      fat: {
        type: String,
        required: true,
        // 脂肪提供的熱量（卡路里/天）
      },
      carbs: {
        type: String,
        required: true,
        // 碳水化合物提供的熱量（卡路里/天）
      },
    },
  },
  { timestamps: true }
); // 自動生成 createdAt 和 updatedAt 欄位

// 創建 Model
const FeedCalculation = mongoose.model(
  "FeedCalculation",
  feedCalculationSchema
);

module.exports = FeedCalculation;
