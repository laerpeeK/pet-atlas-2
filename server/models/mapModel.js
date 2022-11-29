const mongoose = require('mongoose')

const mapSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, '地图名不能为空！'],
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['wild', 'instance']
  },
  photo: {
    type: String,
    require: true
  },
  creatdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
})

const Map = mongoose.model('Map', mapSchema)

module.exports = Map