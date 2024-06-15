const validator = require("validator");
const appError = require("../utils/appError");
const handleSuccess = require("../utils/handleSuccess");

const Feedback = require("../models/feedback");

const feedbackController = {
  // 新增回饋
  newFeedback: async (req, res, next) => {
    const { contactPerson, phone, email, feedback } = req.body;

    // 驗證必填欄位
    if (!contactPerson || !phone || !email || !feedback) {
      return next(
        appError(400, "contactPerson, phone, email, feedback 為必填")
      );
    }

    // 驗證 email 格式
    if (!validator.isEmail(email)) {
      return next(appError(400, "email 格式錯誤"));
    }

    const newFeedback = await Feedback.create({
      contactPerson: contactPerson,
      phone: phone,
      email: email,
      feedback: feedback,
      source: req.body.source,
    });

    // 新增回饋
    handleSuccess(res, null, "新增回饋成功");
  },
};

module.exports = feedbackController;
