const express = require('express');
const lessonController = require('../controllers/lessonController')
const router = express.Router();
//tat ca su dung :id khong co chu thich thi su dung _id
router.get('/class',lessonController.getClass)
router.get('/class/:id',lessonController.getClassById)
router.get('/subject',lessonController.getSubject)
router.get('/subject/:id',lessonController.getSubjectById)
router.get('/',lessonController.getLesson)
router.get('/:id',lessonController.getLessonFromId)
router.get('/fromClass/:id',lessonController.getLessonFromClass)//dung id class
router.get('/fromSubject/:id',lessonController.getLessonFromSubject)// dung id subject
router.get('/fromTeacher/getAll',lessonController.getLessonFromTeacher)
router.get('/fromTeacher/:id',lessonController.getLessonFromTeacherId)
router.get('/save/getAll',lessonController.getAllSave)
router.get('/save/:id',lessonController.getLessonFromSaveInStudent)

router.post('/class',lessonController.addClass)
router.post('/subject',lessonController.addSubject)
router.post('/save',lessonController.saveStudentLesson)
router.post('/',lessonController.addLesson)
router.post('/content/:id',lessonController.addContentForLesson)

router.patch('/:id',lessonController.changeLesson)
router.patch('/exam/:id',lessonController.changeExamForLesson)

router.delete('/save/:id',lessonController.deleteSaveFromId)
router.delete('/content/:id',lessonController.deleteContentFromLesson)
router.delete('/:id',lessonController.deleteLessonFromId)
module.exports = router

