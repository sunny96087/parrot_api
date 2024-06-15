const mongoose = require("mongoose");

// 定義食物計算的 Schema
const feedConversionSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member", // 參照 Member 模型
      // 會員 ID，若為訪客則為空
    },
    requiredCalories: Number, // 需要補充的熱量 (kcal/day)
    calories: Number, // 飼料熱量 (kcal/100g)
    protein: Number, // 飼料蛋白質 (g/100g)
    fat: Number, // 飼料脂肪 (g/100g)
    carbs: Number, // 飼料碳水化合物 (g/100g)
    requiredFeedIntake: Number, // 最接近需求的飼料攝取量 (g/day)
    nutrientsProvided: {
      protein: Number, // 實際攝取的蛋白質量 (g/day)
      fat: Number, // 實際攝取的脂肪量 (g/day)
      carbs: Number, // 實際攝取的碳水化合物量 (g/day)
    },
    nutrientsCalories: {
      protein: Number, // 蛋白質提供的熱量 (kcal/day)
      fat: Number, // 脂肪提供的熱量 (kcal/day)
      carbs: Number, // 碳水化合物提供的熱量 (kcal/day)
    },
    nutrientsPercentage: {
      protein: Number, // 蛋白質佔總熱量的百分比 (%)
      fat: Number, // 脂肪佔總熱量的百分比 (%)
      carbs: Number, // 碳水化合物佔總熱量的百分比 (%)
    },
    feedProvidedCalories: Number, // 實際提供的熱量 (kcal/day)
    caloriesDifference: Number, // 熱量差異 (kcal/day)
  },
  { timestamps: true } // 自動生成 createdAt 和 updatedAt 欄位
);

// 創建 Model
const FeedConversion = mongoose.model("FeedConversion", feedConversionSchema);

module.exports = FeedConversion;
