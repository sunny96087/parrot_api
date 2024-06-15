const mongoose = require("mongoose");

// 定義食物計算的 Schema
const foodRecommendSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member", // 參照 Member 模型
      // 會員 ID，若為訪客則為空
    },
    dailyNeeds: {
      // 每日需求
      calories: Number, // 每日所需熱量 (kcal/day)
      protein: Number, // 每日所需蛋白質 (g/day)
      fat: Number, // 每日所需脂肪 (g/day)
      carbs: Number, // 每日所需碳水化合物 (g/day)
    },
    foods: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FreshFood",
          // 參照 FreshFood 模型
        },
        name: String, // 食物名稱
        note: String, // 食物備註
        maxIntake: Number, // 最大攝取量 (g/day)
        intakeAmount: Number, // 實際攝取量 (g/day)
        nutrientsProvided: {
          // 實際攝取的營養素
          protein: Number, // 實際攝取的蛋白質量 (g/day)
          fat: Number, // 實際攝取的脂肪量 (g/day)
          carbs: Number, // 實際攝取的碳水化合物量 (g/day)
          calories: Number, // 實際攝取的熱量 (kcal/day)
        },
      },
    ],
    totalNutrition: {
      // 總營養
      protein: Number, // 總蛋白質 (g/day)
      fat: Number, // 總脂肪 (g/day)
      carbs: Number, // 總碳水化合物 (g/day)
      calories: Number, // 總熱量 (kcal/day)
    },
    percentage: {
      // 百分比
      protein: Number, // 蛋白質百分比
      fat: Number, // 脂肪百分比
      carbs: Number, // 碳水化合物百分比
    },
  },
  { timestamps: true } // 自動生成 createdAt 和 updatedAt 欄位
);

// 創建 Model
const FoodRecommend = mongoose.model("FoodRecommend", foodRecommendSchema);

module.exports = FoodRecommend;
