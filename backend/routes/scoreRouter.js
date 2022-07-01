const express = require('express');
const router = express.Router();
const scoreRouter = require('../controllers/scoreController')
router.get('/',scoreRouter.getAllScore)
router.get('/user/:id',scoreRouter.getScoreFromUser)
router.get('/exam/:id',scoreRouter.getStudentFromExam)
router.get('/allStudentInExam/:id',scoreRouter.getAllStudentFromExam)

router.post('/',scoreRouter.addScore)

module.exports = router