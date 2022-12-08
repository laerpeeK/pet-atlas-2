const Pet = require('./../models/petModel')
const catchAsync = require('./../utils/catchAsync')
const APIFeatures = require('./../utils/apiFeatures')

exports.getAllPets = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Pet.find(), req.query).filter().limitFields()
  const pets = await features.query.sort({rank: -1})
  res.status(200).json({
    status: 'success',
    results: pets.length,
    data: pets
  })
})
