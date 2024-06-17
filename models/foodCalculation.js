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
      type: Number,
      // 基礎代謝率 (BMR) (kcal/day)
    },
    adjustedBMR: {
      type: Number,
      // 調整後的基礎代謝率 (kcal/day)
    },
    dailyCalories: {
      type: Number,
      // 每日所需熱量 (kcal/day)
    },
    dailyProteinNeed: {
      type: Number,
      // 每日所需蛋白質 (g/day)
    },
    dailyFatNeed: {
      type: Number,
      // 每日所需脂肪 (g/day)
    },
    dailyCarbsNeed: {
      type: Number,
      // 每日所需碳水化合物 (g/day)
    },
    maxIntake: {
      type: Number,
      // 最大攝取量 (g/day)
    },
    foodIntake: {
      type: Number,
      // 實際攝取量 (g/day)
    },
    nutrientsProvided: {
      protein: {
        type: Number,
        // 每日食物中的蛋白質克數 (g/day)
      },
      fat: {
        type: Number,
        // 每日食物中的脂肪克數 (g/day)
      },
      carbs: {
        type: Number,
        // 每日食物中的碳水化合物克數 (g/day)
      },
    },
    foodProvidedCalories: {
      type: Number,
      // 食物提供的總熱量 (kcal/day)
    },
    caloriesDifference: {
      type: Number,
      // 熱量差異 (kcal/day)
    },
    detailedNutrientsCalories: {
      protein: {
        type: Number,
        // 蛋白質提供的熱量 (kcal/day)
      },
      fat: {
        type: Number,
        // 脂肪提供的熱量 (kcal/day)
      },
      carbs: {
        type: Number,
        // 碳水化合物提供的熱量 (kcal/day)
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
