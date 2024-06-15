const express = require("express");
const router = express.Router();
const handleErrorAsync = require("../utils/handleErrorAsync");
const foodController = require("../controllers/foodController");

// * 每日飼料計算
router.post(
  "/calculatefeed",
  handleErrorAsync(foodController.calculatefeed)
  /*  #swagger.tags = ['Food']
      #swagger.summary = '每日飼料計算'   
      #swagger.description = '每日飼料計算'
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema:{
              $memberId:'會員 ID',
              $weight:'體重',
              $activity: '活動量',
              $calories: '卡路里',
              $protein: '蛋白質',
              $fat: '脂肪',
              $carbs: '碳水化合物',
          }
      }
      
  */
);

// * 每日鮮食計算
router.post(
  "/calculatefood",
  handleErrorAsync(foodController.calculatefood)
  /*  #swagger.tags = ['Food']
      #swagger.summary = '每日鮮食計算'   
      #swagger.description = '每日鮮食計算'
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema:{
              $memberId:'會員 ID',
              $weight:'體重',
              $activity: '活動量',
              $foodId:'食物 ID',
          }
      }
      
  */
);

// * 根據指定熱量需求 > 計算應攝取的食物量
router.post(
  "/calculateParrotFoodIntake",
  handleErrorAsync(foodController.calculateParrotFoodIntake)
  /*  #swagger.tags = ['Food']
      #swagger.summary = '根據指定熱量需求 > 計算應攝取的食物量'   
      #swagger.description = '根據指定熱量需求 > 計算應攝取的食物量'
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema:{
              $memberId:'會員 ID',
              $foodId:'食物 ID',
              $requiredCalories: '需要補充的熱量',
          }
      }
  */
);

// * 根據指定熱量需求 > 計算應攝取的飼料量
router.post(
  "/calculateParrotFeedIntake",
  handleErrorAsync(foodController.calculateParrotFeedIntake)
  /*  #swagger.tags = ['Food']
        #swagger.summary = '根據指定熱量需求 > 計算應攝取的飼料量'   
        #swagger.description = '根據指定熱量需求 > 計算應攝取的飼料量'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema:{
                $memberId:'會員 ID',
                $requiredCalories: '需要補充的熱量',
                $calories: '卡路里',
                $protein: '蛋白質',
                $fat: '脂肪',
                $carbs: '碳水化合物',
            }
        }
    */
);

// * 每日攝取量計算 -> 推薦 2-8 種食物 (考慮熱量、蛋白質、脂肪、碳水化合物)
router.post(
  "/recommendFoods",
  handleErrorAsync(foodController.recommendFoods)
  /*  #swagger.tags = ['Food']
        #swagger.summary = '每日攝取量計算 -> 推薦 2-8 種食物 (考慮熱量、蛋白質、脂肪、碳水化合物)'   
        #swagger.description = '每日攝取量計算 -> 推薦 2-8 種食物 (考慮熱量、蛋白質、脂肪、碳水化合物)'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema:{
                $memberId:'會員 ID',
                $weight:'體重',
                $activity: '活動量',
            }
        }
    */
);

module.exports = router;
