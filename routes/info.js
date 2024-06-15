const express = require("express");
const router = express.Router();
const handleErrorAsync = require("../utils/handleErrorAsync");
const infoController = require("../controllers/infoController");

// * 取得所有鸚鵡資料
router.get(
  "/parrots",
  handleErrorAsync(infoController.getParrots)
  /*  #swagger.tags = ['Info']
    #swagger.summary = '取得所有鸚鵡資料'
    #swagger.description = '取得所有鸚鵡資料'
    */
);

// * 取得所有不可食用食物資料
router.get(
  "/poisonousFoods",
  handleErrorAsync(infoController.getPoisonousFoods)
  /*  #swagger.tags = ['Info']
        #swagger.summary = '取得所有不可食用食物資料'
        #swagger.description = '取得所有不可食用食物資料'
    */
);

// * 取得所有可食用食物資料
router.get(
  "/freshFoods",
  handleErrorAsync(infoController.getFreshFood)
  /*  #swagger.tags = ['Info']
        #swagger.summary = '取得所有可食用食物資料'
        #swagger.description = '取得所有可食用食物資料'
    */
);

// * 取得所有醫院資料
router.get(
  "/hospitals",
  handleErrorAsync(infoController.getHospitals)
  /*  #swagger.tags = ['Info']
        #swagger.summary = '取得所有醫院資料'
        #swagger.description = '取得所有醫院資料'
    */
);

module.exports = router;
