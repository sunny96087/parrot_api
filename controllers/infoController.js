const appError = require("../utils/appError");
const handleSuccess = require("../utils/handleSuccess");
const mongoose = require("mongoose");

const Parrot = require("../models/parrot");
const PoisonousFood = require("../models/poisonousFood");
const FreshFood = require("../models/freshFood");
const Hospital = require("../models/hospital");

const infoController = {
  // * 取得所有鸚鵡資料，支持根據 size 和關鍵字進行查詢
  getParrots: async (req, res, next) => {
    const { size, keyword } = req.query;

    // 構建查詢條件
    let query = {};
    if (size) {
      query.size = size; // 精確匹配 size
    }
    if (keyword) {
      query.$or = [
        { chineseName: { $regex: keyword, $options: "i" } },
        { englishName: { $regex: keyword, $options: "i" } },
        { chineseNickname: { $regex: keyword, $options: "i" } },
        { size: { $regex: keyword, $options: "i" } },
        { nativeHabitat: { $regex: keyword, $options: "i" } },
        { advantages: { $regex: keyword, $options: "i" } },
        { disadvantages: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // 根據查詢條件查找鸚鵡
    const parrots = await Parrot.find(query);
    handleSuccess(res, parrots, "取得所有鸚鵡資料成功");
  },

  // * 取得所有不可食用食物資料，支持根據 keyword 對 name 和 note 進行模糊查詢
  getPoisonousFoods: async (req, res, next) => {
    // 從請求的查詢參數中提取 keyword
    const { keyword } = req.query;

    // 構建查詢條件，如果有提供 keyword，則進行模糊查詢
    let query = {};
    if (keyword) {
      query = {
        $or: [
          { name: { $regex: keyword, $options: "i" } }, // 不區分大小寫的模糊查詢
          { note: { $regex: keyword, $options: "i" } },
        ],
      };
    }

    // 根據查詢條件查找不可食用食物
    const poisonousFoods = await PoisonousFood.find(query);
    handleSuccess(res, poisonousFoods, "取得所有不可食用食物資料成功");
  },

  // * 取得所有可食用食物資料，支持根據 keyword 對 name、note、和 nutrition 進行模糊查詢
  getFreshFood: async (req, res, next) => {
    // 從請求的查詢參數中提取 keyword
    const { keyword } = req.query;

    // 構建查詢條件，如果有提供 keyword，則進行模糊查詢
    let query = {};
    if (keyword) {
      query = {
        $or: [
          { name: { $regex: keyword, $options: "i" } }, // 不區分大小寫的模糊查詢
          { note: { $regex: keyword, $options: "i" } },
          { nutrition: { $regex: keyword, $options: "i" } },
        ],
      };
    }

    // 根據查詢條件查找食物
    const freshFoods = await FreshFood.find(query);
    handleSuccess(res, freshFoods, "取得所有可食用食物資料成功");
  },

  // * 取得所有醫院資料，支持根據地區和關鍵字（hospitalName、doctorName、address）進行查詢
  getHospitals: async (req, res, next) => {
    const { region, keyword } = req.query;

    // 構建查詢條件
    let query = {};
    if (region) {
      query.region = region; // 精確匹配地區
    }
    if (keyword) {
      query.$or = [
        { hospitalName: { $regex: keyword, $options: "i" } }, // 不區分大小寫的模糊查詢
        { doctorName: { $regex: keyword, $options: "i" } },
        { address: { $regex: keyword, $options: "i" } },
      ];
    }

    // 根據查詢條件查找醫院
    const hospitals = await Hospital.find(query);
    handleSuccess(res, hospitals, "取得所有醫院資料成功");
  },
};

module.exports = infoController;
