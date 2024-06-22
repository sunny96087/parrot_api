const appError = require("../utils/appError");
const handleSuccess = require("../utils/handleSuccess");
const FeedCalculation = require("../models/feedCalculation");
const FoodCalculation = require("../models/foodCalculation");
const FoodConversion = require("../models/foodConversion");
const FeedConversion = require("../models/feedConversion");
const FoodRecommend = require("../models/foodRecommend");

const FreshFood = require("../models/freshFood");

const mongoose = require("mongoose");

const foodController = {
  // * 每日飼料計算
  calculatefeed: async (req, res, next) => {
    // 取得參數
    const { memberId, weight, activity, calories, protein, fat, carbs } =
      req.body;

    // 驗證必填欄位
    if (!weight || !activity || !calories || !protein || !fat || !carbs) {
      return next(
        appError(400, "weight, activity, calories, fat, carbs 為必填")
      );
    }

    // 使用新的 BMR 計算公式
    const K = 175; // 鸚鵡的 K 值
    const BMR = K * Math.pow(weight / 1000, 0.75); // 體重轉換為公斤並計算基礎代謝率

    // 根據活動水平調整BMR
    let activityLevel = 1;
    switch (activity) {
      case "low":
        activityLevel = 1.2;
        break;
      case "medium":
        activityLevel = 1.4;
        break;
      case "high":
        activityLevel = 1.6;
        break;
    }
    const adjustedBMR = BMR * activityLevel; // 調整後的BMR

    // 營養素需求計算
    const proteinNeed = adjustedBMR * 0.2; // 蛋白質需求占總熱量的20%
    const fatNeed = adjustedBMR * 0.2; // 脂肪需求占總熱量的20%
    const carbsNeed = adjustedBMR * 0.6; // 碳水化合物需求占總熱量的60%

    // 將營養需求從卡路里轉換為克數
    const dailyProteinNeed = (proteinNeed / 4).toFixed(2); // 每克蛋白質提供4卡路里
    const dailyFatNeed = (fatNeed / 9).toFixed(2); // 每克脂肪提供9卡路里
    const dailyCarbsNeed = (carbsNeed / 4).toFixed(2); // 每克碳水化合物提供4卡路里

    // 計算每日所需飼料量
    let dailyFeedAmount = (adjustedBMR / calories) * 100; // 每日飼料量以100克為單位

    // 計算飼料提供的營養成分
    let totalProtein = dailyFeedAmount * (protein / 100); // 飼料提供的蛋白質克數
    let totalFat = dailyFeedAmount * (fat / 100); // 飼料提供的脂肪克數
    let totalCarbs = dailyFeedAmount * (carbs / 100); // 飼料提供的碳水化合物克數

    // 計算每日飼料提供的總熱量
    let proteinCalories = totalProtein * 4; // 蛋白質提供的熱量
    let fatCalories = totalFat * 9; // 脂肪提供的熱量
    let carbsCalories = totalCarbs * 4; // 碳水化合物提供的熱量
    let totalCalories = proteinCalories + fatCalories + carbsCalories; // 總熱量

    // 如果總熱量低於每日熱量需求，則增加飼料量
    while (totalCalories < adjustedBMR) {
      dailyFeedAmount += 1; // 增加每日飼料量
      totalProtein = dailyFeedAmount * (protein / 100);
      totalFat = dailyFeedAmount * (fat / 100);
      totalCarbs = dailyFeedAmount * (carbs / 100);
      proteinCalories = totalProtein * 4;
      fatCalories = totalFat * 9;
      carbsCalories = totalCarbs * 4;
      totalCalories = proteinCalories + fatCalories + carbsCalories;
    }

    // 返回結果
    let data = {
      memberId: memberId || null,
      weight,
      activity,
      calories,
      protein,
      fat,
      carbs,
      BMR: BMR.toFixed(2), // 基礎代謝率 (BMR)
      adjustedBMR: adjustedBMR.toFixed(2), // 調整後的 BMR
      dailyCalorieNeed: adjustedBMR.toFixed(2), // 每日所需熱量
      dailyProteinNeed: dailyProteinNeed, // 每日所需蛋白質
      dailyFatNeed: dailyFatNeed, // 每日所需脂肪
      dailyCarbsNeed: dailyCarbsNeed, // 每日所需碳水化合物
      dailyFeedAmount: dailyFeedAmount.toFixed(2), // 每日飼料量
      nutrientsProvided: {
        protein: totalProtein.toFixed(2), // 每日飼料中的蛋白質克數
        fat: totalFat.toFixed(2), // 每日飼料中的脂肪克數
        carbs: totalCarbs.toFixed(2), // 每日飼料中的碳水化合物克數
      },
      caloriesProvided: {
        total: totalCalories.toFixed(2), // 每日飼料提供的總熱量
        protein: proteinCalories.toFixed(2), // 蛋白質提供的熱量
        fat: fatCalories.toFixed(2), // 脂肪提供的熱量
        carbs: carbsCalories.toFixed(2), // 碳水化合物提供的熱量
      },
    };

    // 將計算結果存入資料庫
    await FeedCalculation.create(data);

    handleSuccess(res, data, "計算飼料成功");
  },

  // * 每日鮮食計算
  calculatefood: async (req, res, next) => {
    // 取得參數
    const { memberId, weight, activity, foodId } = req.body;

    // 驗證必填欄位
    if (!weight || !activity || !foodId) {
      return next(appError(400, "weight, activity, foodId 為必填"));
    }

    // 驗證食物是否存在
    const freshFood = await FreshFood.findById(foodId);
    if (!freshFood) {
      return next(appError(400, "食物不存在"));
    }

    // 使用新的 BMR 計算公式
    const K = 175; // 鸚鵡的 K 值
    const BMR = K * Math.pow(weight / 1000, 0.75); // 體重轉換為公斤並計算基礎代謝率

    // 根據活動水平調整BMR
    let activityLevel = 1;
    switch (activity) {
      case "low":
        activityLevel = 1.2;
        break;
      case "medium":
        activityLevel = 1.4;
        break;
      case "high":
        activityLevel = 1.6;
        break;
    }
    const adjustedBMR = BMR * activityLevel; // 調整後的BMR

    // 計算每日所需熱量
    let dailyCalories = adjustedBMR;

    // 營養素需求計算
    const proteinNeed = dailyCalories * 0.2; // 蛋白質需求占總熱量的20%
    const fatNeed = dailyCalories * 0.2; // 脂肪需求占總熱量的20%
    const carbsNeed = dailyCalories * 0.6; // 碳水化合物需求占總熱量的60%

    // 營養素需求計算 (每日所需熱量的20%為蛋白質需求，20%為脂肪需求，60%為碳水化合物需求)
    const dailyProteinNeed = (dailyCalories * 0.2) / 4; // 蛋白質每克4卡
    const dailyFatNeed = (dailyCalories * 0.2) / 9; // 脂肪每克9卡
    const dailyCarbsNeed = (dailyCalories * 0.6) / 4; // 碳水化合物每克4卡

    // 計算該食物可攝取量
    const foodCalories = freshFood.calories;
    const foodProtein = freshFood.protein;
    const foodFat = freshFood.fat;
    const foodCarbs = freshFood.carbs;
    const foodMaxIntake = freshFood.maxIntake; // 正確使用 foodMaxIntake

    // 計算該食物每日可攝取量
    let maxCaloriesFromFood = foodCalories * (foodMaxIntake / 100); // 每日最大攝取量下的熱量
    let maxFoodIntake = Math.min(
      foodMaxIntake,
      (dailyCalories / foodCalories) * 100
    ); // 不超過每日所需熱量的最大攝取量(g)

    // 計算食物提供的營養素量
    let proteinIntake = (maxFoodIntake * (foodProtein / 100)).toFixed(2);
    let fatIntake = (maxFoodIntake * (foodFat / 100)).toFixed(2);
    let carbsIntake = (maxFoodIntake * (foodCarbs / 100)).toFixed(2);

    // 計算食物提供的總熱量
    let foodProvidedCalories = (
      proteinIntake * 4 +
      fatIntake * 9 +
      carbsIntake * 4
    ).toFixed(2);

    // 計算與每日所需熱量的差異
    let caloriesDifference = (dailyCalories - foodProvidedCalories).toFixed(2);

    // 計算食物提供的營養素熱量
    let proteinCalories = (proteinIntake * 4).toFixed(2); // 蛋白質提供的熱量
    let fatCalories = (fatIntake * 9).toFixed(2); // 脂肪提供的熱量
    let carbsCalories = (carbsIntake * 4).toFixed(2); // 碳水化合物提供的熱量

    // 返回結果
    let data = {
      memberId: memberId || null,
      weight,
      activity,
      food: freshFood,
      BMR: BMR.toFixed(2), // 基礎代謝率 (BMR)
      adjustedBMR: adjustedBMR.toFixed(2), // 調整後的 BMR
      dailyCalories: dailyCalories.toFixed(2), // 每日所需熱量
      dailyProteinNeed: dailyProteinNeed.toFixed(2), // 每日所需蛋白質
      dailyFatNeed: dailyFatNeed.toFixed(2), // 每日所需脂肪
      dailyCarbsNeed: dailyCarbsNeed.toFixed(2), // 每日所需碳水化合物
      maxIntake: foodMaxIntake.toFixed(2), // 最大攝取量
      foodIntake: maxFoodIntake.toFixed(2), // 實際攝取量
      nutrientsProvided: {
        protein: proteinIntake, // 每日食物中的蛋白質克數
        fat: fatIntake, // 每日食物中的脂肪克數
        carbs: carbsIntake, // 每日食物中的碳水化合物克數
      },
      foodProvidedCalories: foodProvidedCalories, // 食物提供的總熱量
      caloriesDifference: caloriesDifference, // 熱量差異
      detailedNutrientsCalories: {
        protein: proteinCalories, // 蛋白質提供的熱量
        fat: fatCalories, // 脂肪提供的熱量
        carbs: carbsCalories, // 碳水化合物提供的熱量
      },
    };

    // 將計算結果存入資料庫
    await FoodCalculation.create(data);

    handleSuccess(res, data, "計算鮮食可攝取量成功");
  },

  // * 根據指定熱量需求 > 計算應攝取的食物量
  calculateParrotFoodIntake: async (req, res, next) => {
    // 取得參數
    const { memberId, foodId, requiredCalories } = req.body;

    // 驗證必填欄位
    if (!foodId || !requiredCalories) {
      return next(appError(400, "foodId 和 requiredCalories 為必填"));
    }

    // 驗證食物是否存在
    const freshFood = await FreshFood.findById(foodId);
    if (!freshFood) {
      return next(appError(400, "食物不存在"));
    }

    // 食物的營養成分（每100克）
    const foodCalories = freshFood.calories;
    const foodProtein = freshFood.protein;
    const foodFat = freshFood.fat;
    const foodCarbs = freshFood.carbs;
    const foodMaxIntake = freshFood.maxIntake; // 食物的最大攝取量

    // 計算需要的食物量（克）以滿足熱量需求
    let totalFoodNeeded = (requiredCalories / foodCalories) * 100; // 因為 foodCalories 是每100克食物的熱量，所以除以 foodCalories 並乘以 100 得到克數

    // 確保不超過食物的最大攝取量
    totalFoodNeeded = Math.min(totalFoodNeeded, foodMaxIntake);

    // 計算食物提供的營養素量
    const actualProteinIntake = totalFoodNeeded * (foodProtein / 100);
    const actualFatIntake = totalFoodNeeded * (foodFat / 100);
    const actualCarbsIntake = totalFoodNeeded * (foodCarbs / 100);

    // 計算食物提供的營養素熱量（卡路里）
    const proteinCalories = actualProteinIntake * 4; // 每克蛋白質提供4卡路里
    const fatCalories = actualFatIntake * 9; // 每克脂肪提供9卡路里
    const carbsCalories = actualCarbsIntake * 4; // 每克碳水化合物提供4卡路里

    // 計算食物提供的總熱量
    const actualProvidedCalories = (
      proteinCalories +
      fatCalories +
      carbsCalories
    ).toFixed(2);

    // 計算與所需熱量的差異
    const caloriesDifference = (
      requiredCalories - actualProvidedCalories
    ).toFixed(2);

    // 計算營養素熱量佔總熱量的百分比
    const proteinPercentage = (
      (proteinCalories / actualProvidedCalories) *
      100
    ).toFixed(2);
    const fatPercentage = (
      (fatCalories / actualProvidedCalories) *
      100
    ).toFixed(2);
    const carbsPercentage = (
      (carbsCalories / actualProvidedCalories) *
      100
    ).toFixed(2);

    // 返回結果
    let data = {
      memberId: memberId || null,
      foodId: foodId,
      foodName: freshFood.name, // FreshFood name屬性
      foodNote: freshFood.note, // FreshFood note屬性
      requiredCalories: requiredCalories, // 需要補充的熱量
      requiredFoodIntake: totalFoodNeeded.toFixed(2), // 需要攝取的食物量，不超過最大攝取量
      nutrientsProvided: {
        protein: actualProteinIntake.toFixed(2), // 實際攝取的蛋白質量
        fat: actualFatIntake.toFixed(2), // 實際攝取的脂肪量
        carbs: actualCarbsIntake.toFixed(2), // 實際攝取的碳水化合物量
      },
      nutrientsCalories: {
        protein: proteinCalories.toFixed(2), // 蛋白質提供的熱量
        fat: fatCalories.toFixed(2), // 脂肪提供的熱量
        carbs: carbsCalories.toFixed(2), // 碳水化合物提供的熱量
      },
      nutrientsPercentage: {
        protein: proteinPercentage, // 蛋白質佔總熱量的百分比
        fat: fatPercentage, // 脂肪佔總熱量的百分比
        carbs: carbsPercentage, // 碳水化合物佔總熱量的百分比
      },
      foodProvidedCalories: actualProvidedCalories, // 實際提供的熱量
      caloriesDifference: caloriesDifference, // 熱量差異
    };

    // 將計算結果存入資料庫
    const result = await FoodConversion.create(data);

    // 填充關聯食物資料
    const populatedResult = await FoodConversion.findById(result._id).populate(
      "foodId"
    );

    handleSuccess(res, populatedResult, "計算食物攝取量成功");
  },

  // * 根據指定熱量需求 > 計算應攝取的飼料量
  calculateParrotFeedIntake: async (req, res, next) => {
    // 取得參數
    const { memberId, requiredCalories, calories, protein, fat, carbs } =
      req.body;

    // 驗證必填欄位
    if (!requiredCalories || !calories || !protein || !fat || !carbs) {
      return next(
        appError(400, "requiredCalories, calories, protein, fat, carbs 為必填")
      );
    }

    // 初始化變量
    let bestMatchFeedIntake = 0; // 最佳匹配的飼料攝取量
    let bestMatchDifference = Infinity; // 最佳匹配的熱量差異
    let bestMatchProvidedCalories = 0; // 最佳匹配時提供的熱量
    let bestMatchProteinCalories, bestMatchFatCalories, bestMatchCarbsCalories; // 在外部初始化這些變量

    // 微調飼料攝取量，嘗試找到最接近用戶需求的量
    for (
      let intake = (requiredCalories / calories) * 100 - 10;
      intake <= (requiredCalories / calories) * 100 + 10;
      intake += 0.01
    ) {
      // 計算飼料提供的營養素量
      const actualProteinIntake = intake * (protein / 100);
      const actualFatIntake = intake * (fat / 100);
      const actualCarbsIntake = intake * (carbs / 100);

      // 計算飼料提供的營養素熱量（卡路里）
      const proteinCalories = actualProteinIntake * 4; // 每克蛋白質提供4卡路里
      const fatCalories = actualFatIntake * 9; // 每克脂肪提供9卡路里
      const carbsCalories = actualCarbsIntake * 4; // 每克碳水化合物提供4卡路里

      // 計算飼料提供的總熱量
      const currentProvidedCalories = (
        proteinCalories +
        fatCalories +
        carbsCalories
      ).toFixed(2);

      // 計算與所需熱量的差異
      const currentDifference = Math.abs(
        requiredCalories - currentProvidedCalories
      );

      // 如果當前差異小於最佳匹配的差異，更新最佳匹配
      if (currentDifference < bestMatchDifference) {
        bestMatchDifference = currentDifference;
        bestMatchFeedIntake = intake;
        bestMatchProvidedCalories = currentProvidedCalories;
        bestMatchProteinCalories = proteinCalories;
        bestMatchFatCalories = fatCalories;
        bestMatchCarbsCalories = carbsCalories;
      }
    }

    // 計算營養素熱量佔總熱量的百分比
    const proteinPercentage = (
      (bestMatchProteinCalories / bestMatchProvidedCalories) *
      100
    ).toFixed(2);
    const fatPercentage = (
      (bestMatchFatCalories / bestMatchProvidedCalories) *
      100
    ).toFixed(2);
    const carbsPercentage = (
      (bestMatchCarbsCalories / bestMatchProvidedCalories) *
      100
    ).toFixed(2);

    // 返回結果
    let data = {
      memberId: memberId || null,
      requiredCalories: requiredCalories, // 需要補充的熱量
      calories: calories, // 飼料的熱量
      protein: protein, // 飼料的蛋白質
      fat: fat, // 飼料的脂肪
      carbs: carbs, // 飼料的碳水化合物
      requiredFeedIntake: bestMatchFeedIntake.toFixed(2), // 最接近需求的飼料攝取量
      nutrientsProvided: {
        protein: Number((bestMatchFeedIntake * (protein / 100)).toFixed(2)), // 實際攝取的蛋白質量
        fat: Number((bestMatchFeedIntake * (fat / 100)).toFixed(2)), // 實際攝取的脂肪量
        carbs: Number((bestMatchFeedIntake * (carbs / 100)).toFixed(2)), // 實際攝取的碳水化合物量
      },
      nutrientsCalories: {
        protein: bestMatchProteinCalories.toFixed(2), // 蛋白質提供的熱量
        fat: bestMatchFatCalories.toFixed(2), // 脂肪提供的熱量
        carbs: bestMatchCarbsCalories.toFixed(2), // 碳水化合物提供的熱量
      },
      nutrientsPercentage: {
        protein: proteinPercentage, // 蛋白質佔總熱量的百分比
        fat: fatPercentage, // 脂肪佔總熱量的百分比
        carbs: carbsPercentage, // 碳水化合物佔總熱量的百分比
      },
      feedProvidedCalories: bestMatchProvidedCalories, // 實際提供的熱量
      caloriesDifference: (
        requiredCalories - bestMatchProvidedCalories
      ).toFixed(2), // 熱量差異
    };

    // 將計算結果存入資料庫
    await FeedConversion.create(data);

    handleSuccess(res, data, "計算飼料攝取量成功");
  },

  // * 每日攝取量計算 -> 推薦 2-8 種食物 (考慮熱量、蛋白質、脂肪、碳水化合物)
  recommendFoods: async (req, res, next) => {
    // 取得參數
    const { memberId, weight, activity } = req.body;

    // 驗證必填欄位
    if (!weight || !activity) {
      return next(appError(400, "weight 和 activity 為必填"));
    }

    // 使用新的 BMR 計算公式
    const K = 175; // 鸚鵡的 K 值
    const BMR = K * Math.pow(weight / 1000, 0.75); // 體重轉換為公斤並計算基礎代謝率

    // 根據活動水平調整BMR
    let activityLevel = 1;
    switch (activity) {
      case "low":
        activityLevel = 1.2;
        break;
      case "medium":
        activityLevel = 1.4;
        break;
      case "high":
        activityLevel = 1.6;
        break;
    }
    const adjustedBMR = BMR * activityLevel; // 調整後的BMR

    // 計算每日所需熱量
    let dailyCalories = adjustedBMR;

    // 營養素需求計算
    const proteinNeed = (dailyCalories * 0.2) / 4; // 蛋白質每克4卡
    const fatNeed = (dailyCalories * 0.2) / 9; // 脂肪每克9卡
    const carbsNeed = (dailyCalories * 0.6) / 4; // 碳水化合物每克4卡

    // 從數據庫中獲取所有食物
    const allFoods = await FreshFood.find({});

    // 隨機選擇主要食物
    const selectRandomFood = (foods) => {
      return foods[Math.floor(Math.random() * foods.length)];
    };

    // 設定最多食物數量
    const maxFoodCount = weight <= 500 ? 3 : weight <= 800 ? 5 : 8;

    let selectedFoods = [];
    let selectedFoodIntakes = [];

    // 初始化剩餘需求
    let remainingCalories = dailyCalories;
    let remainingProtein = proteinNeed;
    let remainingFat = fatNeed;
    let remainingCarbs = carbsNeed;

    // 選擇食物
    while (
      selectedFoods.length < maxFoodCount &&
      (remainingCalories > 10 ||
        remainingProtein > 0 ||
        remainingFat > 0 ||
        remainingCarbs > 0)
    ) {
      let potentialFoods = allFoods.filter(
        (food) => !selectedFoods.includes(food)
      );
      let nextFood = selectRandomFood(potentialFoods);
      let nextFoodIntakeGrams = Math.min(
        nextFood.maxIntake,
        (remainingCalories / nextFood.calories) * 100
      );
      let nextFoodIntake = nextFoodIntakeGrams / 100;

      selectedFoods.push(nextFood);
      selectedFoodIntakes.push(nextFoodIntakeGrams);

      remainingCalories -= nextFood.calories * nextFoodIntake;
      remainingProtein -= nextFood.protein * nextFoodIntake;
      remainingFat -= nextFood.fat * nextFoodIntake;
      remainingCarbs -= nextFood.carbs * nextFoodIntake;
    }

    // 計算營養成分和熱量
    let totalNutrition = {
      protein: 0,
      fat: 0,
      carbs: 0,
      calories: 0,
    };

    const foodDetails = selectedFoods
      .map((food, index) => {
        let intake = selectedFoodIntakes[index] / 100;
        totalNutrition.protein += food.protein * intake;
        totalNutrition.fat += food.fat * intake;
        totalNutrition.carbs += food.carbs * intake;
        totalNutrition.calories += food.calories * intake;
        return {
          foodId: food._id,
          name: food.name,
          note: food.note,
          maxIntake: food.maxIntake,
          intakeAmount: selectedFoodIntakes[index].toFixed(2),
          nutrientsProvided: {
            protein: (food.protein * intake).toFixed(2),
            fat: (food.fat * intake).toFixed(2),
            carbs: (food.carbs * intake).toFixed(2),
            calories: (food.calories * intake).toFixed(2),
          },
        };
      })
      .filter((food) => parseFloat(food.intakeAmount) > 0); // 過濾掉攝取量為0的食物

    // 計算每種營養素提供的熱量
    const proteinCalories = totalNutrition.protein * 4; // 蛋白质提供的热量
    const fatCalories = totalNutrition.fat * 9; // 脂肪提供的热量
    const carbsCalories = totalNutrition.carbs * 4; // 碳水化合物提供的热量

    // 計算總熱量
    const totalCalories = totalNutrition.calories;

    // 計算百分比 (加起來要 100%)
    const proteinPercentage = (proteinCalories / totalCalories) * 100;
    const fatPercentage = (fatCalories / totalCalories) * 100;
    const carbsPercentage = (carbsCalories / totalCalories) * 100;

    // 如果總熱量不在允許範圍內，重新選擇食物
    if (Math.abs(totalNutrition.calories - dailyCalories) > 10) {
      return foodController.recommendFoods(req, res, next);
    }

    // 返回結果
    let data = {
      memberId: memberId || null,
      weight,
      activity,
      dailyNeeds: {
        // 每日需求
        calories: dailyCalories.toFixed(2),
        protein: proteinNeed.toFixed(2),
        fat: fatNeed.toFixed(2),
        carbs: carbsNeed.toFixed(2),
      },
      foods: foodDetails,
      totalNutrition: {
        // 總營養
        protein: totalNutrition.protein.toFixed(2),
        fat: totalNutrition.fat.toFixed(2),
        carbs: totalNutrition.carbs.toFixed(2),
        calories: totalNutrition.calories.toFixed(2),
      },
      percentage: {
        // 百分比
        protein: proteinPercentage.toFixed(2),
        fat: fatPercentage.toFixed(2),
        carbs: carbsPercentage.toFixed(2),
      },
    };

    // 將計算結果存入資料庫
    const result = await FoodRecommend.create(data);

    // 填充關聯食物資料
    const populatedResult = await FoodRecommend.findById(result._id).populate(
      "foods.foodId"
    );

    handleSuccess(res, populatedResult, "推薦食物成功");
  },
};

module.exports = foodController;
