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
      // 每100克飼料的熱量 (kcal/100g)
    },
    protein: {
      type: Number,
      required: true,
      // 每100克飼料中的蛋白質百分比 (g/100g)
    },
    fat: {
      type: Number,
      required: true,
      // 每100克飼料中的脂肪百分比 (g/100g)
    },
    carbs: {
      type: Number,
      required: true,
      // 每100克飼料中的碳水化合物百分比 (g/100g)
    },
    BMR: {
      type: Number,
      required: true,
      // 基礎代謝率（BMR）(kcal/day)
    },
    adjustedBMR: {
      type: Number,
      required: true,
      // 調整後的基礎代謝率（kcal/day）
    },
    dailyCalorieNeed: {
      type: Number,
      required: true,
      // 每日所需熱量（kcal/day）
    },
    dailyProteinNeed: {
      type: Number,
      required: true,
      // 每日所需蛋白質（g/day）
    },
    dailyFatNeed: {
      type: Number,
      required: true,
      // 每日所需脂肪（g/day）
    },
    dailyCarbsNeed: {
      type: Number,
      required: true,
      // 每日所需碳水化合物（g/day）
    },
    dailyFeedAmount: {
      type: Number,
      required: true,
      // 每日飼料量（g/day）
    },
    nutrientsProvided: {
      protein: {
        type: Number,
        required: true,
        // 每日飼料提供的蛋白質（g/day）
      },
      fat: {
        type: Number,
        required: true,
        // 每日飼料提供的脂肪（g/day）
      },
      carbs: {
        type: Number,
        required: true,
        // 每日飼料提供的碳水化合物（g/day）
      },
    },
    caloriesProvided: {
      total: {
        type: Number,
        required: true,
        // 每日飼料提供的總熱量（kcal/day）
      },
      protein: {
        type: Number,
        required: true,
        // 蛋白質提供的熱量（kcal/day）
      },
      fat: {
        type: Number,
        required: true,
        // 脂肪提供的熱量（kcal/day）
      },
      carbs: {
        type: Number,
        required: true,
        // 碳水化合物提供的熱量（kcal/day）
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
