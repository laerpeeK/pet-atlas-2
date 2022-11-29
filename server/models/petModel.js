const mongoose = require('mongoose')

const petSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, '宠物名不能为空！'],
    unique: true
  },
  attribute: {
    type: String,
    required: true,
    enum: ['金', '木', '水', '火', '土', '神']
  },
  photo: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
    min: [1, '宠物阶数不能小于1阶'],
    max: [11, '宠物阶数不能大于11阶']
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  story: {
    type: String
    // required: {
    //   validator: function() {
    //     return this.attribute === '神'
    //   },
    //   message:'神宠必须有对应宠物故事'
    // }
  },
  access: {
    type: String
  },
  reward: {
    type: String
  },
  magic: [{
    name: {
      type: String,
      required: [true, '宠物技能必须有名称']
    },
    description: {
      type: String,
      required: [true, '宠物技能必须有描述']
    }
  }],
  formula: {
    type: String
  }
})

petSchema.index({rank: 1})

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet
