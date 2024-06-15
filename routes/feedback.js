const express = require("express");
const router = express.Router();
const handleErrorAsync = require("../utils/handleErrorAsync");
const feedbackController = require("../controllers/feedbackController");

// 新增回饋
router.post(
  "/",
  handleErrorAsync(feedbackController.newFeedback)
  /*  #swagger.tags = ['Feedback']
        #swagger.summary = '新增回饋'   
        #swagger.description = '新增回饋'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema:{
                $contactPerson:'姓名',
                $phone:'電話',
                $email: '信箱',
                $feedback: '內容',
                $source: '從哪裡得知此網站',
            }
        }
        
    */
);

module.exports = router;
