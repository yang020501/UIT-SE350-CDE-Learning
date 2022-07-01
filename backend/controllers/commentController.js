const userModel = require('../models/user')
const lesson = require('../models/lesson')
const commentSchema = require('../models/comment')

class CommentController {

    async getAllComment(req, res, next) {
        try {
            const comment = await commentSchema.find(req.query) 
            res.send(comment)
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }


    async getCommentFromLesson(req, res) {
        try{
            const _id = req.params.id;
            const findComment = await commentSchema.find({"lessonId": _id })
            .populate({
            path: 'userId',
            select: 'nameAccount'},
            )
            res.send(findComment)
            }catch(err){
                throw new Error(err)
            }

    }


    async addComment(req,res){
        const data = await new commentSchema({
            lessonId : req.body.lessonId,
            userId : req.body.userId,
            content : req.body.content,
        })
        try {
            const temp = await data.save()
            res.json(temp)
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }

    

   




    




   
  

}

module.exports = new CommentController