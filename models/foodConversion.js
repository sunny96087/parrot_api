const mongoose = require("mongoose");

// 定義食物計算的 Schema
const foodConversionSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member", // 參照 Member 模型
      // 會員 ID，若為訪客則為空
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FreshFood",
      // 參照 FreshFood 模型
      required: [true, "請選擇食物"],
      // 食物
    },
    foodName: String, // 食物名稱
    foodNote: String, // 食物備註
    requiredCalories: Number, // 需要補充的熱量 (kcal/day)
    requiredFoodIntake: Number, // 需要攝取的食物量 (g/day)
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
    foodProvidedCalories: Number, // 實際提供的熱量 (kcal/day)
    caloriesDifference: Number, // 熱量差異 (kcal/day)
  },
  { timestamps: true } // 自動生成 createdAt 和 updatedAt 欄位
);

// 創建 Model
const FoodConversion = mongoose.model("FoodConversion", foodConversionSchema);

module.exports = FoodConversion;
