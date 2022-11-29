const express = require('express')
const petController = require('./../controllers/petController')
const router = express.Router()

router.route('/').get(petController.getAllPets)

module.exports = router