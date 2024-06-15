const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    region: {
      type: String,
      required: true,
      // 地區
    },
    hospitalName: {
      type: String,
      required: true,
      // 醫院名稱
    },
    doctorName: {
      type: String,
      // 醫生姓名
    },
    phone: {
      type: String,
      required: true,
      // 電話
    },
    address: {
      type: String,
      required: true,
      // 地址
    },
    openingHours: {
      type: String,
      required: true,
      // 營業時間
    },
    note: {
      type: String,
      // 備註
    },
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
