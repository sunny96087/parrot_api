const express = require("express");
const router = express.Router();
const handleErrorAsync = require("../utils/handleErrorAsync");
const infoController = require("../controllers/infoController");

// * 取得單一鸚鵡資料
router.get(
  "/parrots/:id",
  handleErrorAsync(infoController.getParrot)
  /*  #swagger.tags = ['Info']
    #swagger.summary = '取得單一鸚鵡資料'
    #swagger.description = '取得單一鸚鵡資料'
    #swagger.parameters['obj'] = {
      in: 'path',
      name: 'id',
      description: '鸚鵡 ID',
      required: true
    }
    */
);

// * 取得所有鸚鵡資料
router.get(
  "/parrots",
  handleErrorAsync(infoController.getParrots)
  /*  #swagger.tags = ['Info']
    #swagger.summary = '取得所有鸚鵡資料'
    #swagger.description = '取得所有鸚鵡資料'
    #swagger.parameters['obj'] = {
      in: 'query',
      name: 'size',
      description: '體型',
      enum: ['小型', '中型', '大型'],
      required: false
    }
    #swagger.parameters['obj'] = {
      in: 'query',
      name: 'keyword',
      description: '關鍵字',
      required: false
    }
    */
);

// * 取得所有不可食用食物資料
router.get(
  "/poisonousFoods",
  handleErrorAsync(infoController.getPoisonousFoods)
  /*  #swagger.tags = ['Info']
        #swagger.summary = '取得所有不可食用食物資料'
        #swagger.description = '取得所有不可食用食物資料'
        #swagger.parameters['obj'] = {
          in: 'query',
          name: 'keyword',
          description: '關鍵字',
          required: false
        }
    */
);

// * 取得所有可食用食物資料
router.get(
  "/freshFoods",
  handleErrorAsync(infoController.getFreshFood)
  /*  #swagger.tags = ['Info']
        #swagger.summary = '取得所有可食用食物資料'
        #swagger.description = '取得所有可食用食物資料'
        #swagger.parameters['obj'] = {
          in: 'query',
          name: 'keyword',
          description: '關鍵字',
          required: false
        }
    */
);

// * 取得所有醫院資料
router.get(
  "/hospitals",
  handleErrorAsync(infoController.getHospitals)
  /*  #swagger.tags = ['Info']
        #swagger.summary = '取得所有醫院資料'
        #swagger.description = '取得所有醫院資料'
        #swagger.parameters['obj'] = {
          in: 'query',
          name: 'keyword',
          description: '關鍵字',
          required: false
        }
        #swagger.parameters['obj'] = {
          in: 'query',
          name: 'region',
          description: '地區',
          required: false
        }
    */
);

// * 喚醒資料庫
router.get(
  "/wakeup",
  handleErrorAsync(infoController.wakeUpDatabase)
  /*  #swagger.tags = ['Info']
    #swagger.summary = '喚醒資料庫'
    #swagger.description = '喚醒資料庫'
    */
);

module.exports = router;
