const lessonSchema = require('../models/lesson')
const classSchema = require('../models/class')
const userSchema = require('../models/user')
const subjectSchema = require('../models/subject')
const saveSchema = require('../models/save')
const scoreSchema = require('../models/score')
class lessonController{


    async getLessonFromTeacherId(req,res){
        try{
            const _id = req.params.id
            const lesson = await  lessonSchema.find({'userId' : _id})
            .populate('userId')
            .populate('classId')
            .populate('subjectId')
            .populate('content._id')
    
            res.send(lesson)
    
        }catch(err){
            throw new Error(err)
        }
    }
    async getLessonFromTeacher(req,res){
        try{
            const user = await userSchema.find(req.query)
            let temp = null
            if(user.length != 0){
                temp = user[0].id
            }
            const lesson = await  lessonSchema.find({'userId': temp})
            .populate('userId')
            .populate('classId')
            .populate('subjectId')
            .populate('content._id')
            res.send(lesson)
        }catch(err){
            throw new Error(err)
        }
    }
    

    

    async getClass(req, res) {
        try {
            const class1 = await classSchema.find(req.query)
            res.send(class1)
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }


    async getClassById(req, res, next) {
        try {
            const _id = req.params._id
            const class1 = await classSchema.findById(_id)
            res.send(class1)
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }

    async getLessonFromClass(req,res){
        try {
            const _id = req.params.id
            const findCourse = await lessonSchema.find({"classId":_id})
            res.send(findCourse)
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }


    async getSubject(req, res, next) {
        try {
            const subject = await subjectSchema.find(req.query)
            res.send(subject)
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }


    async getSubjectById(req, res) {
        try {
            const _id = req.params._id
            const subject = await subjectSchema.findById(_id)
            res.send(subject)
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }


    async getLesson(req,res){
        try {
            const course = await lessonSchema.find(req.query)
            .populate('userId')
            .populate('classId')
            .populate('subjectId')
            .populate('content._id')
            res.send(course)
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }

    async getAllSave(req,res){
        try{
            const save = await saveSchema.find()
            .populate('userId')
            .populate({
                path: 'lessonId',
                populate:{
                    path: 'subjectId classId userId'
                }})
            res.send(save)
        }
        catch(err){
            throw new Error(err)
        }
    }

    async getLessonFromSaveInStudent(req,res){
        try {
            const _id = req.params.id
            const save = await saveSchema.find({'userId': _id})
            .populate('userId')
            .populate({
                path: 'lessonId',
                populate:{
                    path: 'userId classId subjectId'
                }
            })
            res.send(save)
        } catch (error) {
            throw new Error(error)
        }
    }

    async getLessonFromId(req,res){
        try {
            const _id = req.params.id
            const course = await lessonSchema.findById(_id)
            res.send(course)
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }



    async getLessonFromSubject(req,res){
        try {
            const _id = req.params.id
            const findCourse = await lessonSchema.find({"subjectId":_id})
            res.send(findCourse)
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }





    /*






    toan bo post














    */
    async addClass(req,res){
        const class1 = await new classSchema({
            className : req.body.className
        })
        try {
            const temp = await class1.save()
            res.send(temp)
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }

    async addSubject(req,res){
        const subject = await new subjectSchema({
            subjectName : req.body.subjectName
        })
        try {
            const temp = await subject.save()
            res.send(temp)
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }
    
    async saveStudentLesson(req,res){
        const userId = req.body.userId
        const lessonId = req.body.lessonId
        let check = false
        const save = await new saveSchema({
            userId: userId,
            lessonId: lessonId,
        })
        const saveCheck = await saveSchema.find({"userId": userId})
        for(let i = 0, l = saveCheck.length; i < l; i++){
            const obj = saveCheck[i]
            if(obj.lessonId == lessonId) check = true
        }

        if(check==true) { res.send("lesson da save trong user")}
        else{
            try{
                const temp = await save.save()
                res.send(temp)
            }catch(err)
            {
                throw new Error(err)
            }
        }
    }

    async addLesson(req,res){
        const lesson = await new lessonSchema({
            userId: req.body.userId,
            classId: req.body.classId,
            subjectId: req.body.subjectId,
            name: req.body.name,
            header: req.body.header,
            content: req.body.content,
            exam:req.body.exam,
            type: req.body.type,
            time: req.body.time
        })
        try {
            const temp = await lesson.save()
            res.send(temp)
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }
    async addContentForLesson(req,res){
        const _id = req.params.id
        const header = req.body.header
        const image = req.body.image
        const main = req.body.main
        const content = {header,image,main}
   
        try {
            const lesson = await lessonSchema.findById(_id)
            if(lesson.type=="EXERCISE"){
                lesson.content.push(content)
                lesson.save()
                res.send(lesson)
            }
            else{
                res.send("Ban da push nham type, ko phai la exercise")
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    


    //patch





    async changeLesson(req,res){
        try{
            const _id = req.params.id
            const userId = req.body.userId
            const classId = req.body.classId
            const subjectId = req.body.subjectId
            const name = req.body.name
            const header = req.body.header
            const type = req.body.type
            let content1 = req.body.content
            const lesson1 = await lessonSchema.findById(_id)
            const temp = lesson1.content
            for(let i = 0, l1 = content1.length; i < l1; i++){
                for(let j = 0, l2 = temp.length;j < l2; j++)
                {
                    
                    const obj1 = content1[i]
                    if(obj1 == []) {res.send("Khong ton tai content can sua")}
                    else{
                        if(obj1._id==temp[j]._id){
                        temp[j].header = obj1.header
                        temp[j].main = obj1.main
                        temp[j].image = obj1.image
                        }
                    }
                }    
            }
            const lesson = await lessonSchema.findByIdAndUpdate(_id,
            {
                "userId": userId,
                "classId": classId,
                "subjectId": subjectId,
                "name": name,
                "header": header,
                "type": type,
                "content": temp
            })
            res.send(lesson)
        }catch(err){
            throw new Error(err)
        }
    }

    async changeExamForLesson(req,res){
        const _id = req.params.id
        const questions = req.body.questions
        const answers = req.body.answers
        const correctAnswers = req.body.correctAnswers
        const exam = {questions,answers,correctAnswers}
   
        try {
            const lesson = await lessonSchema.findById(_id)
            if(lesson.type=="EXAM"){
                lesson.exam = exam
                lesson.save()
                res.send(lesson)
            }
            else{
                res.send("Ban da patch nham type")
            }
        } catch (error) {
            throw new Error(error)
        }
    }


    //delete
    async deleteSaveFromId(req,res){
        try{
            const _id = req.params.id
            const save = await saveSchema.findByIdAndDelete(_id)
            res.send(save)
        }catch(err){
            throw new Error(err)
        }
    }

    async deleteContentFromLesson(req,res){
        try {
            const temp = req.body._id
            const lesson = await lessonSchema.findByIdAndUpdate(
                {_id:req.params.id},
                {$pull: {content: {_id: temp}}})
            res.send(lesson)
        } catch (err) {
            throw new Error(err)
        }
    }


    async deleteLessonFromId(req,res){
        const _id = req.params.id
        try{
        const save = await saveSchema.deleteOne({"lessonId": _id})
        const score = await scoreSchema.deleteOne({"lessonId":_id})
        const lesson = await lessonSchema.findByIdAndDelete(_id)
        res.send([lesson,score,save])
        }catch(err)
        {
            throw new Error(err)
        }
    }

}

module.exports = new lessonController