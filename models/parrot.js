const mongoose = require("mongoose");

const parrotSchema = new mongoose.Schema(
  {
    chineseName: {
      type: String,
      required: true,
      // 中文名稱
    },
    englishName: {
      type: String,
      required: true,
      // 英文名稱
    },
    chineseNickname: {
      type: String,
      required: true,
      // 中文暱稱（台灣）
    },
    englishNickname: {
      type: String,
      required: true,
      // 英文暱稱
    },
    size: {
      type: String,
      required: true,
      // 體型
    },
    weightRange: {
      type: String,
      required: true,
      // 體重範圍(g)
    },
    lifespan: {
      type: Number,
      required: true,
      // 預期壽命(年)
    },
    nativeHabitat: {
      type: String,
      required: true,
      // 原生長地
    },
    additionalInfo: {
      type: String,
      required: true,
      // 額外說明
    },
    advantages: {
      type: String,
      required: true,
      // 飼養優點
    },
    disadvantages: {
      type: String,
      required: true,
      // 飼養缺點
    },
    description: {
      type: String,
      required: true,
      // 描述
    },
    imgUrl: {
      type: String,
      required: true,
      // 圖片連結
    },
  },
  { timestamps: true }
);

const Parrot = mongoose.model("Parrot", parrotSchema);

module.exports = Parrot;
