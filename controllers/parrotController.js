const appError = require("../utils/appError");
const handleSuccess = require("../utils/handleSuccess");
const mongoose = require("mongoose");

const Parrot = require("../models/parrot");

const parrotController = {
  // * 取得所有鸚鵡資料
  getParrots: async (req, res, next) => {
    const parrots = await Parrot.find();
    handleSuccess(res, parrots, "取得所有鸚鵡資料成功");
  },

  // * 新增鸚鵡資料
  createParrot: async (req, res, next) => {
    // 檢查是否有必填欄位
    if (!req.body.chineseName || !req.body.lifespan) {
      return next(new appError("請填寫必填欄位", 400));
    }

    const newParrot = await Parrot.create(req.body);
    handleSuccess(res, newParrot, "新增鸚鵡資料成功");
  },
};

module.exports = parrotController;
