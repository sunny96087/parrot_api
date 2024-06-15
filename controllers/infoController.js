const appError = require("../utils/appError");
const handleSuccess = require("../utils/handleSuccess");
const mongoose = require("mongoose");

const Parrot = require("../models/parrot");
const PoisonousFood = require("../models/poisonousFood");
const FreshFood = require("../models/freshFood");
const Hospital = require("../models/hospital");

const infoController = {
  // * 取得所有鸚鵡資料
  getParrots: async (req, res, next) => {
    const parrots = await Parrot.find();
    handleSuccess(res, parrots, "取得所有鸚鵡資料成功");
  },

  // * 取得所有不可食用食物資料
  getPoisonousFoods: async (req, res, next) => {
    const poisonousFoods = await PoisonousFood.find();
    handleSuccess(res, poisonousFoods, "取得所有不可食用食物資料成功");
  },

  // * 取得所有可食用食物資料
  getFreshFood: async (req, res, next) => {
    const freshFoods = await FreshFood.find();
    handleSuccess(res, freshFoods, "取得所有可食用食物資料成功");
  },

  // * 取得所有醫院資料
  getHospitals: async (req, res, next) => {
    const hospitals = await Hospital.find();
    handleSuccess(res, hospitals, "取得所有醫院資料成功");
  },
};

module.exports = infoController;
