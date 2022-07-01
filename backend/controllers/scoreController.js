const scoreSchema = require('../models/score')

class ScoreController {

    async getAllScore(req, res, next) {
        try {
            const score= await scoreSchema.find(req.query)
            .populate('userId')
            .populate('lessonId')
            res.send(score)
        }
        catch (err) {
            throw new Error(err)
        }
    }

    async getScoreFromUser(req,res){
        try{
            const _id = req.params.id
            const score = await scoreSchema.find({'user': _id})
            .populate('lessonId')
            .populate('userId')
            res.send(score)
        }catch(err){
            throw new Error(err)
        }
    }

    async getAllStudentFromExam(req,res){
        try{
            const _id = req.params.id
            const score = await scoreSchema.find({'lessonId': _id})
            .populate('lessonId')
            .populate('userId')
            res.send(score)
        }catch(err){
            throw new Error(err)
        }
    }

    async getStudentFromExam(req,res){
            const lessonId = req.params.id
            const userId = req.query.userId
            try {
                const temp = []
                const score = await scoreSchema.find({'lessonId': lessonId})
                .populate('userId')
                .populate('lessonId')
              
                for(let i = 0, l = score.length; i < l; i++){
                    if(score[i].userId.id == userId)
                    {
                        temp.push(score[i])
                    }
                }
                if(temp.length==0){
                    res.send(false)
                }
                else res.send(temp)
               
        
            } catch (err) {
                throw new Error(err)
            }
        }




    async addScore(req,res){
        const score = await new scoreSchema({
            userId: req.body.userId,
            lessonId: req.body.lessonId,
            scoreTotal: req.body.scoreTotal,
        })
        try {
            const temp = await score.save()
            res.json(temp)
        }
        catch (err) {
            throw new Error(err)
        }
    }

   
}

module.exports = new ScoreController