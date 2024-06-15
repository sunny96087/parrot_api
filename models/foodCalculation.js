const mongoose = require("mongoose");
const { Member } = require("./member");

// 定義食物計算的 Schema
const foodCalculationSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member", // 參照 Member 模型
      // 會員 ID，若為訪客則為空
    },
    weight: {
      type: Number,
      required: [true, "請輸入體重"],
      // 體重
    },
    activity: {
      type: String,
      required: [true, "請輸入活動水平"],
      // 活動水平
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FreshFood",
      // 參照 FreshFood 模型
      required: [true, "請選擇食物"],
      // 食物
    },
    BMR: {
      type: String,
      // 基礎代謝率
    },
    adjustedBMR: {
      type: String,
      // 調整後的基礎代謝率
    },
    dailyCalories: {
      type: String,
      // 每日所需熱量
    },
    maxIntake: {
      type: String,
      // 最大攝取量
    },
    foodIntake: {
      type: String,
      // 實際攝取量
    },
    nutrientsProvided: {
      protein: {
        type: String,
        // 每日食物中的蛋白質克數
      },
      fat: {
        type: String,
        // 每日食物中的脂肪克數
      },
      carbs: {
        type: String,
        // 每日食物中的碳水化合物克數
      },
    },
    foodProvidedCalories: {
      type: String,
      // 食物提供的總熱量
    },
    caloriesDifference: {
      type: String,
      // 熱量差異
    },
    detailedNutrientsCalories: {
      protein: {
        type: String,
        // 蛋白質提供的熱量
      },
      fat: {
        type: String,
        // 脂肪提供的熱量
      },
      carbs: {
        type: String,
        // 碳水化合物提供的熱量
      },
    },
  },
  { timestamps: true } // 自動生成 createdAt 和 updatedAt 欄位
);

// 創建 Model
const FoodCalculation = mongoose.model(
  "FoodCalculation",
  foodCalculationSchema
);

module.exports = FoodCalculation;
