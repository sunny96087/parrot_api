const mongoose = require('mongoose');

const poisonousFoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // 食物名稱
  },
  note: {
    type: String,
    required: true,
    // 禁食原因
  },
}, { timestamps: true });

const PoisonousFood = mongoose.model('PoisonousFood', poisonousFoodSchema);

module.exports = PoisonousFood;
