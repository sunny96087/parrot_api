const express = require("express");
const router = express.Router();
const handleErrorAsync = require("../utils/handleErrorAsync");
const parrotController = require("../controllers/parrotController");

// * 取得所有鸚鵡資料
router.get("/", handleErrorAsync(parrotController.getParrots));

// * 新增鸚鵡資料
router.post(
  "/",
  handleErrorAsync(parrotController.createParrot)
  /*  #swagger.tags = ['Parrot']
    #swagger.summary = '新增鸚鵡資料'   
    #swagger.description = '新增鸚鵡資料'
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema:{
            $chineseName:'中文名稱',
            $englishName:'英文名稱',
            $chineseNickname: '中文暱稱',
            $englishNickname: '英文暱稱',
            $size: '體型',
            $weightRange: '體重範圍(g)',
            $lifespan: '預期壽命(年)',
            $nativeHabitat: '原生長地',
            $additionalInfo: '額外說明',
            $advantages: '飼養優點',
            $disadvantages: '飼養缺點',
            $description: '描述',
        }
    }
*/
);

module.exports = router;
